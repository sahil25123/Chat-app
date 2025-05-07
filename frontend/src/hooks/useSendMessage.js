import { useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import { useAuthContext } from '../context/AuthContext';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();
    const { authUser } = useAuthContext();

    const sendMessage = async (message) => {
        if (!selectedConversation?._id) {
            toast.error("No conversation selected");
            return null;
        }

        setLoading(true);
        try {
            const res = await fetch(`https://chatter-box-av2e.onrender.com/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser?.token}`
                },
                credentials: 'include',
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Handle both newMsg and message response formats
            const newMessage = data.newMsg || data.message;
            if (newMessage) {
                // Do NOT setMessages here; let the socket event handle it
                return newMessage;
            }
            return null;
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.message || "Failed to send message");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
