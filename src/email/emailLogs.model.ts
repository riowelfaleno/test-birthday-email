import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { SendEmailStatus } from "./email.type";

export interface IEmailLogsLean {
  email: string;
  status: SendEmailStatus;
  errorMessage?: string;
  isResolved: boolean;
  createdAt?: Date;
}

export type IEmailLogs = IEmailLogsLean & Document;

const EmailLogsSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    email: { type: String },
    status: { type: String, enum: Object.values(SendEmailStatus) },
    errorMessage: { type: String },
    isResolved: { type: Boolean },
  },
  { timestamps: true }
);

interface EmailLogsInterface extends mongoose.Model<IEmailLogs> {}

export default mongoose.model<IEmailLogs, EmailLogsInterface>(
  "EmailLogs",
  EmailLogsSchema
);
