import { Request, Response } from "express";

export async function logoutUser(req: Request, res: Response) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ message: "Sikeres kijelentkezés" });
  } catch (error) {
    return res.status(500).json({ error: "Nem sikerült kijelentkezni" });
  }
}
