import dotenv from "dotenv";
import app from "./app.js";
import dbConnection from "./db/db.js";
dotenv.config();

const port = process.env.PORT || 8000;

// Handle uncaught exception
process.on("uncaughtException", (error) => {
  console.log(`Error : ${error.message}`);
  console.log(`Shutting down the server for uncaught exception`);
  process.exit(1);
});

//Connect Database
dbConnection();

// Create server
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// Handle unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Shutting down the server for :${error.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  // Close the server
  server.close(() => {
    process.exit(1);
  });
  
});
