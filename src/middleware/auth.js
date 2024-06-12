import { ErrorHandler } from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to continue"));
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedToken.id);
  next();
});

export default isAuthenticated;
