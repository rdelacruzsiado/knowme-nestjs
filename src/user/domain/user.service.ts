import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async createUser(user: User): Promise<void> {
    return this.userRepository.createUser(user);
  }

  async updateUser(user: User): Promise<User | null> {
    return this.userRepository.updateUser(user);
  }
}
