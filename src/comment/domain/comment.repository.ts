import { Comment } from './comment.entity';

export abstract class CommentRepository {
  abstract findCommentById(id: string): Promise<Comment | null>;
  abstract findAllCommentsByPublication(
    publicationId: string,
  ): Promise<Comment[]>;
  abstract createComment(comment: Comment): Promise<void>;
  abstract updateComment(
    commentId: string,
    comment: Partial<Comment>,
  ): Promise<Comment | null>;
  abstract deleteComment(id: string): Promise<void>;
}
