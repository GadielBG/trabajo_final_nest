import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Tokens } from './interfaces/tokens.interface';
import { RefreshToken } from './entities/refresh-token.entity';
import { TokenType } from './enums/token-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async login(authDto: AuthDto): Promise<Tokens> {
    const { email, password } = authDto;
    
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    
    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.refreshTokenRepo.delete({ userId });
    return true;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenData = await this.refreshTokenRepo.findOne({
      where: { userId },
    });

    if (!refreshTokenData) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await bcrypt.compare(rt, refreshTokenData.token);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    
    const existingToken = await this.refreshTokenRepo.findOne({
      where: { userId },
    });

    if (existingToken) {
      await this.refreshTokenRepo.update(
        { userId },
        { token: hashedRefreshToken }
      );
    } else {
      const newRefreshToken = this.refreshTokenRepo.create({
        userId,
        token: hashedRefreshToken,
      });
      await this.refreshTokenRepo.save(newRefreshToken);
    }
  }

  async getTokens(userId: number, email: string, roles: string[]): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: userId,
      email,
      roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}