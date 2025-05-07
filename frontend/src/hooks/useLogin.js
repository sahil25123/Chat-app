import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("https://chatter-box-av2e.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Username: username, password }),
                credentials: 'include' // Important for receiving cookies
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Local Storage
            localStorage.setItem("chat-user", JSON.stringify(data));

            // Context
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message || "An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
    }

    return true;
} 