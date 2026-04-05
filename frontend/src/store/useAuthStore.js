import {create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";

// from here if we import these file in main it becomes global
export const useAuthStore = create((set)=>({

   authUser : null,
   isCheckingAuth: true,
   isSigningUp : false,
   isLoggingIn : false,
   onlineUsers: [],

   checkAuth: async()=>{
    try {
        const res = await axiosInstance.get("/auth/check");
        set({authUser : res.data});
    } catch (error) {
        console.log("Error in authCheck ",error);
        set({authUser : null});
    }
    finally{
        set ({isCheckingAuth : false});
    }
   },

   signup :  async(data) =>{
    set({isSigningUp : true});
    try {
        const res = await axiosInstance.post("/auth/signup",data);
        set({authUser : res.data});
        toast.success("Account created succesfully!");
    } catch (error) {
        toast.error(error.response.data.message);
    }
    finally{
        set({isSigningUp : false});
    }
   },

   login : async(data)=>{
    set({isLoggingIn : true});
    try {
        const res = await axiosInstance.post("/auth/login",data);
        set({authUser : res.data});
        toast.success("LoggedIn Succesfully");
        
    } catch (error) {
        toast.error(error.response.data.message);
    }
    finally{
        set({isLoggingIn : false});
    }
   },

   logout : async()=>{
    try{
        await axiosInstance.post("/auth/logout");
        set({authUser : null});
        toast.success("Logged out successfully");
    }
    catch(error){
        toast.error("Error Logging Out");
        console.log("Logout Error" ,error);
    }
   },

   updateProfile : async(data) =>{
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser : res.data});
            toast.success("Profile updated Successfully");
        } catch(error){
            console.log("Error in update profile : ",error);
            toast.error(error.response.data.message);
        }
   }

}));
