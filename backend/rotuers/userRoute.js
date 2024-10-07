import express from 'express';
import { editProfile, followOrUnfollow, getProfile, getSuggestedUser, login, logout, register } from '../controller/userController.js';
import isAuthenticate from '../middlewares/isAuthenticate.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(getProfile);
router.route("/profile/edit").post(isAuthenticate,upload.single("profilePicture"),editProfile);
router.route("/suggested").get(isAuthenticate,getSuggestedUser)
router.route("/followorunfollow/:id").post(isAuthenticate,followOrUnfollow);

export default router;