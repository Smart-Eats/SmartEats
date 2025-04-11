
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
       data:{type:Buffer,required:true},
       contentType:{type:String,required:true},
       default:"/uploads/default.gif"
    },    
    isOAuth:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export const user = mongoose.model("User",userSchema);