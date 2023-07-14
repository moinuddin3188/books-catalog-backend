import httpStatus from "http-status";
import ApiError from "../../../errors/handleApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const userSignUp = async (payload: IUser): Promise<IUser> => {
  payload.role = "user";

  const user = await User.create(payload);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to sign up!");
  }

  return user;
};

const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email: userEmail, password } = payload;

  const isUserExist = await User.isUserExist(userEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Password or phone number is not correct"
    );
  }

  // create access token and refresh token
  const { email, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    {
      email,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      email,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Token is invalid");
  }

  const { email } = verifiedToken;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  userSignUp,
  userLogin,
  refreshToken,
};
