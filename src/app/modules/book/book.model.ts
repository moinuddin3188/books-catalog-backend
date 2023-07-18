import { Schema, Types, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
