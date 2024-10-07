import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config({})
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing. Plese Check!",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User Already Exits!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Account Created Successfully...",
      success: true,
    });
  } catch (error) {
    console.log("Controller :: Register :: error", error);
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email or password is missing
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing. Please check!",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
        success: false,
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Check your email and password!",
        success: false,
      });
    }

    // Construct a new user object (without password)
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
    };

    

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set token as a cookie and return user data
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user: userData,
      });

  } catch (error) {
    console.log("Controller :: Login :: error", error);
  }
};


export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Controller :: Logout :: error", error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId).select("-password");
  

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log("Controller :: GetProfile :: error", error);
  }
};

export const editProfile = async (req, res) => {
  try {
    
    const userId = req.id;
    const { bio, gender } = req.body;
    
    const profilePicture = req.file;
    let cloudResponse;

    // If profilePicture exists, upload it to Cloudinary
    if (profilePicture) {

      
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri); // Use 'await' here
    }

    // Find user by ID
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    // Update user's profile information
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;
    if (gender) user.gender = gender;

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      message: "Profile Updated Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Controller :: EditProfile :: error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};


export const getSuggestedUser = async (req, res) => {
  try {
    const suggestedUser =await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUser) {
      return res.status(400).json({
        message: "Currently Do not have any User",
      });
    }

    return res.status(200).json({
      success: true,
      users: suggestedUser,
    });
  } catch (error) {
    console.log("Controller :: getSuggestedUser :: error", error);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followKarneWala = req.id; //Prince
    const jiskoFollowKarunga = req.params.id; // Ishani
    if (followKarneWala === jiskoFollowKarunga) {
      return res.status(400).json({
        message: "You can't follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(followKarneWala);
    const targetUser = await User.findById(jiskoFollowKarunga);

    if (!user || !targetUser) {
      returnres.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    //mai check karunga follow karu ya unfollow
    const isFollowing = user.following.includes(jiskoFollowKarunga);
    if (isFollowing) {
      //Unfollow Logic
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $pull: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $pull: { followers: followKarneWala } }
        ),
      ]);
      return res
        .status(200)
        .json({ message: "unFollow Successfully", success: true });
    } else {
      //follow Logic
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $push: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $push: { followers: followKarneWala } }
        ),
      ]);
      return res
        .status(200)
        .json({ message: "Follow Successfully", success: true });
    }
  } catch (error) {
    console.log("Controller :: followOrUnfollow :: error", error);
  }
};
