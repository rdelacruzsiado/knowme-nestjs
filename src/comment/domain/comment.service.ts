import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async findAllCommentsByPublication(
    publicationId: string,
  ): Promise<Comment[]> {
    return this.commentRepository.findAllCommentsByPublication(publicationId);
  }

  async createComment(comment: Comment): Promise<void> {
    return this.commentRepository.createComment(comment);
  }

  async updateComment(
    commentId: string,
    comment: Comment,
  ): Promise<Comment | null> {
    return this.commentRepository.updateComment(commentId, comment);
  }

  async deleteComment(commentId: string): Promise<void> {
    return this.commentRepository.deleteComment(commentId);
  }
}
