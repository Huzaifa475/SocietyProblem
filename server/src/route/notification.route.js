import {Router} from "express"
import {getNotification, deleteNotification} from "../controller/notification.controller.js"
import {verifyJwt} from "../middleware/auth.middleware.js"

const router = Router();

router.route("/get").get(verifyJwt, getNotification)

router.route("/delete").delete(verifyJwt, deleteNotification);

export default router