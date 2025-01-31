import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del encabezado Authorization
      ignoreExpiration: false, // No ignorar la expiración del token
      secretOrKey: 'secretKey', // La clave secreta para verificar el token
    });
  }

  async validate(payload: any) {
    // Devuelve la información del usuario desde el payload del token
    return { userId: payload.sub, email: payload.email };
  }
}