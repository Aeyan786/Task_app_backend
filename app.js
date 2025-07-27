import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Database/Database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
dotenv.config({});

const app = express();

const PORT = process.env.PORT;

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// APIs

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
