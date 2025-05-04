import { useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import { useAuthContext } from '../context/AuthContext';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();
    const { authUser } = useAuthContext();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:9000/api/message/send/${selectedConversation._id}`, {
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

            // Update messages in the store
            setMessages([...messages, data]);
            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
