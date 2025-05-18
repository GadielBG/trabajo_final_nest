import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: 1,
    description: 'ID único del usuario',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'juan_perez',
    description: 'Nombre de usuario generado a partir del email',
  })
  @Column()
  username: string;

  @ApiProperty({
    example: '$2b$10$X4FJvB2VHVMjr7G5dR.Pge8a1j9OMlX9.nT9aEPzRyh3IRRcmM.1.',
    description: 'Contraseña encriptada del usuario',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: true,
    description: 'Estado del usuario (activo/inactivo)',
    default: true,
  })
  @Column({ 
    default: true 
  })
  isActive: boolean;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización del registro',
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ApiProperty({
    example: ['USER'],
    description: 'Roles asignados al usuario',
    default: ['USER'],
  })
  @Column('text', { array: true, default: ['USER'] })
  roles: string[];
}