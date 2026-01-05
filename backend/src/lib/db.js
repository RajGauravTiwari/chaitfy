import mongoose from "mongoose"


export const connectDB = async () =>{
    try{
        const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB CONNECTED",conn.connection.host);
    }
    catch(error){
        console.log("Error connecting to MONGODB",error);
        process.exit(1);
    }
}
