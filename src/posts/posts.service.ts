import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<any>) {}

  async getAllPosts(): Promise<any[]> {
    return await this.postModel.find().exec();
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
}