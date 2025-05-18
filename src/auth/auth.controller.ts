import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UseGuards,
  Get
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Tokens } from './interfaces/tokens.interface';
import { Public } from './decorators/public.decorator';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registro de usuario nuevo' })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario registrado y tokens generados correctamente',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de registro inválidos' })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  async register(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ 
    status: 200, 
    description: 'Inicio de sesión exitoso',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.login(authDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Refrescar tokens' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tokens refrescados correctamente',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getProfile(@GetCurrentUser() user) {
    return user;
  }
}