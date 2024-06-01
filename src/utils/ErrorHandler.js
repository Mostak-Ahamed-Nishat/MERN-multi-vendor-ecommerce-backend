class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace for debugging purposes
    // This ensures the stack trace starts from the point where this error was instantiated
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
