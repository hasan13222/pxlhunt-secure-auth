
import jwt from "jsonwebtoken";
import config from "../config";
import { Types } from "mongoose";

export type TJWTPayload = {id: Types.ObjectId, username: string, role: string};

export const generateAccessToken = (payload: TJWTPayload) => {
  return jwt.sign(payload, config.access_token_secret as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: TJWTPayload) => {
  return jwt.sign(payload, config.refresh_token_secret as string, {
    expiresIn: "30d", 
  });
};
