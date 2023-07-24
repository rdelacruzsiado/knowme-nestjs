import { Injectable } from '@nestjs/common';
import { Publication } from './publication.entity';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from '../infraestructure/dto/createPublication.dto';
import { UpdatePublicationDto } from '../infraestructure/dto/updatePublication.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async findAllPublicationsByUser(userId: string): Promise<Publication[]> {
    return this.publicationRepository.findAllPublicationsByUser(userId);
  }

  async createPublication(publication: CreatePublicationDto): Promise<void> {
    return this.publicationRepository.createPublication(publication);
  }

  async updatePublication(
    publicationId: string,
    publication: UpdatePublicationDto,
  ): Promise<Publication | null> {
    return this.publicationRepository.updatePublication(
      publicationId,
      publication,
    );
  }

  async deletePublication(publicationId: string): Promise<void> {
    return this.publicationRepository.deletePublication(publicationId);
  }
}
