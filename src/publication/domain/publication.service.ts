import { Injectable } from '@nestjs/common';
import { Publication } from './publication.entity';
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async findPublicationById(
    publicationId: string,
  ): Promise<Publication | null> {
    return this.publicationRepository.findPublicationById(publicationId);
  }

  async findAllPublicationsByUser(userId: string): Promise<Publication[]> {
    return this.publicationRepository.findAllPublicationsByUser(userId);
  }

  async createPublication(publication: Publication): Promise<void> {
    return this.publicationRepository.createPublication(publication);
  }

  async updatePublication(
    publicationId: string,
    publication: Partial<Publication>,
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
