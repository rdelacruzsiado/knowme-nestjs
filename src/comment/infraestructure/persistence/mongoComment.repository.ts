import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from 'src/comment/domain/comment.entity';
import { CommentRepository } from 'src/comment/domain/comment.repository';
import { MailService } from 'src/mail/mail.service';
import { PublicationService } from 'src/publication/domain/publication.service';
import { UserService } from 'src/user/domain/user.service';

@Injectable()
export class MongoCommentRepository extends CommentRepository {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<Comment>,
    private mailService: MailService,
    private userService: UserService,
    private publicationService: PublicationService,
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
    const publication = await this.publicationService.findPublicationById(
      comment.publicationId,
    );
    const user = await this.userService.findUserById(publication.userId);
    await this.mailService.sendUserNotification(user);
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

  async createNestedComment(parentId: string, comment: Comment): Promise<void> {
    const parentComment = await this.findCommentById(parentId);

    if (!parentComment) {
      throw new NotFoundException('Parent comment not found');
    }
    comment.parentId = parentId;
    await this.createComment(comment);
  }
}
