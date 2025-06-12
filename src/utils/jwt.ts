import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || "30d";

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

const isAuthUser = (decoded: any): decoded is AuthUser => {
  return (
    decoded &&
    typeof decoded === "object" &&
    typeof decoded.id === "number" &&
    typeof decoded.email === "string" &&
    typeof decoded.role === "string"
  );
};

export const generateAccessToken = (payload: AuthUser): string => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  const options: SignOptions = {
    expiresIn: JWT_EXPIRATION as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const generateRefreshToken = (payload: AuthUser): string => {
  if (!REFRESH_TOKEN_SECRET)
    throw new Error("REFRESH_TOKEN_SECRET is not defined");

  const options: SignOptions = {
    expiresIn: REFRESH_TOKEN_EXPIRATION as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
};

export const verifyAccessToken = (token: string): AuthUser => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw new Error("Invalid token format");
    }

    if (!isAuthUser(decoded)) {
      throw new Error("Invalid token payload structure");
    }

    return decoded;
  } catch (error: any) {
    if (error.message.includes("Invalid token")) {
      throw error;
    }
    throw new Error("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token: string): AuthUser => {
  if (!REFRESH_TOKEN_SECRET)
    throw new Error("REFRESH_TOKEN_SECRET is not defined");

  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

    if (typeof decoded === "string") {
      throw new Error("Invalid token format");
    }

    if (!isAuthUser(decoded)) {
      throw new Error("Invalid token payload structure");
    }

    return decoded;
  } catch (error: any) {
    if (error.message.includes("Invalid token")) {
      throw error;
    }
    throw new Error("Invalid or expired refresh token");
  }
};

export const decodeToken = (token: string): AuthUser => {
  try {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string") {
      throw new Error("Invalid token format");
    }

    if (!isAuthUser(decoded)) {
      throw new Error("Invalid token payload structure");
    }

    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
