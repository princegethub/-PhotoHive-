import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Posts = () => {
  const {posts} = useSelector(store=> store.post)
  return (
    <div className=" pl-40">
      {posts.map(post => (<Post key={post._id}  post={post}/> ))}
    </div>
  );
};

export default Posts;
