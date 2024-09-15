import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from "./route/user.route.js"
import eventRouter from "./route/event.route.js"
import problemRouter from "./route/problem.router.js"
import societyRouter from "./route/society.router.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/problem", problemRouter);
app.use("/api/v1/society", societyRouter);

export {app}