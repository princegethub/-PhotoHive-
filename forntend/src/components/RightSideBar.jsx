import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React from "react";
import { useSelector } from "react-redux";
import SuggestedUser from "./SuggestedUser";
import { Link } from "react-router-dom";

const RightSideBar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="pr-48 fixed right-0">
      <div className="flex items-center mt-16">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <span className="font-semibold text-sm ml-2">
          <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          <br />
          <span className="text-xs text-gray-600"> {user?.bio}</span>
        </span>
      </div>

      <SuggestedUser />
    </div>
  );
};

export default RightSideBar;
