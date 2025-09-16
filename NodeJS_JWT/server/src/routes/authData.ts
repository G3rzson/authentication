import { Request, Response } from "express";

export async function authData(req: Request, res: Response) {
  const secret = "Access Token használva!";
  return res.status(201).json({
    message: secret,
  });
}
