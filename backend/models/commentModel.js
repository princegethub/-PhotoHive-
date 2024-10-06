import mongoose from "mongoose";

const commnetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { tyee: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

export default Comment =  mongoose.model("Comment", commnetSchema);
