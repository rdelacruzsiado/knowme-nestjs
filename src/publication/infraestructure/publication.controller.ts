import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { PublicationService } from '../domain/publication.service';
import { Publication } from '../domain/publication.entity';
import { CreatePublicationDto } from './dto/createPublication.dto';
import { UpdatePublicationDto } from './dto/updatePublication.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Publicaciones')
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Obtener todas las publicaciones de un usuario' })
  @ApiParam({
    name: 'userId',
    description: 'ID del usuario para obtener sus publicaciones',
  })
  async findAllPublicationsByUser(
    @Param('userId') userId: string,
  ): Promise<Publication[]> {
    return this.publicationService.findAllPublicationsByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiBody({ type: CreatePublicationDto })
  async createPublication(
    @Body() publication: CreatePublicationDto,
  ): Promise<void> {
    return this.publicationService.createPublication(publication);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una publicación' })
  @ApiParam({ name: 'id', description: 'ID de la publicación a actualizar' })
  @ApiBody({ type: UpdatePublicationDto })
  async updatePublication(
    @Param('id') id: string,
    @Body() publication: UpdatePublicationDto,
  ): Promise<Publication | null> {
    return this.publicationService.updatePublication(id, publication);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una publicación' })
  @ApiParam({ name: 'id', description: 'ID de la publicación a eliminar' })
  async deletePublication(@Param('id') id: string): Promise<void> {
    return this.publicationService.deletePublication(id);
  }
}
