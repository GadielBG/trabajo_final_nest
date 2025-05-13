import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('authors') // Opcional: define nombre exacto de la tabla
export class Author {
  @PrimaryGeneratedColumn()
  id: number; // a) author ID

  @Column()
  name: string; // b) full name

  @Column()
  nationality: string; // c) nacionalidad

  @Column({ type: 'date' })
  birth_date: Date; // d) birth_date

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date; // e) fecha de creación

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date; // f) fecha de actualización

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
