import express from 'express';
import isAuthenticate from '../middlewares/isAuthenticate.js';
import upload from '../middlewares/multer.js';
import { addComment, addNewPost, bookMarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPost, likePost } from '../controller/postController.js';

const router = express.Router();

router.route("/new").post(isAuthenticate, upload.single("postImage"), addNewPost);
router.route("/").get(isAuthenticate,getAllPost);
router.route("/:id").get(isAuthenticate, getUserPost);
router.route("/l/:id").get(isAuthenticate, likePost);
router.route("/d/:id").get(isAuthenticate, dislikePost);
router.route("/c/:id").post(isAuthenticate, addComment);
router.route("/c/:id").get(isAuthenticate, getCommentOfPost);
router.route("/b/:id").get(isAuthenticate, bookMarkPost);
router.route("/d/:id").get(isAuthenticate, deletePost);


export default router;