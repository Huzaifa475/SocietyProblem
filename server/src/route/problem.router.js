import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {fetchSocietyMembers} from "../middleware/fetchMembers.middleware.js"
import {createProblem, deleteProblem, updateProblem} from "../controller/problem.controller.js";

const router = Router()

router.route("/create").post(verifyJwt, fetchSocietyMembers,createProblem)

router.route("/update/:problemId").patch(verifyJwt, updateProblem)

router.route("/delete/:problemId").delete(verifyJwt, deleteProblem)

export default router