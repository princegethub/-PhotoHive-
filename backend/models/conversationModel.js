import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participnats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

export default Conversation = mongoose.model("Conversation", conversationSchema);