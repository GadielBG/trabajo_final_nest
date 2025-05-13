import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity('books') // Nombre explícito de tabla
export class Book {
  @PrimaryGeneratedColumn()
  id: number; // a) book ID

  @Column()
  tittle: string; // b) título (mantengo "tittle" si así lo piden)

  @Column()
  isbn: string; // c) número ISBN

  @Column()
  publisher: string; // d) editorial

  @Column()
  publication_year: number; // e) año de publicación

  @Column()
  genre: string; // f) género

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' }) // Nombre explícito del campo FK
  author: Author; // g) relación con autor
}
