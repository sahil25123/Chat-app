import jwt from "jsonwebtoken";

const genToken_setCookie = (userId, res) =>{
    const token = jwt.sign({userId} ,process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt", token,{
        maxAge:15*24*60*60*1000, //miliseconds
        httpOnly:true, // prevent xss attacks cross site scripting attacks 
        sameSite:"strict", //CSFR attacks cross site request forgery attacks
        secure : process.env.NODE_ENV !== "devlopment"

    })
    return token;
};

export default genToken_setCookie;
