import app from '../index.js';
import dotenv from 'dotenv';
import { connectDB } from '../db/Connection.js';
import { CleanUp_Pending_User } from '../utils/CleanUp-Pending-user.js';
dotenv.config();

const port = process.env.PORT||8080;

CleanUp_Pending_User();
connectDB();
// app.get('/',(req,res)=>{
//     res.send("hello world");
// })
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
