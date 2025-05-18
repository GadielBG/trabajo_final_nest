import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, IsArray } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Pérez',
    description: 'Apellido del usuario',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    example: ['USER', 'ADMIN'],
    description: 'Roles del usuario',
  })
  @IsOptional()
  @IsArray()
  roles?: string[];
}