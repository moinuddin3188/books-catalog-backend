import mongoose, { Schema, Types, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { userRole } from "./user.constants";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
    avatar: {
      type: String,
    },
    wishList: [
      {
        type: Types.ObjectId,
        ref: "Book",
        default: [],
      },
    ],
    myList: [
      {
        book: {
          type: Types.ObjectId,
          ref: "Book",
        },
        status: {
          type: String,
          enum: ["reading", "will read", "finished reading"],
          default: "will read"
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, "email" | "password" | "role"> | null> {
  return await User.findOne(
    { email: email },
    { password: 1, role: 1, email: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
  const user = this;

  //hashing password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "Not accessible";

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
