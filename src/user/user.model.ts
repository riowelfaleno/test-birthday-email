import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUserLean {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  isDeleted?: boolean;
}

export type IUser = IUserLean & Document;

const UserSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    dob: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

interface UserInterface extends mongoose.Model<IUser> {}

export default mongoose.model<IUser, UserInterface>("User", UserSchema);
