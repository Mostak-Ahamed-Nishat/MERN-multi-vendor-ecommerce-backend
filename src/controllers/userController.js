import User from "../models/User.js";
import fs from "fs";
import path from "path";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtAuthToken.js";
import createActivationJwtToken from "../helpers/createActivationJwtToken.js";

//**Create a user or signup**
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if the user is already registered with the email
    const existingUser = await User.findOne({ email });
    // If the email already exists, return an error
    if (existingUser) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return next(new ErrorHandler("This email has already been used", 400));
    }

    // Handle the file upload
    let fileUrl = "";
    let public_id = "";
    if (req.file) {
      const filename = req.file.filename;
      fileUrl = path.join("uploads", filename);
      public_id = filename.split(".")[0];
    }
    // Prepare user data
    const user = {
      name,
      email,
      password,
      avatar: {
        public_id,
        url: fileUrl,
      },
      status: "pending",
    };
    // Create Activation Token for user
    const activationToken = createActivationJwtToken(user);

    // Create a unique activation URL with JWT
    const activationURL = `${process.env.ACTIVATION_FRONTEND_URL}/${activationToken}`;

    // Send the email to the user
    try {
      await sendMail({
        email: user.email,
        subject: "Mega Mart account activation",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationURL}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    // If there is an error, delete the file
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return next(new ErrorHandler(error.message, 400));
  }
};

//**Active user by email**
const activationUserByEmail = async (req, res, next) => {
  try {
    //get the token from the body
    const { activation_token } = req.body;

    if (!activation_token) {
      return next(new ErrorHandler("Activation token is missing", 400));
    }

    let newUser;

    //Verify the token
    try {
      newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(
          new ErrorHandler("Activation token expired. Try again", 400)
        ); // Handle token expiration
      }
      return next(new ErrorHandler("Invalid token. Try again", 400));
    }

    const { name, email, password, avatar } = newUser;

    // Check if the user is already registered with the email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.status === "active") {
        return next(new ErrorHandler("Your account is already activated", 400));
      } else {
        return next(
          new ErrorHandler(
            "Invalid token. Your profile has been activated",
            400
          )
        );
      }
    }

    // Create a new user with status "active"
    const user = await User.create({
      name,
      email,
      password,
      avatar,
      status: "active",
    });

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};
export { createUser, activationUserByEmail };
