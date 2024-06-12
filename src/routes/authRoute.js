import express from "express";
const router = express.Router();
import { upload } from "../config/multer/multer.js";
import {
  activationUserByEmail,
  createUser,
  loginUser,
} from "../controllers/authController.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

//Create a new user
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(createUser)
);

//Active user by email verification
router.post("/activation", catchAsyncErrors(activationUserByEmail));

router.post("/login", catchAsyncErrors(loginUser));

export default router;
