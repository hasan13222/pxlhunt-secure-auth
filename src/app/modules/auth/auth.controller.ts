import { AuthServices } from "./auth.services";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken, TJWTPayload } from "../../utils/generateToken";
import { User } from "./auth.model";
import bcrypt from "bcrypt"
import AppError from "../../errors/AppError";

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  const data = Object.assign(result);
  delete data.password;

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "User registered successfully",
    data: data,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) throw new AppError(StatusCodes.BAD_REQUEST, "User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Password");

  const jwtpayload: TJWTPayload = {id: user?._id, username: user?.username, role: user?.role}
  // Generate tokens
  const accessToken = generateAccessToken(jwtpayload);
  const refreshToken = generateRefreshToken(jwtpayload);

  // Store refresh token in a secure HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "User Logged In successfully",
    data: {...req.user, token: accessToken},
  });
});

const getUserDetails = catchAsync(async (req: Request, res: Response) => {
  
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "User Logged In successfully",
    data: req.user,
  });
});

const refreshToken = () => (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const decoded = jwt.verify(
    refreshToken as string,
    config.refresh_token_secret as string
  ) as JwtPayload;

  if (!decoded) {
    sendResponse(res, {
      status: StatusCodes.FORBIDDEN,
      message: "Accress token has been sent successfully",
      data: null,
    });
  }
  const { username, id, role } = decoded as JwtPayload;
  
  const token = generateAccessToken({username, id, role});  

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Acceess token has been sent successfully",
    data: { token },
  });
};

export const AuthControllers = {
  signup,
  login,
  refreshToken,
  getUserDetails
};
