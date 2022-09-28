import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js"

const secret = "test";

export const signup = async(req, response) => {
    const {email, password, firstName, lastName} = req.body;
    
    try{
        const oldUser = await UserModel.findOne({email});

        if(oldUser){
            return response.status(400).json({message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({
            email,
            password : hashedPassword,
            name : `${firstName} ${lastName}`
        });

        const token = jwt.sign({email : result.email, id: result.id}, secret, {expiresIn: "1h"});
        response.status(201).json({result, token});
    } catch(error){
        response.status(500).json({message : "Something went wrong"});
        console.log(error);
    }
};

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try{
        const oldUser = await UserModel.findOne({email});
        if(!oldUser){
            return res.status(404).json({message : " User does not exists"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email:oldUser.email, id: oldUser.id}, secret, {expiresIn: "1h"});
        res.status(200).json({result : oldUser, token});
    }catch(error){
        response.status(500).json({message : "Something went wrong"});
        console.log(error);
    }
}