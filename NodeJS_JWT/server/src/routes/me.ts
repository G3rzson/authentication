import { Request, Response } from "express";
import RegisterUserModel from "../db/registerUserSchema";
import { verifyAccessToken, verifyRefreshToken } from "../functions/token";

export async function me(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Hiányzó access token" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  //console.log(decoded);
  if (!decoded) {
    return res.status(401).json({ error: "Érvénytelen refresh token!" });
  }

  const userId = decoded.userId;

  try {
    // user ellenőrzés
    const existingUser = await RegisterUserModel.findById(userId);

    if (!existingUser) {
      return res.status(403).json({ error: "Nincs ilyen felhasználó!" });
    }

    // sikeres eset
    return res.json({ user: { username: existingUser.username } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Szerver hiba." });
  }
}
