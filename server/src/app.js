import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiError } from "./util/apiError.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))

app.use(express.json({limit: "10mb"}))

app.use(express.urlencoded({extended: true, limit: "10mb"}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from "./route/user.route.js"
import eventRouter from "./route/event.route.js"
import problemRouter from "./route/problem.router.js"
import societyRouter from "./route/society.router.js"
import notificationRouter from "./route/notification.route.js"
import alertRouter from "./route/alert.route.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/problem", problemRouter);
app.use("/api/v1/society", societyRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/alert", alertRouter);

app.use((req, res, next) => {
    const error = new apiError(404, 'Resource not found');
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      statusCode: statusCode
    });
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use('/', () => {
    console.log('Welcome to server');
})

export {app}