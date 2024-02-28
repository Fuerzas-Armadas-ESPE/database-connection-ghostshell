// comment.model.ts

import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
  content: { type: String, required: true },
  user: { type: String, required: true },  // Agrega el campo de usuario para identificar al autor del comentario
  createdAt: { type: Date, default: Date.now },
});

