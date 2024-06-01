import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => res.send("Hello World! It's working."));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "",
  });
}

export default app;
