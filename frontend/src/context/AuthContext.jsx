import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("chat-user");
            if (storedUser) {
                setAuthUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error loading user from localStorage:", error);
            localStorage.removeItem("chat-user");
        }
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