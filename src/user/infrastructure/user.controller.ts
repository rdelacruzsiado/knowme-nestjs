import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../domain/user.service';
import { User } from '../domain/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post()
  async createUser(@Body() user: User): Promise<void> {
    return this.userService.createUser(user);
  }
}
