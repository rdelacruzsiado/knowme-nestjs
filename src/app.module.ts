import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/knowme_db'),
    UserModule,
  ],
})
export class AppModule {}
