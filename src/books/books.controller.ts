import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';

@ApiTags('Books')
@ApiBearerAuth('access-token')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro creado correctamente' })
  create(
    @Body() createBookDto: CreateBookDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.booksService.create(createBookDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los libros' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un libro' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.booksService.update(id, updateBookDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un libro' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}