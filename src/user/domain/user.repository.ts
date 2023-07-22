import { User } from './user.entity';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<void>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract findAllUsers(): Promise<User[]>;
}
