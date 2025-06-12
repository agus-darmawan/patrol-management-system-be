import type { Request, Response } from "express";
import { handleError } from "../utils/error.handler";
import { validationResult } from "express-validator";
import AuthService from "@/services/auth.service";
import { AuthRequest } from "@/interfaces/auth";

const authService = new AuthService();

export const registerController = async (
 req: Request,
 res: Response,
): Promise<void> => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   res.status(422).json({
    message: "Validation error",
    errors: errors.array(),
    success: false,
   });
   return;
  }
  const { name, email, password } = req.body;
  const result = await authService.registerUser({ name, email, password });

  res.status(200).json({
   message: "User registered successfully",
   data: result,
   success: true,
  });
 } catch (error: unknown) {
  handleError(error, res);
 }
};

export const loginController = async (
 req: Request,
 res: Response,
): Promise<void> => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   res.status(422).json({
    message: "Validation error",
    errors: errors.array(),
    success: false,
   });
   return;
  }
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await authService.loginUser(
   email,
   password,
  );
  res.status(200).json({
   message: "User logged in successfully",
   data: { accessToken, refreshToken, user },
   success: true,
  });
 } catch (error: unknown) {
  handleError(error, res);
 }
};

export const refreshController = async (
 req: Request,
 res: Response,
): Promise<void> => {
 try {
  const { refreshToken } = req.body;
  const { accessToken } = await authService.refreshAccessToken(refreshToken);
  res.status(200).json({
   message: "Access token refreshed successfully",
   data: { accessToken },
   success: true,
  });
 } catch (error: unknown) {
  handleError(error, res);
 }
};

export const logoutController = async (
 req: AuthRequest,
 res: Response,
): Promise<void> => {
 try {
  if (!req.user) {
   res.status(401).json({
    message: "User not authenticated",
    success: false,
   });
   return;
  }

  const userId = req.user.id;
  const result = await authService.logoutUser(userId);
  res.status(200).json({
   message: "User logged out successfully",
   data: result,
   success: true,
  });
 } catch (error: unknown) {
  handleError(error, res);
 }
};

export const userController = async (
 req: AuthRequest,
 res: Response,
): Promise<void> => {
 try {
  if (!req.user) {
   res.status(401).json({
    message: "User not authenticated",
    success: false,
   });
   return;
  }

  const userData = await authService.getUser(req.user.id);
  res.status(200).json({
   message: "User retrieved successfully",
   data: userData,
   success: true,
  });
 } catch (error: unknown) {
  handleError(error, res);
 }
};
