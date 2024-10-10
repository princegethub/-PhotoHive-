import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

function SuggestedUsers() {
  const { suggestedUser } = useSelector((store) => store.auth);
  return (
    <div className="my-8 w-80 flex flex-col">
      <div className="flex items-center      justify-between">
        <h1 className="font-semibold opacity-90 ">Suggested for you</h1>
        <span className="font-medium cursor-pointer ">See all</span>
      </div>

      {suggestedUser.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center   mt-4 justify-between"
          >
            <div className="flex items-center ">
              <Link to={`/profile/${user._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <span className="font-semibold text-sm ml-2">
                <Link to={`/profile/${user._id}`}>{user?.username}</Link>

                <br />
                <span className="text-xs text-gray-600"> {user?.bio}</span>
              </span>
            </div>

            <span className="text-blue-500 cursor-pointer hover:text-blue-600 font-bold text-sm">
              Follow
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default SuggestedUsers;
