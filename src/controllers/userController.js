import User from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const userData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
