import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./utils/dbConnection.js";
import userRoute from './rotuers/userRoute.js';
import postRoute from './rotuers/postRoute.js';
import messageRoute from './rotuers/messageRoute.js';

const app = express();
const port = process.env.PORT || 3000;

var corsOptions = {
  origin: "http://localhost:5173/",
  optionsSuccessStatus: 200,
};

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

///Yaha pr apni api call aaynge
app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/message", messageRoute)


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  connectDB();``
  console.log(`Server running on port ${port} 🔥`);
});
