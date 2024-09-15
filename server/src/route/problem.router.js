import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {createProblem, deleteProblem, updateProblem} from "../controller/problem.controller.js";

const router = Router()

router.route("/create").post(verifyJwt, createProblem)

router.route("/update/:problemId").post(verifyJwt, updateProblem)

router.route("/delete/:problemId").post(verifyJwt, deleteProblem)

export default router