import {create} from "zustand";
import toast from 'react-hot-toast';
import {axiosInstance} from "../lib/axios.js"
export const useChatStore = create(()=>({
    allContacts : [],
    chats : [],
    messages: [],
    activeTab : "chats",
    selectedUser: null,
    isUserLoading : false,
    isMessagesLoading : false,
    isSoundEnabled : localStorage.getItem("isSoundEnabled")===true

    toggleSound : ()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
        set({isSoundEnabled : !get().isSoundEnabled})
    },

    setActiveTab:(tab) =>set({activetab: tab}),
    setSelectedUser : (selectedUser) => set({selectedUser}),

    getAllContacts : async() =>{
        set({isUserLoading : true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts : res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isUserLoading : false});
        }
    },
    getMychatPartners: async() =>{
        set({isUserLoading : true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({allContacts : res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isUserLoading : false});
        }
    },

}));