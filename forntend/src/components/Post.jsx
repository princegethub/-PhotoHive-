import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";

const Post = ({ post }) => {
  // console.log('post: ', post);
  const [input, setInput] = React.useState("");
  const [showComment, setShowComment] = React.useState(false);

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = React.useState(
    post.likes?.includes(user._id) || false
  );
  const [postLike, setPostLike] = React.useState(post.likes?.length);
  const [comment, setComment] = React.useState(post.comments);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const textInput = e.target.value;
    if (textInput.trim()) {
      setInput(textInput);
    } else {
      setInput("");
    }
  };

  const likeOrDislikeHandler = async (postId) => {
    try {
      const action = liked ? "dislike" : "like"; // Action based on current state

      // Using POST for an action that modifies the data
      const res = await axios.get(
        `/api/v1/post/${postId}/${action}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Update the like count based on whether it's a like or dislike
        const updatedLike = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLike);
        setLiked(!liked);

        // Update the post's likes by checking for the user's ID, not the postId
        const updatedPosts = posts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== postId) // Remove userId from likes if already liked
                  : [...p.likes, postId], // Add userId to likes if not already liked
              }
            : p
        );

        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      // Fallback if `error.response` is not available
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.log("Post.jsx :: likeOrDislikeHandler :: error", error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios({
        url: `/api/v1/post/${post._id}/comment`,
        method: "POST",
        data: { text: input }, // Sending the input as a key-value pair
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setInput(""); // Clear the input after a successful comment

        const updateCommentData = [res.data.comment, ...comment];
        console.log("res.data: ", res.data);
        setComment(updateCommentData);

        const updatedPosts = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updateCommentData } : p
        );

        dispatch(setPosts(updatedPosts));
      }
    } catch (error) {
      // Fallback if error response doesn't have a message
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.log("Post.jsx :: commentHandler :: error", error);
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      const res = await axios.get(`/api/v1/post/delete/${postId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedPosts = posts.filter(
          (postItem) => postItem?._id !== postId
        );
        dispatch(setPosts(updatedPosts));
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      console.log("Post.jsx ::  deletePostHandler :: error", error);
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="my-8 w-full mx-auto max-w-sm ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
        <Link to={`/profile/${post.author?._id}`}>
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </Link>
          <div className="text-md flex gap-2  items-center font-semibold">
          <Link to={`/profile/${post.author?._id}`}>


            <h1 className="h-full -mt-1">{post.author.username}</h1>
        </Link>
            {user?._id === post?.author?._id && (
              <Badge variant="outline">Author</Badge>
            )}
          </div>
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
            {user && user._id === post.author?._id && (
              <Button
                onClick={() => deletePostHandler(post._id)}
                variant="ghost"
                className="w-fit cursor-pointer "
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="my-2 aspect-square w-full object-cover"
        src={post.image}      
        alt="post_img"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          {liked ? (
            <FaHeart
              onClick={(e) => likeOrDislikeHandler(post._id)}
              className="transition cursor-pointer duration-300 ease-in text-[#ED4956] text-[22px]"
            />
          ) : (
            <FaRegHeart
              onClick={(e) => likeOrDislikeHandler(post._id)}
              size={"22px"}
              className="cursor-pointer transition duration-300 ease-in hover:text-gray-600"
            />
          )}

          <MessageCircle
            onClick={(e) => {
              dispatch(setSelectedPost(post));
              setShowComment(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">{postLike} Likes</span>

      <p>
        <span className="font-medium  mr-2">{post.author?.username}</span>
        {post?.caption}
      </p>

      {comment?.length > 0 && (
        <span
          className="cursor-pointer text-sm text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
          onClick={(e) => {
            dispatch(setSelectedPost(post));
            setShowComment(true);
          }}
        >
          View all {comment?.length} comments
        </span>
      )}

  

      <CommentDilog showComment={showComment} setShowComment={setShowComment} />

      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add to comment..."
          className="outline-none text-sm w-full"
          value={input}
          onChange={changeEventHandler}
        />
        {input && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
