import mongoose, { Model, ObjectId } from "mongoose";
import { IBook } from "../book/book.interface";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type UserRole = "user" | "admin";

type IList = {
  book: ObjectId | IBook
  status: "reading" | "will read" | "finished reading"
}

export type IUser = {
  name: UserName;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  wishList?: ObjectId[] | IBook
  myList?: IList[]
};

export type UserModel = {
  isUserExist(email: string): Promise<
    | (Pick<IUser,"email"| "password" | "role">)
    | null
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;