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


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://admin:admin@mongo:27017/instagram?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

    console.log("Database connected");
  } catch (error) {
    console.log("Database  Connection Failed", error);
  }
};

export default connectDB;
