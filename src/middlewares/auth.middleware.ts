import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AuthRequest } from "@/interfaces/auth";

export const authMiddleware = (
 req: AuthRequest,
 res: Response,
 next: NextFunction,
): void => {
 const authHeader = req.headers["authorization"];
 const token = authHeader?.split(" ")[1];

 if (!token) {
  res.status(401).json({ message: "Access denied. No token provided." });
  return;
 }

 try {
  const decoded = verifyAccessToken(token);
  req.user = decoded;
  next();
 } catch (err: unknown) {
  res
   .status(403)
   .json({ message: `Invalid or expired token with error ${err}` });
 }
};
