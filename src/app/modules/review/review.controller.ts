import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReviewService } from "./review.service";
import sendResponse from "../../../shared/sendResponse";
import { IReview } from "./review.interface";
import httpStatus from "http-status";

const postReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...review } = req.body;

  const result = await ReviewService.postReview(id, review);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review posted successfully!",
    data: result,
  });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ReviewService.getReview(id);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully!",
    data: result,
  });
});

export const ReviewController = {
  postReview,
  getReview,
};
