import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message : "Password must be atleast 6 characters"});   
        }

        const emailRegex = /^[^\s@]+@@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)){
            return res.status(400).json({message : "Email format is invalid"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message : "Email already Exist"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            });
        }
        else{
            res.status(400).json({message : "Invalid User Data"});

        }

    }
    catch(error){
        console.log("Error is Signup Controller" + error);
        res.status(500).json({message : "Internal Sever Error"});
    }

}