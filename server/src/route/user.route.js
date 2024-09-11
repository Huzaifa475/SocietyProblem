import {Router} from "express";
import { registerUser, loginUser, logoutUser, informationUser, updateUser, getCurrentUser} from "../controller/user.controller.js";
import {verifyJwt} from "../middleware/auth.middleware.js"

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt ,logoutUser);

router.route("/information-update").post(verifyJwt, informationUser);

router.route("/update").post(verifyJwt, updateUser);

router.route("/getCurrentUser").get(verifyJwt, getCurrentUser);

export default router