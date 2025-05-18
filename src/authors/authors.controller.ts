import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';

@ApiTags('Authors')
@ApiBearerAuth('access-token')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo autor' })
  @ApiResponse({ status: 201, description: 'Autor creado correctamente' })
  create(
    @Body() createAuthorDto: CreateAuthorDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.authorsService.create(createAuthorDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los autores' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un autor por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un autor' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.authorsService.update(id, updateAuthorDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un autor' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.remove(id);
  }
}