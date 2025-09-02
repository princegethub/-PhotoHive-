import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://admin:admin@mongo:27017/instagram?authSource=admin";
    console.log("🔗 Trying to connect:", uri);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected");
  } catch (error) {
    console.log("❌ Database Connection Failed", error);
  }
};

export default connectDB;
