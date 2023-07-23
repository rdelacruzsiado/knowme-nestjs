import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationService } from '../domain/publication.service';
import { PublicationController } from './publication.controller';
import { PublicationSchema } from './persistence/mongoPublication.schema';
import { PublicationRepository } from '../domain/publication.repository';
import { MongoPublicationRepository } from './persistence/mongoPublication.respository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publication', schema: PublicationSchema },
    ]),
  ],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    { provide: PublicationRepository, useClass: MongoPublicationRepository },
  ],
})
export class PublicationModule {}
