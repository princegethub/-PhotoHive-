import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DataBase Connected Successfully");
//   } catch (error) {
//     console.log("Database  Connection Failed", error);
//   }
// };

const connectDB = async() => {
  try {
      await mongoose.connect("mongodb://localhost:27017/instagramClone_yt")
      console.log("DAta base connected");
      
  } catch (error) {
    console.log("Database  Connection Failed", error);
  }
}

export  default connectDB;
