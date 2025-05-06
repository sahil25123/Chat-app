import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();
	const { authUser } = useAuthContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			const senderId = newMessage.senderId?._id || newMessage.senderId;
			const receiverId = newMessage.receiverId?._id || newMessage.receiverId;
			// console.log('newMessage:', newMessage);
			// console.log('selectedConversation:', selectedConversation);
			// console.log('authUser:', authUser);
			// console.log('senderId:', senderId, 'receiverId:', receiverId);

			if (
				(senderId === authUser?._id && receiverId === selectedConversation?._id) ||
				(senderId === selectedConversation?._id && receiverId === authUser?._id)
			) {
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play();
				setMessages(prev => [...prev, newMessage]);
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, selectedConversation, authUser]);
};
export default useListenMessages;