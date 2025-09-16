import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN;

// --- ACCESS TOKEN ---
export function signAccessToken(userId: string) {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Hibás környezeti változó: ACCESS_TOKEN_SECRET");
  }
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

export function verifyAccessToken(token: string) {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Hibás környezeti változó: ACCESS_TOKEN_SECRET");
  }
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as { userId: string };
  } catch (err) {
    if (err) return null;
  }
}

// --- REFRESH TOKEN ---
export function signRefreshToken(userId: string) {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Hibás környezeti változó: REFRESH_TOKEN_SECRET");
  }
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

export function verifyRefreshToken(token: string) {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Hibás környezeti változó: REFRESH_TOKEN_SECRET");
  }
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
  } catch (err) {
    if (err) return null;
  }
}
