import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RefreshToken {
  @ApiProperty({
    example: 1,
    description: 'ID único del token de refresco',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario al que pertenece el token',
  })
  @Column()
  userId: number;

  @ApiProperty({
    example: '$2b$10$X4FJvB2VHVMjr7G5dR.Pge8a1j9OMlX9.nT9aEPzRyh3IRRcmM.1.',
    description: 'Token de refresco encriptado',
  })
  @Column()
  token: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación del token',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización del token',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}