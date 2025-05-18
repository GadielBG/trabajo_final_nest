import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    // Asegurar que el secretOrKey nunca sea undefined
    const jwtRefreshSecret = configService.get<string>('JWT_REFRESH_SECRET');
    
    if (!jwtRefreshSecret) {
      throw new Error('JWT_REFRESH_SECRET no está definido en las variables de entorno');
    }
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtRefreshSecret, // Ahora estamos seguros de que no es undefined
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Refresh token inválido');
    }
    
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
    
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token no proporcionado');
    }
    
    return {
      ...payload,
      refreshToken,
    };
  }
}