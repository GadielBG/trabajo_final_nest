import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, userId: number): Promise<Book> {
    const book = this.booksRepository.create({
      ...createBookDto,
      userId, // Guardamos el ID del usuario actual
    });
    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: ['author'], // Para cargar también la información del autor
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto, userId: number): Promise<Book> {
    const book = await this.findOne(id);
    
    Object.assign(book, updateBookDto);
    
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.booksRepository.remove(book);
  }
}