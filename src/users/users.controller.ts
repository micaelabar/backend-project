import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard('jwt')) // Protege esta ruta con JWT
  @Get('profile')
  getProfile() {
    return { message: 'This is a protected route' };
  }
}