import bcrypt from "bcrypt"
import User from "../models/user.js"
import jwt from "jsonwebtoken"
import { sendSuccess, sendError } from "../utils/response.js";

export const login = async (req,res)=>{
    const {email , password}= req.body
    try{
    const user = await User.findOne({email})
    if(!user)
        return sendError(res, 400, "User not exists");
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword)
        return sendError(res, 400, "Invalid password");
    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"})
    sendSuccess(res, 200, {Message:"User logged in successfully",token});
    }catch(error){
        next(error)
    }

}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return sendError(res, 400, "User already exists");

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashPassword });

        sendSuccess(res, 201, { Message: "User created successfully",user });
    } catch (error) {
        next(error)
    }
};