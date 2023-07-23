import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class MongoUserRepository extends UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super();
  }

  async createUser(user: User): Promise<void> {
    const hashPassword = await bcrypt.hash(user.password, 10);
    await this.userModel.create({ ...user, password: hashPassword });
  }

  async updateUser(user: User): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(user.id, user, {
        new: true,
      })
      .exec();
    return updatedUser;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
