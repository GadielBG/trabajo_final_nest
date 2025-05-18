import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty({
    example: 1,
    description: 'ID del usuario (subject)',
  })
  sub: number;

  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Correo electrónico del usuario',
  })
  email: string;

  @ApiProperty({
    example: ['USER'],
    description: 'Roles del usuario',
  })
  roles: string[];
}