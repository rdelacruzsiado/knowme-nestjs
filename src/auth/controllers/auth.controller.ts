import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { User } from 'src/user/domain/user.entity';
import { UserService } from 'src/user/domain/user.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/infrastructure/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const token = this.authService.generateJWT(user);
    res.cookie('token', token.accessToken);

    res.json({ success: true });
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: User): Promise<void> {
    return this.userService.createUser(user);
  }
}
