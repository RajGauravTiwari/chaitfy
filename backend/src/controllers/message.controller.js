
import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js"

export const getAllContacts = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id : {$ne : loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }   

    catch(error){
        console.log("Error in getAllContacts",error);
        res.status(500).json({message : "Server Error"});
    }
}

export const getMessagesByUserId = async(req,res)=>{
    try{
        const myId = req.user._id;
        const {id : userToChatId} = req.params;

        const message = await Message.find({
            $or : [
                {senderId : myId,receieverId : userToChatId},
                {senderId : userToChatId, receieverId : myId},
            ]
        });
    }
    catch(error){
        console.log("Error in getMessageByUserId",error);
        res.status(500).json({message : "Internal Error"});
    }
}

export const sendMessage = async(req,res)=>{

    try{
    const {text, image} = req.body;

    const {id : receiverId} = req.params;

    const senderId = req.user._id;

    let imageUrl;

    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image : imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);

}
catch(error){
    console.log("error in send message ",error);
    res.status(500).json({message: "internal server error"});
}
}

export const getChatPartners = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or : [{senderId : loggedInUserId},{receieverId : loggedInUserId}],
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString()
                 ? msg.receiverId.toString() : msg.senderId.toString()
                )
            ),
        ];

        const chatPartners = await User.find({_id : {$in : chatPartnerIds}}).select("-password");

        res.status(200).json(chatPartners);
    }

    catch(error){
        console.log("Error in the getChatPartners",error);
        res.status(500).json({message : "Internal Server Error"});

    }
}