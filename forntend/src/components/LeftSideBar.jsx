import {
  House,
  Search,
  Compass,
  Heart,
  PlusCircle,
  User,
  MessageCircle,
  LogOut,
} from "lucide-react"; // Importing icons from Lucide
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const sidebarItems = [
  { icon: <House />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <Compass />, text: "Explore" },
  { icon: <MessageCircle />, text: "Message" },
  { icon: <Heart />, text: "Likes" },
  { icon: <PlusCircle />, text: "Create" },
  {
    icon: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },

  { icon: <LogOut />, text: "Logout" },
];

const LeftSideBar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "/api/v1/user/logout",
        withCredentials: true,
      });

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(error.response.data.message)
      console.log("LeftSideBar ::  logoutHandler :: error", error);
    }
  };

  const sidebarHandler = (typeText) => {
    try {
      if(typeText === 'Logout') logoutHandler();


    } catch (error) {
      console.log("LeftSideBar :: sideHandler :: error", error);
      
    }
  }

  return (
    <div className="w-[16%] border-r border-gray-300 h-screen flex flex-col   py-11 px-5 fixed top-0 z-10 ">
      <h2 className="text-sm pl-2 font-semibold  md:text-2xl">Instagram</h2>
      <div className="flex flex-col gap-2  mt-8">
        {sidebarItems.map((item, index) => (
          <div
          key={index} onClick={() =>sidebarHandler(item.text)}
          className="flex items-center gap-3 px-3 py-3 transition duration-200 ease-linear hover:bg-gray-100 rounded-sm cursor-pointer"
        >
          {item.icon}
          <span className="hidden md:block">{item.text}</span>
        </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
