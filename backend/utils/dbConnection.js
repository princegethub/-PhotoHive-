import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DataBase Connected Successfully");
//   } catch (error) {
//     console.log("Database  Connection Failed", error);
//   }
// };
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not defined in the environment variables.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/instagramClone_yt");
    console.log("DAta base connected");
  } catch (error) {
    console.log("Database  Connection Failed", error);
  }
};

export default connectDB;
