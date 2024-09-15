import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getSocietyEvents, getSocietyMembers, getSocietyProblems } from "../controller/society.controller.js";

const router = Router()

router.route("/members").get(verifyJwt, getSocietyMembers)

router.route("/events").get(verifyJwt, getSocietyEvents)

router.route("/problems").get(verifyJwt, getSocietyProblems)

export default router