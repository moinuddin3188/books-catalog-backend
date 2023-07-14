import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/handleApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      let verifiedUser = null;

      try {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret
        );
      } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Token is not valid");
      }

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "You are forbidden from accessing this resource."
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
