import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://chatter-box-av2e.onrender.com/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Clear local storage
            localStorage.removeItem("chat-user");

            // Clear context
            setAuthUser(null);

            // Navigate to login page
            navigate("/login");

        } catch (error) {
            toast.error(error.message || "An error occurred during logout");
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
