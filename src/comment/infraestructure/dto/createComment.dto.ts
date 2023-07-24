import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  createDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  publicationId: string;

  userId: string;
}
