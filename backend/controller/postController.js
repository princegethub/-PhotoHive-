import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";
import { Comment } from "../models/commentModel.js";

export const addNewPost = async (req, res) => {
  try {
    const authorId = req.id;
    const { caption } = req.body;
    const image = req.file;

    if (!image)
      return res
        .status(401)
        .json({ message: "Post Not Created Image is required" });

    //Optimize image
    const optimizeImageBuffer = await sharp(image.buffer)
      .resize({ height: 800, width: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizeImageBuffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    //DataBase Post Model
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(200).json({
      message: "New Post Added",
      success: true,
      post,
    });
  } catch (error) {
    console.log("PostController :: addnewPost :: Error", error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        options: { sort: { createAt: -1 } },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log("PostController :: getAllPost :: Error", error);
    return res.status(500).json({ message: "Error fetching posts", success: false });
  }
};


export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createAt: -1 })
      .populate({
        path: "author",
        select: "username, profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log("PostModel :: GetUserpost :: Error ", error);
  }
};

export const likePost = async (req, res) => {
  try {
    const likeKarneWalaUserkiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "post not found", success: false });

    await post.updateOne({ $addToSet: { likes: likeKarneWalaUserkiId } });
    await post.save();

    //implementing socket io for real time notification

    return res.status(200).json({ message: "Post liked", success: true });
  } catch (error) {
    console.log("PostController :: likePost :: Error", error);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const dislikeKarneWalaUserkiId = req.id;
    const postId = req.params.id;
    console.log('postId: ', postId);

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    await Post.updateOne({ $pull: { likes: dislikeKarneWalaUserkiId } });
    await post.save();

    return res.status(200).json({ message: "Post Disliked", success: true });
  } catch (error) {
    console.log("PostController :: dislikePost :: Error", error);
  }
};

export const addComment = async (req, res) => {
  try {
    const commentKarneWaleKiId = req.id; // ID of the user adding the comment
    const postId = req.params.id; // ID of the post to add the comment to
    const { text } = req.body;
    console.log('text: ', text);

    if (!text) {
      return res.status(401).json({ message: "Comment Required", success: false });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    const comment = await Comment.create({
      text,
      author: commentKarneWaleKiId,
      post: postId,
    });

    // Populate the author field without execPopulate()
    await comment.populate({
      path: "author",
      select: "username profilePicture",
    });

    post.comments.push(comment._id); // Correctly pushing the comment to the post's comments array
    await post.save();

    return res.status(200).json({ message: "Comment Added", success: true });
  } catch (error) {
    console.log("PostController :: addComment :: Error", error);
    return res.status(500).json({ message: "Error adding comment", success: false });
  }
};



export const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePicture"
    );

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        message: "No Comment Found for this post",
        success: false,
      });
    }

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log("PostController :: getCommentOfPost :: Error", error);
    return res.status(500).json({ message: "Error fetching comments", success: false });
  }
};


export const deletePost = async (req, res) => {
  try {
    const authorId = req.id; // ID of the logged-in user
    const postId = req.params.id; // ID of the post to be deleted

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    // Check if the logged-in user is the owner of the post
    if (post.author.toString() !== authorId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    // Remove the post ID from the user's posts array
    const user = await User.findById(authorId);
    user.posts = user.posts.filter(id => id.toString() !== postId);
    await user.save(); // Save the updated user

    // Delete associated comments
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({ message: "Post Deleted", success: true });
  } catch (error) {
    console.log("PostController :: deletePost :: Error", error);
    return res.status(500).json({ message: "Error deleting post", success: false });
  }
};


export const bookMarkPost = async (req, res) => {
  try {
    const authorId = req.id; // ID of the logged-in user
    const postId = req.params.id; // ID of the post to be bookmarked

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post not found", success: false });
    }

    const user = await User.findById(authorId);
    if (user.bookMarks.includes(post._id)) {
      // If the post is already bookmarked, remove it
      await user.updateOne({ $pull: { bookMarks: post._id } });
      return res.status(200).json({ message: "Post removed from bookmarks", type: "Unsaved", success: true });
    } else {
      // If the post is not bookmarked, add it
      await user.updateOne({ $addToSet: { bookMarks: post._id } });
      return res.status(200).json({ message: "Post saved to bookmarks", type: "Saved", success: true });
    }

  } catch (error) {
    console.log("PostController :: bookMarkPost :: Error:", error);
    return res.status(500).json({ message: "Error bookmarking post", success: false });
  }
};
