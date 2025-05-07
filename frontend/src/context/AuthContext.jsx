import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const storedUser = localStorage.getItem("chat-user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    // Verify the user is still valid by making a request
                    const res = await fetch("https://chatter-box-av2e.onrender.com/api/users", {
                        headers: {
                            "Authorization": `Bearer ${parsedUser.token}`,
                            "Content-Type": "application/json"
                        },
                        credentials: 'include'
                    });
                    
                    if (res.ok) {
                        setAuthUser(parsedUser);
                    } else {
                        // If the request fails, clear the stored user
                        localStorage.removeItem("chat-user");
                        setAuthUser(null);
                    }
                }
            } catch (error) {
                console.error("Error checking user authentication:", error);
                localStorage.removeItem("chat-user");
                setAuthUser(null);
            }
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};