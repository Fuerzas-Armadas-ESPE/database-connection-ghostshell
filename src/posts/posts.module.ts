// posts/posts.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema } from './post.model';
import { CommentSchema } from '../comments/comment.schema'; // Importa el esquema de comentarios
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema }, // Agrega el esquema de comentarios
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, CommentsService],
})
export class PostsModule {}
