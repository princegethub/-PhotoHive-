import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { FaRegHeart } from "react-icons/fa";

const CommentDialog = ({ showComment, setShowComment }) => {
  const [input, setInput] = React.useState("");
  
  const changeEventHandler = (e) => {
    const textTarget = e.target.value;
    if (textTarget.trim()) {
      setInput(textTarget);
    } else {
      setInput("");
    }
  };

  const submitHandler = async () => {
    try {
      alert(input);
    } catch (error) {
      console.log("CommentDialog :: submitHandler :: error", error);
    }
  };

  return (
    <Dialog open={showComment}>
      <DialogContent
        aria-describedby="comment-dialog-description"
        onInteractOutside={() => setShowComment(false)}
        className="max-w-5xl p-0 flex flex-col object-cover"
      >
        {/* <DialogTitle>Comments Section</DialogTitle> */}
        <p id="comment-dialog-description" className="sr-only">
          This section contains user comments. You can add, view, or reply to comments here.
        </p>
        
        <div className="flex w-full object-cover items-center justify-between flex-1">
          <div className="w-1/2 h-full">
            <img
              src="https://i.etsystatic.com/45557286/r/il/46408b/5192627263/il_794xN.5192627263_o2x1.jpg"
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          <div className="flex w-1/2 flex-col justify-around  h-[510px] p-4">
            {/* Profile Section */}

            <div className="flex items-center  justify-between  py-3 border-b border-gray-400">
              <div className="flex items-center w-1/2 justify-start">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-xs ml-2">Username</span>
              </div>
            
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>

                  <DialogContent>
                    <div className="text-center cursor-pointer text-[#ED4956] font-semibold border-b-2 py-2">Report</div>
                    <div className="text-center cursor-pointer border-b-2 py-2">Not Interested</div>
                    <div className="text-center cursor-pointer border-b-2 py-2">Go to post</div>
                    <div className="text-center cursor-pointer border-b-2 py-2">Share to...</div>
                    <div className="text-center cursor-pointer border-b-2 py-2">Copy Link</div>
                    <div className="text-center cursor-pointer border-b-2 py-2">Embed</div>
                    <div className="text-center cursor-pointer border-b-2 py-2">About this account</div>
                    <div className="text-center cursor-pointer py-2">Cancel</div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
      
            {/* Scrollable Comments Section */}
            <div className="flex-1 overflow-y-auto mt-5 max-h-[350px]">
              <div className="flex flex-col space-y-2">
                {/* Dummy comments */}
                <div className="p-2 bg-gray-200 rounded">Comment 1</div>
                <div className="p-2 bg-gray-200 rounded">Comment 2</div>
                <div className="p-2 bg-gray-200 rounded">Comment 2</div>
                <div className="p-2 bg-gray-200 rounded">Comment 2</div>
                <div className="p-2 bg-gray-200 rounded">Comment 2</div>
          
               
              </div>
            </div>

      

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                onChange={changeEventHandler}
                placeholder="Add a comment..."
                className="w-full outline-none border py-2 rounded-lg px-4 border-gray-400"
              />
              <Button variant="outline" disabled={!input.trim()} onClick={submitHandler} className="text-[blue]">
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
