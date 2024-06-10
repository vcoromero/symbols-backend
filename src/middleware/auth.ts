import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../jwt/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = verifyToken(token) as { userId: number };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
