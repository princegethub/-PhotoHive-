import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { toast } from "sonner";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import  "../../src/App.css";
const CommentDialog = ({ showComment, setShowComment }) => {
  const [input, setInput] = React.useState("");
  const { posts } = useSelector((store) => store.post);
  const { selectedPost } = useSelector((store) => store.post);

  // Initialize comment state safely
  const [comment, setComment] = React.useState(selectedPost?.comments || []);
    
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Update the comments state whenever selectedPost changes
    if (selectedPost?.comments) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const textTarget = e.target.value;
    setInput(textTarget.trim() ? textTarget : "");
  };

  const submitHandler = async () => {
    try {
      const res = await axios({
        url: `/api/v1/post/${selectedPost._id}/comment`,
        method: "POST",
        data: { text: input },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setInput(""); // Clear the input after a successful comment

        // Update the comment data correctly
        const updatedComment = [res.data.comment, ...comment];

        // Update the comment state
        setComment(updatedComment);

        // Update the selectedPost in Redux
        const updatedPost = { ...selectedPost, comments: updatedComment };
        dispatch(setSelectedPost(updatedPost));

        // Also update the posts in the Redux store
        const updatedPosts = posts.map((p) =>
          p._id === selectedPost._id ? updatedPost : p
        );

        dispatch(setPosts(updatedPosts)); // Update the posts with the new comments
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.log("CommentDialog.jsx :: submitHandler :: error", error);
    }
  };

  return (
    <Dialog open={showComment}>
      <DialogContent
        aria-describedby="comment-dialog-description"
        onInteractOutside={() => setShowComment(false)}
        className="max-w-5xl p-0 flex flex-col object-cover"
      >
        <p id="comment-dialog-description" className="sr-only">
          This section contains user comments. You can add, view, or reply to
          comments here.
        </p>

        <div className="flex w-full object-cover items-center justify-between flex-1">
          <div className="w-1/2 h-[510px]">
            <img
              src={selectedPost.image}
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          <div className="flex w-1/2 flex-col justify-around h-[510px] p-4">
            {/* Profile Section */}
            <div className="flex items-center justify-between py-3 border-b border-gray-400">
              <div className="flex items-center w-1/2 justify-start">
                <Avatar>
                  <AvatarImage src={selectedPost.author?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-xs ml-2">
                  {selectedPost.author?.username}
                </span>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    {/* Options */}
                    <div className="text-center cursor-pointer text-[#ED4956] font-semibold border-b-2 py-2">
                      Report
                    </div>
                    <div className="text-center cursor-pointer border-b-2 py-2">
                      Not Interested
                    </div>
                    <div className="text-center cursor-pointer border-b-2 py-2">
                      Go to post
                    </div>
                    <div className="text-center cursor-pointer border-b-2 py-2">
                      Share to...
                    </div>
                    <div className="text-center cursor-pointer border-b-2 py-2">
                      Copy Link
                    </div>
                    <div className="text-center cursor-pointer border-b-2 py-2">
                      Embed
                    </div>
                    <div className="text-center cursor-pointer border-b-2 py-2">
                      About this account
                    </div>
                    <div className="text-center cursor-pointer py-2">
                      Cancel
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Scrollable Comments Section */}
            <div className="flex-1 mt-5 max-h-[350px] scrollable">
              <div className="flex flex-col space-y-2">
                {/* Comments */}
                {comment && comment.length > 0 ? (
                  comment.map((comment, index) => (
                    <div key={index} className="p-2 w-full bg-gray-200 rounded">
                      <div className="flex items-start space-x-2">
                        <Avatar>
                          <AvatarImage src={comment.author?.profilePicture} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="font-bold pr-4">
                          {comment.author?.username}
                        </h1>
                      </div>
                      <p className="whitespace-normal ml-12 -mt-4 break-words">
                        {comment.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-2 bg-gray-200 rounded">No Comment...</div>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                onChange={changeEventHandler}
                placeholder="Add a comment..."
                className="w-full outline-none border py-2 rounded-lg px-4 border-gray-400"
              />
              <Button
                variant="outline"
                disabled={!input.trim()}
                onClick={submitHandler}
                className="text-[blue]"
              >
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
