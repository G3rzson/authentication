import { Request, Response } from "express";
import RegisterUserModel from "../db/registerUserSchema";
import bcrypt from "bcryptjs";
import { registerFormSchema } from "../validation/registerUserForm";

export async function registerUser(req: Request, res: Response) {
  //console.log(req.body);

  // validálás
  const parsed = registerFormSchema.safeParse(req.body);
  //console.log(parsed);

  // validálás ellenőrzése
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten().fieldErrors ?? "Érvénytelen adatok!",
    });
  }

  // user data
  const { username, email, password } = parsed.data;

  try {
    // felhasználó ellenőrzése
    const existingUser = await RegisterUserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Ez a felhasználónév vagy email már foglalt!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);

    await RegisterUserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Sikeres regisztráció!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Valami hiba történt. Próbáld újra később!",
    });
  }
}
