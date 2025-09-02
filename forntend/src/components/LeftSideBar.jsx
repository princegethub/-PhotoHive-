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
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setAtuhUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";

const LeftSideBar = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "/api/v1/user/logout",
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAtuhUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("LeftSideBar ::  logoutHandler :: error", error);
    }
  };

  const sidebarHandler = (typeText) => {
    try {
      if (typeText === "Logout") {
        logoutHandler();
      } else if (typeText === "Create") {
        setOpen(true);
      } else if (typeText === "Profile") {
        navigate(`/profile/${user?._id}`);
      } else if (typeText === "Home") {
        navigate(`/`);
      }
    } catch (error) {
      console.log("LeftSideBar :: sideHandler :: error", error);
    }
  };

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
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },

    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <div className="w-[16%] border-r border-gray-300 h-screen flex flex-col   py-11 px-5 fixed top-0 z-10 ">
      <h2 className="text-sm pl-2 font-semibold  md:text-2xl">PhotoHive🌟</h2>
      <div className="flex flex-col gap-2  mt-8">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => sidebarHandler(item.text)}
            className="flex items-center gap-3 px-3 py-3 transition duration-200 ease-linear hover:bg-gray-100 rounded-sm cursor-pointer"
          >
            {item.icon}
            <span className="hidden md:block">{item.text}</span>
          </div>
        ))}
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSideBar;
