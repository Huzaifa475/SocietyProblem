import { Router } from "express"
import {verifyJwt} from "../middleware/auth.middleware.js"
import {createEvent, deleteEvent, updateEvent} from "../controller/event.controller.js"

const router = Router()

router.route("/create").post(verifyJwt, createEvent);

router.route("/update/:eventId").post(verifyJwt, updateEvent);

router.route("/delete/:eventId").post(verifyJwt, deleteEvent);

export default router