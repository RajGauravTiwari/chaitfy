import {create } from 'zustand';

// from here if we import these file in main it becomes global
export const useAuthStore = create((set)=>({

    authUser : { name : "john",_id : 123 , age : 25},
    isLoading : false,

    login : () =>{
        console.log("We just logged in");
    },
}))