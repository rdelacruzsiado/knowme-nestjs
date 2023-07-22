import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserController } from './user.controller';
import { UserService } from '../domain/user.service';
import { MongoUserRepository } from './persistence/mongoUser.respository';
import { UserSchema } from './persistence/mongoUser.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: MongoUserRepository },
  ],
})
export class UserModule {}
