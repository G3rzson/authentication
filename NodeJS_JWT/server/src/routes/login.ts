import { Request, Response } from "express";
import dotenv from "dotenv";

import { loginFormSchema } from "../validation/loginUserForm";
dotenv.config();

export async function loginUser(req: Request, res: Response) {
  //console.log(req.body);

  // validálás
  const parsed = loginFormSchema.safeParse(req.body);
  //console.log(parsed);

  // validálás ellenőrzése
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  // user data
  const { username, password } = parsed.data;

  return res.json({ username, password });
}
