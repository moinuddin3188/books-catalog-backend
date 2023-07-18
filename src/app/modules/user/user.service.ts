import httpStatus from "http-status";
import ApiError from "../../../errors/handleApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const getSingleUser = async (payload: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: payload });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't Exist!");
  }

  return user;
};

const getWishList = async (payload: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: payload }).populate("wishList");

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't Exist!");
  }

  return user;
};

const getMyList = async (payload: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: payload }).populate("myList.book");

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't Exist!");
  }

  return user;
};

const updateWishList = async (
  email: string,
  payload: { book: string }
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { email },
    {
      $addToSet: { wishList: payload.book },
    },
    { new: true }
  );

  return user;
};

const updateMyList = async (
  email: string,
  payload: { book: string; status: string }
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { email, "myList.book": { $ne: payload.book }  },
    {
      $addToSet: {
        myList: {
          $each: [payload],
        },
      },
    },
    { new: true }
  ).populate("myList");

  return user;
};

const updateStatus = async (
  email: string,
  id: string,
  status: string
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { email, "myList._id": id },
    { $set: { "myList.$.status": status } },
    { new: true }
  );

  return user;
};

const deleteFromMyList = async (
  email: string,
  bookId: string
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { email },
    {
      $pull: { myList: { book: bookId } },
    },
    { new: true }
  ).populate("myList");

  return user;
};

const deleteFromWishlist = async (
  email: string,
  bookId: string
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { email },
    {
      $pull: { wishList: { $in: [bookId] } },
    },
    { new: true }
  ).populate("myList");

  return user;
};

export const UserService = {
  getSingleUser,
  getWishList,
  getMyList,
  updateWishList,
  updateMyList,
  updateStatus,
  deleteFromMyList,
  deleteFromWishlist
};
