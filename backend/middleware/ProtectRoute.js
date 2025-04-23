import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error: "Unauthorized Access"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({error: "Unauthorized Access"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(401).json({error: "Unauthorized Access"});
        }

        req.user = user;
        next();
    }
    catch(error) {
        console.log("Error in the Protected Route", error);
        res.status(500).json({error: "Internal server Error"});
    }
}

export default protectRoute; 