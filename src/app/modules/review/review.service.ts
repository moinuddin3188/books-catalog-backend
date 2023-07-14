import { IReview, IReviewData } from "./review.interface";
import { Review } from "./review.model";

const postReview = async (
  bookId: string,
  payload: IReviewData
): Promise<IReview | null> => {
  const reviews = await Review.findOneAndUpdate(
    { bookId },
    { $push: { reviews: payload } },
    { new: true }
  );

  return reviews;
};

const getReview = async (bookId: string): Promise<IReview | null> => {
  const reviews = await Review.findOne({ bookId }).populate({
    path: "reviews.user",
    select: "email avatar name",
  });

  return reviews;
};

export const ReviewService = {
  postReview,
  getReview,
};
