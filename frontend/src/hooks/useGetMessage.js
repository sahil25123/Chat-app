import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { authUser } = useAuthContext();

	useEffect(() => {
		const getMessages = async () => {
			// Debug logging
			// // console.log("Fetching messages for conversation:", {
			// 	conversationId: selectedConversation?._id,
			// 	hasToken: !!authUser?.token
			// });

			if (!selectedConversation?._id || !authUser?.token) {
				console.log("Skipping message fetch - missing conversation or token");
				setMessages([]);
				return;
			}

			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`https://chatter-box-av2e.onrender.com/api/message/${selectedConversation._id}`, {
					headers: {
						"Authorization": `Bearer ${authUser.token}`,
						"Content-Type": "application/json"
					},
					credentials: 'include'
				});

				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.error || "Failed to fetch messages");
				}

				const data = await res.json();
				// console.log("Received message data:", data);

				if (data.error) throw new Error(data.error);
				
				// Handle all possible response formats
				let messagesArray = [];
				if (Array.isArray(data)) {
					messagesArray = data;
				} else if (data.messages) {
					messagesArray = data.messages;
				} else if (data.newMsg) {
					messagesArray = [data.newMsg];
				} else if (data.message) {
					messagesArray = [data.message];
				}
				
				// Validate message structure
				const validMessages = messagesArray.filter(msg => 
					msg && 
					msg._id && 
					msg.message && 
					msg.senderId && 
					msg.createdAt
				);

				
				// Sort messages by createdAt
				const sortedMessages = validMessages.sort((a, b) => 
					new Date(a.createdAt) - new Date(b.createdAt)
				);

				setMessages(sortedMessages);
			} catch (error) {
				console.error("Error fetching messages:", error);
				setError(error.message);
				toast.error(error.message || "Failed to fetch messages");
				setMessages([]);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation?._id, authUser]);

	return { messages, loading, error };
};

export default useGetMessages;