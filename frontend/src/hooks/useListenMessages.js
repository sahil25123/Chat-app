import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			console.log("Socket newMessage received:", newMessage, "Current conversation:", selectedConversation);
			const senderId = newMessage.senderId?._id || newMessage.senderId;
			const receiverId = newMessage.receiverId?._id || newMessage.receiverId;
			if (
				senderId === selectedConversation?._id ||
				receiverId === selectedConversation?._id
			) {
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play();
				setMessages(prev => [...prev, newMessage]);
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, selectedConversation]);
};
export default useListenMessages;