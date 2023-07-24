import { User } from './user.entity';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<void>;
  abstract updateUser(id: string, user: Partial<User>): Promise<User | null>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findAllUsers(): Promise<User[]>;
}
