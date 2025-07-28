import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      serverSelectionTimeoutMS:10000,
      socketTimeoutMS:45000,
      maxPoolSize:10,
      minPoolSize:1,
      bufferCommands:false
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
