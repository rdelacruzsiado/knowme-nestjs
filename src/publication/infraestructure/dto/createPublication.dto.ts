import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  createDate: Date;

  @ApiProperty()
  userId: string;
}
