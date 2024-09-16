import {Router} from "express"
import {verifyJwt} from "../middleware/auth.middleware.js"
import {fetchSocietyMembers} from "../middleware/fetchMembers.middleware.js"
import {createAlert, deleteAlertByAdmin, deleteAlertByUser, getAlert} from "../controller/alert.controller.js"

const router = Router();

router.route("/create").post(verifyJwt, fetchSocietyMembers, createAlert)

router.route("/get").get(verifyJwt, getAlert)

router.route("/deleteByUser").delete(verifyJwt, deleteAlertByUser)

router.route("/deleteByAdmin/:alertId").delete(verifyJwt, deleteAlertByAdmin)

export default router