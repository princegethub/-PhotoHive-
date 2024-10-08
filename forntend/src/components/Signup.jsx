import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [input, setInput] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const changeEventHandlder = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios({
        method: "post",
        url: "/api/v1/user/register", // Hitting the proxied URL
        data: input,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login")
        toast.success("User created successfully");
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log("Signup :: submitHandler :: Error : ", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">
      <form
        onSubmit={submitHandler}
        className="shadow-lg bg-white rounded-lg p-8 max-w-md w-full"
      >
        <div className="flex flex-col justify-center gap-5">
          <div className="text-center">
            <h2 className="text-4xl font-bold opacity-80 mb-2">Instagram</h2>
            <p className="text-sm text-gray-600">
              Signup to see photos & videos from your friends and family
            </p>
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              className="focus-visible:ring-transparent my-2 border border-gray-300 rounded-lg w-full px-4 py-2"
              name="username"
              value={input.username}
              onChange={changeEventHandlder}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="focus-visible:ring-transparent my-2 border border-gray-300 rounded-lg w-full px-4 py-2"
              name="email"
              value={input.email}
              onChange={changeEventHandlder}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="focus-visible:ring-transparent my-2 border border-gray-300 rounded-lg w-full px-4 py-2"
              name="password"
              value={input.password}
              onChange={changeEventHandlder}
              disabled={loading}
            />
          </div>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              className={`bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white w-full py-2 rounded-lg font-semibold ${
                loading ? "opacity-70" : ""
              }`}
              disabled={loading}
            >Sign  Up</Button>

          )}

          <span className=" text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600 text-center">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
