import React from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = React.useRef();
  const [file, setFile] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const createPostHandler = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      if (imagePreview) formData.append("image", file);
      if (caption) formData.append("caption", caption);

      const res = await axios({
        url: "/api/v1/post/addpost",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/from-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // dispatch(setPosts((prev) => prev.push(res.data)))
        navigate("/");
        toast.success(res.data.message);
        setCaption(""); // Reset caption
        setFile(null); // Optionally, reset the file input as well
      }
    } catch (error) {
      console.log("CreatePost :: createPostHandler :: error", error);
      toast.error("Failed to create post. Please try again.");
    }finally{
      setLoading(false)
    }
  };

  const fileChangeHandler = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const dataurl = await readFileAsDataUrl(file);
        setImagePreview(dataurl);
      }
    } catch (error) {
      console.log("CreatePost :: FileChangeHandlder :: error", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={(e) => setOpen(false)}>
        <DialogHeader className="font-semibold text-center">
          Create New Post
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src=""></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <h1 className="font-semibold text-gray-600">Username</h1>
              <p className="text-gray-600">Bio here........</p>
            </div>
          </div>
          <Textarea
            className="focus-visible:ring-transparent"
            placeholder="Write your caption here.."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="image_post"
              className="aspect-square object-cover h-64 w-64 mx-auto"
            />
          )}

          <div className="w-fit mx-auto">
            <input
              type="file"
              ref={imageRef}
              className="hidden"
              onChange={fileChangeHandler}
            />
            <Button
              onClick={(e) => imageRef.current.click()}
              className="bg-[#0095F6] hover:bg-[#2c91d5]"
            >
              {imagePreview
                ? "Chhose another photo"
                : "Select from your compulter"}
            </Button>
          </div>

          {imagePreview &&
            (loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2">
                Please Wait
              </Loader2>
            ) : (
              <Button onClick={createPostHandler}>Post</Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
