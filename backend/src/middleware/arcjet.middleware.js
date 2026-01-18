import aj from "../lib/arcjet.js";
import {isSpoofedBot} from "@arcjet/inspect";


export const arcjetprotection = async(req,res,next)=>{
    try{
        const decision = await aj.protect(req);


        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                    return res.status(429).json({message : "Rate limit exceeded. Please try again later"});
                }
            else if(decision.reason.isBot()){
                return res.status(403).json({message : "Bot access denied"});
            }
            else{
                return res.status(403).json({message : "Access denied due to security policy"});
            }
        }

        //check for spoof bot

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error : "Spoofed Bot detected",
                message : "Maliciious activity found",
            });
        }

        next();
    }
    catch(error){
        console.log("Arc Protection Error" ,error);
        next();
    }
}
