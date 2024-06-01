import { ErrorHandler } from "../utils/ErrorHandler.js";

export default handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    console.log(err);
    const message = `Resources not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    console.log(err);
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    console.log(err);
    const message = `Your url is invalid please try again letter`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    console.log(err);
    const message = `Your Url is expired please try again letter!`;
    err = new ErrorHandler(message, 400);
  }
  console.log(err);
  
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
