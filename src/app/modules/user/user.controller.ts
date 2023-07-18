import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await UserService.getSingleUser(email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

const getWishList = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await UserService.getWishList(email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist retrieved successfully!",
    data: result,
  });
});

const getMyList = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await UserService.getMyList(email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My list retrieved successfully!",
    data: result,
  });
});

const updateWishList = catchAsync(async (req: Request, res: Response) => {
  const { ...body } = req.body;
  const email = req.params.email;

  const result = await UserService.updateWishList(email, body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist updated successfully!",
    data: result,
  });
});

const updateMyList = catchAsync(async (req: Request, res: Response) => {
  const { ...body } = req.body;
  const email = req.params.email;

  const result = await UserService.updateMyList(email, body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My list updated successfully!",
    data: result,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { ...body } = req.body;
  const email = req.params.email;

  const result = await UserService.updateStatus(email, body?.id, body?.status);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My list updated successfully!",
    data: result,
  });
});

const deleteFromMyList = catchAsync(async (req: Request, res: Response) => {
  const { ...body } = req.body;
  const email = req.params.email;

  const result = await UserService.deleteFromMyList(email, body?.book);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My list updated successfully!",
    data: result,
  });
});

const deleteFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const { ...body } = req.body;
  const email = req.params.email;

  const result = await UserService.deleteFromWishlist(email, body?.book);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My list updated successfully!",
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  getWishList,
  getMyList,
  updateWishList,
  updateMyList,
  updateStatus,
  deleteFromMyList,
  deleteFromWishlist
};
