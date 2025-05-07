import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useGetConversation = () => {
 const [loading, setLoading] = useState(false);
 const [conversations, setConversation] = useState([]);
 const { authUser } = useAuthContext();

 useEffect(() => {
    const getConversation = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://chatter-box-av2e.onrender.com/api/users", {
                credentials: 'include'
            });
            
            if (!res.ok) {
                throw new Error("Failed to fetch conversations");
            }
            
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setConversation(data);
        } catch (error) {
            console.error("Error in getConversation:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (authUser) {
        getConversation();
    }
 }, [authUser]);

 // Listen for last message updates
 useEffect(() => {
    const handleLastMessageUpdate = (event) => {
        const { conversationId, lastMessage } = event.detail;
        setConversation(prev => prev.map(conv => 
            conv._id === conversationId 
                ? { ...conv, lastMessage } 
                : conv
        ));
    };

    window.addEventListener('updateLastMessage', handleLastMessageUpdate);
    return () => window.removeEventListener('updateLastMessage', handleLastMessageUpdate);
 }, []);

 return { loading, conversations };
}

export default useGetConversation
