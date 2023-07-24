import { Publication } from './publication.entity';

export abstract class PublicationRepository {
  abstract findPublicationById(id: string): Promise<Publication | null>;
  abstract findAllPublicationsByUser(userId: string): Promise<Publication[]>;
  abstract createPublication(publication: Publication): Promise<void>;
  abstract updatePublication(
    publicationId: string,
    publication: Partial<Publication>,
  ): Promise<Publication | null>;
  abstract deletePublication(id: string): Promise<void>;
}
