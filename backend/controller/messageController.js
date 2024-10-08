import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async (req, res)=> {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const {message} = req.body;

    let conversation = await Conversation.findOne({
      participnats: {$all:[senderId, receiverId]}
    });
    //Establish the conversation if not started yet
    if(!conversation){
      conversation = Conversation.create({
        participnats:[senderId, receiverId]
      })
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    })

    if(newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    //impliment socket.io for real time data transfer

    return res.status(201).json({newMessage, success: true})

  } catch (error) {
    console.log("MessageModel :: SendMessage :: Error : ", error);
    
  }
}

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    // Find the conversation involving both participants
    const conversation = await Conversation.findOne({
      participnats: { $all: [senderId, receiverId] },
    });

    // If no conversation is found, return an empty messages array
    if (!conversation) {
      return res.status(200).json({ status: true, messages: [] });
    }

    // Return the messages from the conversation
    return res.status(200).json({ status: true, messages: conversation.messages });
    
  } catch (error) {
    console.log("MessageModel :: getMessage :: Error:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
