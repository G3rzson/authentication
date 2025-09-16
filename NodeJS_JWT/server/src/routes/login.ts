import { Request, Response } from "express";
import dotenv from "dotenv";
import { loginFormSchema } from "../validation/loginUserForm";
import RegisterUserModel from "../db/registerUserSchema";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "../functions/token";
dotenv.config();

export async function loginUser(req: Request, res: Response) {
  //console.log(req.body);

  // validálás
  const parsed = loginFormSchema.safeParse(req.body);
  //console.log(parsed);
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten().fieldErrors ?? "Érvénytelen adatok!",
    });
  }

  // user data
  const { username, password } = parsed.data;

  try {
    // felhasználó ellenőrzése
    const existingUser = await RegisterUserModel.findOne({ username });
    //console.log(existingUser);
    if (!existingUser) {
      return res.status(400).json({
        error: "Nincs ilyen felhasználó!",
      });
    }

    // jelszó ellenőrzése
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    //console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Hibás jelszó!",
      });
    }

    // token generálás
    const accessToken = signAccessToken(existingUser._id.toString());
    //console.log(accessToken);
    const refreshToken = signRefreshToken(existingUser._id.toString());
    //console.log(refreshToken);

    // válasz küldése cookie beállítása
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 nap
      })
      .json({
        message: "Sikeres bejelentkezés!",
        accessToken,
        user: {
          username: existingUser.username,
        },
      });
  } catch (error) {
    return res.status(500).json({
      error: "Valami hiba történt. Próbáld újra később!",
    });
  }
}
