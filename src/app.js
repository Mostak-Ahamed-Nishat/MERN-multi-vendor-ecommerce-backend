import express from "express";
import dotenv from "dotenv";
import handleError from "./middleware/error.js";
dotenv.config();
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

//CORS configuration

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Update this to your client URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

//Require Middleware
app.use(cors(corsOptions));
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
app.use("/api/user", authRoute);

//Handler error with custom error handler
app.use(handleError);

export default app;
