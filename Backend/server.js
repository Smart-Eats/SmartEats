import app from './index.js';
import dotenv from 'dotenv';
import { connectDB } from './db/Connection.js';
dotenv.config();

const port = process.env.PORT||8080;

connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})