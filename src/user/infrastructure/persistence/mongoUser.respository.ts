import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class MongoUserRepository extends UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super();
  }

  async createUser(user: User): Promise<void> {
    await this.userModel.create(user);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
