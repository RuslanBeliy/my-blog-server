import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model('user', schema);
