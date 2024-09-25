import {Router} from "express";
import { registerUser, loginUser, logoutUser, informationUser, updateUser, getCurrentUser, uploadPhotoUser, changeAdmin, getPhoto} from "../controller/user.controller.js";
import {verifyJwt} from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt ,logoutUser);

router.route("/information-upload").post(verifyJwt, informationUser);

router.route("/update").patch(verifyJwt, updateUser);

router.route("/getCurrentUser").get(verifyJwt, getCurrentUser);

router.route("/uploadPhoto").patch(verifyJwt, upload.single('photo'), uploadPhotoUser)

router.route("/change-admin").patch(verifyJwt, changeAdmin);

router.route("/getPhoto").get(verifyJwt, getPhoto)

export default router