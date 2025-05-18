import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 1, description: 'ID único de la categoría' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ciencia ficción', description: 'Nombre de la categoría' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ 
    example: 'Libros que exploran ideas futuristas basadas en avances científicos y tecnológicos', 
    description: 'Descripción de la categoría',
    required: false 
  })
  @Column({ nullable: true, type: 'text' })
  description: string;

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

  // Relación con Book (una categoría puede tener muchos libros)
  @OneToMany(() => Book, book => book.category)
  books: Book[];
}