import bcrypt from "bcrypt"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

export const login = async (req,res)=>{
    const {email , password}= req.body
    if(!email || password)
        return res.status(400).json({Message:"Fieled not remian empty"})
    const user = await User.findOne({email})
    if(!user)
        return res.status(400).json({Message:"User not exists"})
    const comparePassword = await bycrypt.compare(password,user.password)
    if(!comparePassword)
        return res.status(400).json({Message:"Invalid password"})
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(200).json({Message:"User logged in successfully",token})

}

export const register = async (req,res)=>{
    const {name , email , password}= req.body
    if(!name || !email || password)
        return res.status(400).json({Message:"Fieled not remian empty"})
    const User = await User.findOne({email})
    if(User)
        return res.status(400).json({Message:"User already exists"})
    const hashPassword = await bycrypt.hash(password,10)
    const user = await User.create({name,email,hashPassword})
    res.status(201).json({Message:"User created successfully"}) 
}