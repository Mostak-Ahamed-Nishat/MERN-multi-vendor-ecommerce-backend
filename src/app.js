import express from "express";
import dotenv from "dotenv";
import handleError from "./middleware/error.js";
dotenv.config();
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";

//Require Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "",
  });
}

//Application Routes
app.use("/api/user", userRouter);

//Handler error with custom error handler
app.use(handleError);

export default app;
