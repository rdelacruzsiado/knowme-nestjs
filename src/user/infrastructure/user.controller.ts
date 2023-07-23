import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from '../domain/user.service';
import { User } from '../domain/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: User): Promise<void> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') userId: string,
    @Body() user: User,
  ): Promise<User | null> {
    return this.userService.updateUser({ ...user, id: userId });
  }
}
