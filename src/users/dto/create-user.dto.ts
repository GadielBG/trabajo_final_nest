import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: ['USER'],
    description: 'Roles del usuario (por defecto ["USER"])',
    default: ['USER'],
  })
  @IsOptional()
  @IsArray()
  roles?: string[];
}