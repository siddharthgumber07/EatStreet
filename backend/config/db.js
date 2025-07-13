import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://siddharth07:Strodinger1947$@cluster0.rodhm2z.mongodb.net/eaststreet').then(()=>console.log("DB Connected"))
}