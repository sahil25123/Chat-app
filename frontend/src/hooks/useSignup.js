import React, { useState } from 'react'

import toast from "react-hot-toast"

const useSignup = () => {
    const [loading , SetLoading] = useState(false);
    const signup = async({fullName, userName , password , confirmPassword , gender}) =>{

        const success = handleInputErrors({fullName, userName , password , confirmPassword , gender})
        if(!success){
            return false
        }
        SetLoading(true);
        try{
            const res = await fetch ("http://localhost:9000/api/auth/signup",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    fullName,
                    userName,
                    password,
                    confirmPassword,
                    gender
                })
            })
            const data = await res.json();

            console.log(data);

        }
        
        catch(error){
            toast.error(error.message)
        }
        finally{
            SetLoading(false);
        }
    }

return{loading , signup};

 
}

export default useSignup


function handleInputErrors({fullName, userName , password , confirmPassword , gender}){
    if(!fullName || !userName || !password || !confirmPassword  || !gender){
        toast.error("Please Fill all the Fields")
        return false;
    }

    if(password !== confirmPassword)
    {
        toast.error("Both Password Doesnt match")
        return false;
    }

    if(password.length <6){
        toast.error("Password must be atleast 6 Characters")
        return false

    }

    return true;
}