import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useGetConversation = () => {
 const [loading , setLoading] = useState(false);
 const [conversations , setConversation] = useState([]);
 const { authUser } = useAuthContext();

 useEffect(() =>{
    const getConversation = async () =>{
        setLoading(true);
        try{
            const res = await fetch("http://localhost:9000/api/users", {
                credentials: 'include' // This is important for sending cookies
            });
            
            if (!res.ok) {
                throw new Error("Failed to fetch conversations");
            }
            
            const data = await res.json();
            // console.log("Fetched conversations:", data);

            if(data.error){
                throw new Error(data.error);
            }
            setConversation(data);

        }
        catch(error){
            console.error("Error in getConversation:", error);
            toast.error(error.message)
        }
        finally{
            setLoading(false);
        }
    }

    if (authUser) {
        getConversation();
    }
 },[authUser])

 return { loading, conversations };
}

export default useGetConversation
