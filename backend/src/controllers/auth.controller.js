import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

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
            // sending email

            try{
                await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL);
            }
            catch(error){
                console.log("Email sent failed :",error);
            }
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

export const login = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message : "Invalid Credentials"});


        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid Credentials"});

    

        generateToken(user._id,res);

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic,
            message : "Login Successfull"
        });


    }
    catch(error){
        console.error("Error in the login controller",error);
        res.status(500).json({message : "Internal server error"});
    }
}

export const logout = async(req,res) =>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message : "Logged out succesfully"});

}