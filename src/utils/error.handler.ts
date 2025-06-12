import { Response } from "express";
import { BaseError } from "../middlewares/error.middleware";

export const handleError = (error: unknown, res: Response) => {
 const statusCode = error instanceof BaseError ? error.statusCode : 500;
 const errerror = error as Error;
 res.status(statusCode).json({
  message: errerror.message || "An unexpected error occurred",
  status: statusCode,
  success: false,
 });
};
