import useSelectedProfile from "@/hooks/useSelectedProfile";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FaHeart } from "react-icons/fa";
import { Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const { id } = params;
  useSelectedProfile(id);
  const [activeTab, setActiveTab] = useState("posts");
  const handleActiveTab = (tab) => {
    setActiveTab(`${tab}`);
  };

  const { selectedUserProfile } = useSelector((store) => store.auth);
  console.log("selectedUserProfile: ", selectedUserProfile);
  const isLoogedInProfile = false;
  const isFollowing = true;

  const displayedPost =
    activeTab === "posts"
      ? selectedUserProfile?.posts
      : selectedUserProfile?.bookMarks;
  console.log("displayedPost: ", displayedPost);

  return (
    <div className="w-[75%] mx-auto ml-[20%]">
      <div className="flex w-[100%] h-[40vh] mt-8 ">
        <div className="w-[40%]  flex justify-end pr-16 items-center">
          <Avatar className="h-32 w-32 aspect-square">
            <AvatarImage
              src={selectedUserProfile?.profilePicture}
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-[60%]  flex justify-center gap-3 flex-col">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold">
              {selectedUserProfile?.username}
            </h1>
            {isLoogedInProfile ? (
              <>
                <Button variant="outline">Edit Profile</Button>
                <Button variant="outline">View Archive</Button>
                <Button variant="outline">Add tool</Button>
              </>
            ) : isFollowing ? (
              <>
                <Button variant="outline">Unfollow</Button>
                <Button variant="outline">Message</Button>
              </>
            ) : (
              <Button variant="" className="bg-[#0095f6] hover:bg-[#4b99ff]">
                Follow
              </Button>
            )}
          </div>

          <div className="flex flex-col ">
            <div className="flex gap-12 font-semibold text-md">
              <span>
                {selectedUserProfile?.posts?.length}{" "}
                <span className="font-normal"> Post</span>
              </span>
              <span>
                {selectedUserProfile?.following?.length}{" "}
                <span className="font-normal"> following</span>
              </span>
              <span>
                {selectedUserProfile?.followers?.length}{" "}
                <span className="font-normal"> followers</span>
              </span>
            </div>
            <span className="mt-1">{selectedUserProfile?.bio}</span>
            <Badge
              variant="secondary"
              className="w-fit px-2 py-1 mt-2 cursor-pointer text-[17px]"
            >
              @{selectedUserProfile?.username}
            </Badge>

            <div>
              <pre>
                जय श्री राम <br />
                🙏🏼 Bigg Boss Ott 3 ♥️ <br />
                Mail - contactprince24.7@gmail.com
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* //////////post */}

      <div className="w-full  border-t-2">
        <div className="w-full  mt-3">
          <ul className="flex gap-3 font-normal justify-center w-full  ">
            <li
              onClick={(e) => handleActiveTab("posts")}
              className={`cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
            >
              POSTS
            </li>
            <li
              onClick={(e) => handleActiveTab("saved")}
              className={`cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
            >
              SAVED
            </li>
            <li
              onClick={(e) => handleActiveTab("reel")}
              className={`cursor-pointer ${
                activeTab === "reel" ? "font-bold" : ""
              }`}
            >
              REEL
            </li>
            <li
              onClick={(e) => handleActiveTab("tagged")}
              className={`cursor-pointer ${
                activeTab === "tagged" ? "font-bold" : ""
              }`}
            >
              TAGGED
            </li>
          </ul>
        </div>

        <div className="w-full my-3 flex flex-wrap gap-2">
          {displayedPost.map((post) => (
            <div
              key={post._id}
              className="flex flex-wrap cursor-pointer relative "
            >
              <img
                src={post.image}
                alt=""
                className="h-[370px] aspect-square rounded-md"
              />
              <div className="absolute flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="flex gap-8 text-xl text-white items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Heart />
                    {post?.likes?.length}
                  </span>
                  <span className="flex items-center gap-1">
                    {" "}
                    <MessageCircle />
                    {post?.comments?.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
