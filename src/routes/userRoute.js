import express from "express";
import { userData } from "../controllers/userController.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import isAuthenticated from "../middleware/auth.js";
const router = express.Router();

router.get("/", isAuthenticated, catchAsyncErrors(userData));

export default router;
