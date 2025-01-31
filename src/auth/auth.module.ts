import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // Importa JwtStrategy
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configurar la estrategia predeterminada
    JwtModule.register({
      secret: 'secretKey', // Clave secreta para firmar los tokens
      signOptions: { expiresIn: '1h' }, // Expiración del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Registra JwtStrategy como proveedor
  exports: [AuthService], // Exportar AuthService si es necesario en otros módulos
})
export class AuthModule {}