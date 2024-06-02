import express from "express";
const router = express.Router();
import { upload } from "../config/multer/multer.js";
import {
  activationUserByEmail,
  createUser,
} from "../controllers/userController.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

//Create a new user
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(createUser)
);

//Active user by email verification
router.post(
  "/activation",
  catchAsyncErrors(activationUserByEmail)
);

export default router;
