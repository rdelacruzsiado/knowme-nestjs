import { PartialType } from '@nestjs/swagger';
import { CreatePublicationDto } from './createPublication.dto';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {}
