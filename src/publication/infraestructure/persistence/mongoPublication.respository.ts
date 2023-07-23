import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication } from 'src/publication/domain/publication.entity';
import { PublicationRepository } from 'src/publication/domain/publication.repository';

@Injectable()
export class MongoPublicationRepository extends PublicationRepository {
  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
  ) {
    super();
  }

  async findPublicationById(id: string): Promise<Publication> {
    return await this.publicationModel.findById(id);
  }

  async findAllPublicationsByUser(userId: string): Promise<Publication[]> {
    return await this.publicationModel.find({ userId }).exec();
  }

  async createPublication(publication: Publication): Promise<void> {
    await this.publicationModel.create(publication);
  }

  async updatePublication(
    publicationId: string,
    publication: Publication,
  ): Promise<Publication | null> {
    const updatedPublication = await this.publicationModel
      .findByIdAndUpdate(publicationId, publication, {
        new: true,
      })
      .exec();
    return updatedPublication;
  }

  async deletePublication(id: string): Promise<void> {
    await this.publicationModel.deleteOne({ _id: id });
  }
}
