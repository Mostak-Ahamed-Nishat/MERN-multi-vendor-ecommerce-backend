import User from "../models/User.js";
import fs from "fs";
import path from "path";
import { ErrorHandler } from "../utils/ErrorHandler.js";

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  
    //Is user already registered with the email ?
    const existingUser = await User.findOne({ email });
    //If the user email already exits return error
    if (existingUser) {
      return next(new ErrorHandler("This email has already been used", 400));
    }
    // Get the file
    let fileUrl = "";
    let public_id = "";
    if (req.file) {
      const filename = req.file.filename;
      fileUrl = path.join("uploads", filename);
      public_id = filename.split(".")[0];
    }

    const user = {
      name,
      email,
      password,
      avatar: {
        public_id,
        url: fileUrl,
      },
    };

    const newUser = await User.create(user);

    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    //If error delete the file
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return next(new ErrorHandler(error.message, 500));
  }
};

export { createUser };
