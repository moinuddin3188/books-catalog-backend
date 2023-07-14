import mongoose, { Model } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type UserRole = "user" | "admin";

export type IUser = {
  name: UserName;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
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