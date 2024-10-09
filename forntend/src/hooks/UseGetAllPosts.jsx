import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        let res = await axios({
          method: "get",
          url: "/api/v1/post/all",
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log("UseGEtAlllPosts :: Error", error);
      }
    };
    fetchAllPost();
  }, []);
};

export default useGetAllPosts;
