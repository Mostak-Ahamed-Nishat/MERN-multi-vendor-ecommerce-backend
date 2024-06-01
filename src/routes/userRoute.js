import express from "express";
const router = express.Router();
import { upload } from "../config/multer/multer.js";
import { createUser } from "../controllers/userController.js";

//Create a new user
router.post("/create-user", upload.single("file"), createUser);


export default router;
