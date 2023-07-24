import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CommentService } from '../domain/comment.service';
import { Comment } from '../domain/comment.entity';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { Request } from 'express';

@ApiTags('comments')
@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':publicationId')
  @ApiOperation({ summary: 'Obtener todos los comentarios de una publicación' })
  @ApiParam({ name: 'publicationId', description: 'ID de la publicación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de comentarios',
  })
  async getAllCommentsByPublication(
    @Param('publicationId') publicationId: string,
  ): Promise<Comment[]> {
    return this.commentService.findAllCommentsByPublication(publicationId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'Comentario creado exitosamente',
  })
  async createComment(
    @Req() req: Request,
    @Body() comment: CreateCommentDto,
  ): Promise<void> {
    comment.userId = req.user['sub'];
    return this.commentService.createComment(comment);
  }

  @Put(':commentId')
  @ApiOperation({ summary: 'Actualizar un comentario existente' })
  @ApiParam({ name: 'commentId', description: 'ID del comentario' })
  @ApiResponse({
    status: 200,
    description: 'Comentario actualizado exitosamente',
    type: UpdateCommentDto,
  })
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() comment: Comment,
  ): Promise<Comment | null> {
    return this.commentService.updateComment(commentId, comment);
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Eliminar un comentario existente' })
  @ApiParam({ name: 'commentId', description: 'ID del comentario' })
  @ApiResponse({
    status: 200,
    description: 'Comentario eliminado exitosamente',
  })
  async deleteComment(@Param('commentId') commentId: string): Promise<void> {
    return this.commentService.deleteComment(commentId);
  }
}
