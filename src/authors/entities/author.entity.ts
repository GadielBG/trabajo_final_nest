import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('authors')
export class Author {
  @ApiProperty({ example: 1, description: 'ID único del autor' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Gabriel', description: 'Nombre del autor' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'García Márquez', description: 'Apellido del autor' })
  @Column()
  lastName: string;

  @ApiProperty({ 
    example: '1927-03-06', 
    description: 'Fecha de nacimiento del autor',
    required: false 
  })
  @Column({ nullable: true, type: 'date' })
  birthdate: Date;

  @ApiProperty({ 
    example: 'Colombia', 
    description: 'País de origen del autor',
    required: false 
  })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ 
    example: 'Escritor y periodista colombiano, ganador del Premio Nobel de Literatura en 1982.', 
    description: 'Biografía breve del autor',
    required: false 
  })
  @Column({ nullable: true, type: 'text' })
  biography: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  // Nueva columna para almacenar el ID del usuario que creó el autor
  @ApiProperty({ 
    example: 1, 
    description: 'ID del usuario que creó el registro' 
  })
  @Column({ name: 'user_id' })
  userId: number;

  // Relación con User (opcional si quieres cargar datos del usuario)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}