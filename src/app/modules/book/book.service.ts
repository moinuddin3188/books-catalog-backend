import httpStatus from "http-status";
import ApiError from "../../../errors/handleApiError";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import { bookSearchableFields } from "./book.constants";
import mongoose, { SortOrder } from "mongoose";
import { generateBookId, getBookImageUrl } from "./book.utils";
import { Review } from "../review/review.model";

const addBook = async (payload: IBook): Promise<IBook> => {
  if (!payload.imageUrl) {
    payload.imageUrl = getBookImageUrl();
  }

  let newBookAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const bookId = await generateBookId(payload.publicationYear);

    payload.id = bookId;

    const newBook = await Book.create([payload], { session: session });

    if (!newBook.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create book!");
    }

    newBookAllData = newBook[0];

    const reviewData = { bookId: newBookAllData.id, reviews: [] };

    const reviews = await Review.create([reviewData], { session: session });

    if (!reviews.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create review!");
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }

  return newBookAllData;
};

const getAllBook = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, sortBy, sortOrder, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $in: value },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const allCows = await Book.find(whereConditions).sort(sortConditions);

  return allCows;
};

const getSingleBook = async (payload: string): Promise<IBook | null> => {
  const book = await Book.findOne({id: payload});

  return book;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({id});

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book doesn't exist");
  }

  const updatedBook = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedBook;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  // const isAuthorized = await Book.findOne({_id: id, seller: userId})

  // if(!isAuthorized){
  //   throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to delete this cow!")
  // }

  const deletedBook = await Book.findOneAndDelete({id});

  return deletedBook;
};

export const BookService = {
  addBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
