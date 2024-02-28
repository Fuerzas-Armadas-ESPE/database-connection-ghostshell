import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument } from './comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private readonly commentModel: Model<CommentDocument>) {}

  async getAllComments(): Promise<CommentDocument[]> {
    return this.commentModel.find().exec();
  }

  async getCommentById(id: string): Promise<CommentDocument | null> {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async createComment(commentData: any): Promise<CommentDocument> {
    // Asignar "anónimo" si no se proporciona un usuario
    commentData.user = commentData.user || 'anónimo';

    const createdComment = new this.commentModel(commentData);
    return await createdComment.save();
  }

  async updateComment(id: string, commentData: any): Promise<CommentDocument | null> {
    const existingComment = await this.commentModel.findById(id).exec();
    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }
    await this.commentModel.findByIdAndUpdate(id, commentData).exec();
    return await this.commentModel.findById(id).exec();
  }

  async deleteComment(id: string): Promise<void> {
    const existingComment = await this.commentModel.findById(id).exec();
    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }
    await this.commentModel.findByIdAndDelete(id).exec();
  }

  async getCommentsForPost(postId: string): Promise<CommentDocument[]> {
    const comments = await this.commentModel.find({ postId }).exec();
    if (!comments) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }
}
