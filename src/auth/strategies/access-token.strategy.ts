import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    // Asegurar que el secretOrKey nunca sea undefined
    const jwtSecret = configService.get<string>('JWT_ACCESS_SECRET');
    
    if (!jwtSecret) {
      throw new Error('JWT_ACCESS_SECRET no está definido en las variables de entorno');
    }
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret, // Ahora estamos seguros de que no es undefined
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }
    
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}