import mongoose from "mongoose";

const ImageTextSchema = mongoose.Schema({
    image:{
        data:Buffer,
        contentType:String
    },
    extractedText:{
        type:String,
        required:false
    },
    uploadedAt:{
        type:Date,
        default:Date.now
    }
});

export const ImageData =  mongoose.model("ImageData",ImageTextSchema);