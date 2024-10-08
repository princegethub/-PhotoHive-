import express from 'express';
import isAuthenticate from '../middlewares/isAuthenticate.js';
import upload from '../middlewares/multer.js';
import { addComment, addNewPost, bookMarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPost, likePost } from '../controller/postController.js';

const router = express.Router();

router.route("/addpost").post(isAuthenticate, upload.single("image"), addNewPost);
router.route("/all").get(isAuthenticate,getAllPost);
router.route("/userpost/all").get(isAuthenticate, getUserPost);
router.route("/:id/like").get(isAuthenticate, likePost);
router.route("/:id/dislike").get(isAuthenticate, dislikePost);
router.route("/:id/comment").post(isAuthenticate, addComment);
router.route("/:id/comment/all").get(isAuthenticate, getCommentOfPost);
router.route("/:id/bookmark").get(isAuthenticate, bookMarkPost);
router.route("/delete/:id").get(isAuthenticate, deletePost);


export default router;