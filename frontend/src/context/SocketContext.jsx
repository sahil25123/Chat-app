import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"

export const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        let socketInstance = null;

        if (authUser) {
            socketInstance = io("https://chatter-box-av2e.onrender.com/", {
                withCredentials: true,
                query: {
                    userId: authUser._id
                }
            });

            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socketInstance.on("newMessage", (message) => {
                // Update the last message in the conversation list
                const event = new CustomEvent('updateLastMessage', {
                    detail: {
                        conversationId: message.senderId._id === authUser._id ? message.receiverId._id : message.senderId._id,
                        lastMessage: {
                            text: message.message,
                            sender: message.senderId.fullName,
                            timestamp: message.createdAt
                        }
                    }
                });
                window.dispatchEvent(event);
            });

            setSocket(socketInstance);
        }

        return () => {
            if (socketInstance) {
                socketInstance.off("getOnlineUsers");
                socketInstance.off("newMessage");
                socketInstance.close();
            }
            setSocket(null);
            setOnlineUsers([]);
        };
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
}