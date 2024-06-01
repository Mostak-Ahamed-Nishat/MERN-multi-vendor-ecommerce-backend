import express from "express";
import dotenv from "dotenv";
import { ErrorHandler } from "./utils/ErrorHandler.js";
dotenv.config();
const app = express();
import cookieParser from "cookie-parser";
import multer from 'multer';

//Require Middleware

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Middleware to handle file uploads


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "",
  });
}

//Handler error with custom error handler
app.use(ErrorHandler);

export default app;
