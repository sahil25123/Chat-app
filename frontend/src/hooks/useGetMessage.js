import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { authUser } = useAuthContext();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation?._id || !authUser?.token) {
				setMessages([]);
				return;
			}

			setLoading(true);
			try {
				const res = await fetch(`http://localhost:8001/api/message/${selectedConversation._id}`, {
					method: "GET",
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
				if (data.error) throw new Error(data.error);
				
				// Ensure we have an array of messages
				const messagesArray = Array.isArray(data) ? data : data.messages || [];
				
				// Sort messages by createdAt
				const sortedMessages = messagesArray.sort((a, b) => 
					new Date(a.createdAt) - new Date(b.createdAt)
				);

				setMessages(sortedMessages);
			} catch (error) {
				console.error("Error fetching messages:", error);
				toast.error(error.message || "Failed to fetch messages");
				setMessages([]);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation?._id, setMessages, authUser]);

	return { messages, loading };
};

export default useGetMessages;