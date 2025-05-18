import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('books')
export class Book {
  @ApiProperty({ example: 1, description: 'ID único del libro' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Cien años de soledad', description: 'Título del libro' })
  @Column()
  title: string;

  @ApiProperty({ 
    example: 1967, 
    description: 'Año de publicación',
    required: false 
  })
  @Column({ nullable: true })
  year: number;

  @ApiProperty({ 
    example: 'Una de las obras más importantes de la literatura latinoamericana.', 
    description: 'Descripción del libro',
    required: false 
  })
  @Column({ nullable: true, type: 'text' })
  description: string;

  @ApiProperty({ example: 1, description: 'ID del autor del libro' })
  @Column({ name: 'author_id' })
  authorId: number;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  // Nueva columna para la categoría
  @ApiPropertyOptional({ example: 1, description: 'ID de la categoría del libro' })
  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, category => category.books)
  @JoinColumn({ name: 'category_id' })
  category: Category;

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

  @ApiProperty({ 
    example: 1, 
    description: 'ID del usuario que creó el registro' 
  })
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}