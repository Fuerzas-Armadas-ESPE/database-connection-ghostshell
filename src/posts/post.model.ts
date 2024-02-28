// posts/post.model.ts

import { Schema } from 'mongoose';
import { CommentSchema } from '../comments/comment.schema';

export const PostSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [CommentSchema],
});
