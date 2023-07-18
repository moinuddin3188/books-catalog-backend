import { Schema, Types, model } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    bookId: {
      type: String,
      required: true,
      unique: true,
    },
    reviews: {
      type: [
        {
          user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
          },
          review: {
            type: String,
            required: true,
          },
          postedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model<IReview>("Review", reviewSchema);
