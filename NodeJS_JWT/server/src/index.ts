import express from "express";
import dotenv from "dotenv";
import { registerUser } from "./routes/register";
import { loginUser } from "./routes/login";
import cors from "cors";
import cookieParser from "cookie-parser";

// Környezeti változók betöltése
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// connect to MongoDB
import { connectToDB } from "./db/connectToDB";
connectToDB();

// middleware for json, cors, cookies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // vagy ahol a frontend fut
    credentials: true, // ha küldesz cookie-t / auth header-t
  })
);

// routes
app.post("/user/register", registerUser);
app.post("/user/login", loginUser);

app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
