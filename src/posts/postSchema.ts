import mongoose, { Schema } from 'mongoose';
import { Post } from './postTypes';

const postSchema = new mongoose.Schema<Post>(
  {
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Post>('Post', postSchema);
