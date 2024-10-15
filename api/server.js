import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import pool from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

//express app
const app = express();

// Connect to PostGres
// connectDB();
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL");
  release(); // Release the client back to the pool
});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", userRouter);

// app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
