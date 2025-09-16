import { Request, Response } from "express";
import { verifyRefreshToken, signAccessToken } from "../functions/token";
import RegisterUserModel from "../db/registerUserSchema";

export async function refreshAccessToken(req: Request, res: Response) {
  try {
    // A refresh token a httpOnly cookie-ban van
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Nincs refresh token" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Érvénytelen vagy lejárt refresh token" });
    }

    // Ellenőrizd, hogy a user létezik-e
    const user = await RegisterUserModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "Felhasználó nem található" });
    }

    // Új access token kiadása
    const newAccessToken = signAccessToken(user._id.toString());

    return res.json({
      accessToken: newAccessToken,
      user: { username: user.username },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Hiba történt a token frissítésekor" });
  }
}
