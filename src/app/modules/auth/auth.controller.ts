import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import config from "../../../config";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";

const userSignUp = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await AuthService.userSignUp(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signed up successfully!",
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const { refreshToken, ...others } = await AuthService.userLogin(loginData);

  //set refresh token into cookie
  const cookieOptions = { secure: config.env === "production", httpOnly: true };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signed up successfully!",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  //set refresh token into cookie
  const cookieOptions = { secure: config.env === "production", httpOnly: true };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signed up successfully!",
    data: result,
  });
});

export const AuthController = {
  userSignUp,
  userLogin,
  refreshToken,
};
