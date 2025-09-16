import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./db/connectToDB";
import cookieParser from "cookie-parser";
import { registerUser } from "./routes/register";
import { loginUser } from "./routes/login";
import { logoutUser } from "./routes/logout";
import { me } from "./routes/me";
import { refreshAccessToken } from "./routes/refreshAccessToken";
import { auth } from "./middleware/auth";
import { authData } from "./routes/authData";

// Környezeti változók betöltése
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// connect to MongoDB
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
app.post("/user/logout", logoutUser);
app.get("/user/me", me);
app.post("/user/refresh-token", refreshAccessToken);
app.get("/auth", auth, authData);

app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
