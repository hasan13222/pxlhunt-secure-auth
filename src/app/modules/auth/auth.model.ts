import { Schema, model } from 'mongoose';
import { TUser } from './auth.interface';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"]
    }
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
