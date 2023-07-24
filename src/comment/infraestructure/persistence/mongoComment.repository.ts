import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/comment/domain/comment.entity';
import { CommentRepository } from 'src/comment/domain/comment.repository';

@Injectable()
export class MongoCommentRepository extends CommentRepository {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<Comment>,
  ) {
    super();
  }

  async findCommentById(id: string): Promise<Comment> {
    return await this.commentModel.findById(id);
  }

  async findAllCommentsByPublication(
    publicationId: string,
  ): Promise<Comment[]> {
    return await this.commentModel.find({ publicationId }).exec();
  }

  async createComment(comment: Comment): Promise<void> {
    await this.commentModel.create(comment);
  }

  async updateComment(
    commentId: string,
    comment: Comment,
  ): Promise<Comment | null> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(commentId, comment, {
        new: true,
      })
      .exec();
    return updatedComment;
  }

  async deleteComment(id: string): Promise<void> {
    await this.commentModel.deleteOne({ _id: id });
  }
}
