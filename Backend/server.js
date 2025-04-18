import app from './index.js';
import dotenv from 'dotenv';
import { connectDB } from './db/Connection.js';
import cors from 'cors';
import { CleanUp_Pending_User } from './utils/CleanUp-Pending-user.js';
dotenv.config();

const port = process.env.PORT||8080;
app.use(cors({
    origin: "http://localhost:5173",  // React runs here
    credentials: true
  }));
CleanUp_Pending_User();
connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})