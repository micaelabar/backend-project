import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para iniciar sesión
   * @param body - Contiene email y password
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // Validar usuario con el servicio
    const user = await this.authService.validateUser(body.email, body.password);

    // Si no se encuentra el usuario o las credenciales son inválidas
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Retorna un token JWT al cliente
    return this.authService.login(user);
  }

  /**
   * Endpoint para registrar un nuevo usuario
   * @param body - Contiene name, email, password y username
   */
  @Post('register')
  async register(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      username: string;
    },
  ) {
    // Llama al servicio para registrar un nuevo usuario
    const newUser = await this.authService.createUser(
      body.name,
      body.email,
      body.password,
      body.username,
    );

    return {
      message: 'User registered successfully',
      user: newUser,
    };
  }
}
