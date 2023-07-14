import { ObjectId } from "mongoose";
import { IUser } from "../user/user.interface";

export type IReviewData = {
  user: ObjectId | Partial<IUser>;
  review: string;
};

export type IReview = {
  bookId: string;
  reviews: IReviewData[];
};
