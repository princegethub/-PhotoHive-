import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaRegHeart } from "react-icons/fa";

import {
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  Save,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import CommentDilog from "./CommentDilog";
import { Input } from "./ui/input";

const Post = () => {
  const [input, setInput] =  React.useState("");
  const [showComment, setShowComment] = React.useState(false);
  const changeEventHandler =  (e) => {
    const textInput = e.target.value;
    if(textInput.trim()){
      setInput(textInput);
    }else{
      setInput("")
    }
  }


  return (
    <div className="my-8 w-full mx-auto max-w-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>Username</h1>
        </div>
        <Dialog>
          <DialogTrigger>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex items-center  flex-col text-center text-sm">
            <Button
              variant="ghost"
              className="w-fit cursor-pointer text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="w-fit cursor-pointer ">
              Add to favorites
            </Button>
            <Button variant="ghost" className="w-fit cursor-pointer ">
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="my-2 aspect-square w-full object-cover"
        src="https://i.etsystatic.com/45557286/r/il/46408b/5192627263/il_794xN.5192627263_o2x1.jpg"
        alt="post_img"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <FaRegHeart
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
          <MessageCircle onClick={(e) => setShowComment(true)} className="cursor-pointer hover:text-gray-600" />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
    <span className="font-medium block mb-2">1k Likes</span>

    <p>
      <span className="font-medium  mr-2">Username</span>
      caption
    </p>

    <span className="cursor-pointer text-sm text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"   onClick={(e) => setShowComment(true)}>View all 239 comments</span>
    <CommentDilog  showComment={showComment} setShowComment={setShowComment} />


    <div  className="flex items-center justify-between">

      <input type="text" 
      placeholder="Add to comment..."
      className="outline-none text-sm w-full"
      value={input}
      onChange={changeEventHandler}
      /> 
      {
        input &&  <span className="text-[#3BADF8]">Post</span>
      }
     
    </div>
    

    </div>
  );
};

export default Post;
