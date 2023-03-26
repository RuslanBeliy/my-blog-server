import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: Array, default: [] },
    viewsCount: { type: Number, default: 0 },
    comments: [
      {
        text: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
        postId: { type: Schema.Types.ObjectId, required: true },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
      },
    ],
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model('post', schema);
