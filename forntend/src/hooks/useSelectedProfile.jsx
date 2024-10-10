
import { setSleectedUserProfile } from "@/redux/authSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSelectedProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSelectedProfile = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `/api/v1/user/${userId}/profile`,
          withCredentials: true,
        });
        
        if (res.data.success) { 
          dispatch(setSleectedUserProfile(res.data.user));
        }
      } catch (error) {
        console.log("useSelectedProfile :: Error", error);
      }
    };
    fetchSelectedProfile();
  }, [userId]);
};

export default useSelectedProfile;
