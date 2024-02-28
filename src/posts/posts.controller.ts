// posts/posts.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';
import { RequestLogDocument } from '../modules/request-log/request-log.shema';
import { CommentDocument } from '../comments/comment.schema';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  async getAllPosts(): Promise<RequestLogDocument[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<RequestLogDocument> {
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() postData: any): Promise<any> {
    return this.postsService.createPost(postData);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() postData: any): Promise<any> {
    return this.postsService.updatePost(id, postData);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @Get(':id/comments')
  async getCommentsForPost(@Param('id') id: string): Promise<CommentDocument[]> {
    return this.commentsService.getCommentsForPost(id);
  }

  @Post(':id/comments')
  async addCommentToPost(@Param('id') id: string, @Body() commentData: any): Promise<any> {
    const post = await this.postsService.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const createdComment = await this.commentsService.createComment(commentData);
    post.comments.push(createdComment);
    await post.save();
    return post;
  }

  @Put(':postId/comments/:commentId')
  async updateComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() commentData: any,
  ): Promise<CommentDocument | null> {
    try {
      return this.commentsService.updateComment(commentId, commentData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Comment not found');
      }
      throw error;
    }
  }

  @Delete(':postId/comments/:commentId')
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    try {
      await this.commentsService.deleteComment(commentId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Comment not found');
      }
      throw error;
    }
  }
}
