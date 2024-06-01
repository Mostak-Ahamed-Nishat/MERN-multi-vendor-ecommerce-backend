import express from "express";
const router = express.Router();
import { upload } from "../config/multer/multer.js";
import { createUser } from "../controllers/userController.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

//Create a new user
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(createUser)
);

export default router;
