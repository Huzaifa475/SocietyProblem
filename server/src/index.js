import mongoose from "mongoose";
import connectDB from "./database/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port: ${process.env.PORT || 5000}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!!", err);
})