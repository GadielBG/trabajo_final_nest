import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}