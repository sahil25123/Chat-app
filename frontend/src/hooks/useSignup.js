import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    
    const signup = async({ fullName, userName, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
        if(!success) return;
        
        setLoading(true);
        try {
            const res = await fetch("https://chatter-box-av2e.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    Username: userName,
                    password,
                    confirmPassword,
                    gender
                }),
                credentials: 'include' // Important for receiving cookies
            });
            
            const data = await res.json();
            
            if(!res.ok) {
                throw new Error(data.error || "Failed to sign up");
            }
            
            // Local Storage
            localStorage.setItem("chat-user", JSON.stringify(data));
            
            // Context
            setAuthUser(data);

            // Navigate to home page
            navigate("/");
            
        } catch(error) {
            if(error.message.includes("username")) {
                toast.error("Username already exists. Please choose another one.");
            } else {
                toast.error(error.message || "An error occurred during signup");
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
    // Check for empty fields
    if(!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    // Validate full name
    if(fullName.length < 3) {
        toast.error("Full name must be at least 3 characters long");
        return false;
    }

    // Validate username
    if(userName.length < 3) {
        toast.error("Username must be at least 3 characters long");
        return false;
    }

    if(!/^[a-zA-Z0-9_]+$/.test(userName)) {
        toast.error("Username can only contain letters, numbers, and underscores");
        return false;
    }

    // Validate password
    if(password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    // Validate gender
    if(!["male", "female", "other"].includes(gender.toLowerCase())) {
        toast.error("Please select a valid gender");
        return false;
    }

    return true;
}