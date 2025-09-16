import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../functions/token";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Hiányzó token" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Érvénytelen vagy lejárt token" });
  }

  req.userId = decoded.userId;
  next();
}
