// posts/posts.service.ts

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument } from '../comments/comment.schema'; // Asegúrate de tener la ruta correcta para CommentDocument

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<any>,
    @InjectModel('Comment') private readonly commentModel: Model<CommentDocument>, // Asegúrate de tener el modelo de comentario
  ) {}

  async getAllPosts(): Promise<any[]> {
    return this.postModel.find().exec();
  }

  async getPostById(id: string): Promise<any | null> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async createPost(postData: any): Promise<any> {
    try {
      const createdPost = new this.postModel(postData);
      return await createdPost.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updatePost(id: string, postData: any): Promise<any | null> {
    const existingPost = await this.postModel.findById(id).exec();
    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }
    try {
      await this.postModel.findByIdAndUpdate(id, postData).exec();
      return await this.postModel.findById(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deletePost(id: string): Promise<void> {
    const existingPost = await this.postModel.findById(id).exec();
    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }
    try {
      await this.postModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getCommentsForPost(postId: string): Promise<CommentDocument[]> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post.comments;
  }

  async addCommentToPost(postId: string, commentData: any): Promise<CommentDocument> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    try {
      const createdComment = new this.commentModel(commentData);
      post.comments.push(createdComment);
      await post.save();
      return createdComment;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
