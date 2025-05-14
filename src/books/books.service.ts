import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOne({
      where: { id: dto.author_id },
    });
    if (!author) throw new NotFoundException('Author not found');

    const book = this.bookRepository.create({ ...dto, author });
    return await this.bookRepository.save(book);
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (dto.author_id) {
      const author = await this.authorRepository.findOne({
        where: { id: dto.author_id },
      });
      if (!author) throw new NotFoundException('Author not found');
      book.author = author;
    }

    Object.assign(book, dto);
    return await this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  async findAuthorByBook(id: number): Promise<Author> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) throw new NotFoundException('Book not found');
    return book.author;
  }
}
