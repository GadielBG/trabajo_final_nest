import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Categories')
@ApiBearerAuth('access-token')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles('ADMIN') // Solo usuarios con rol ADMIN pueden crear categorías
  @ApiOperation({ summary: 'Crear una nueva categoría (requiere rol ADMIN)' })
  @ApiResponse({ status: 201, description: 'Categoría creada correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - Se requiere rol ADMIN' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN') // Solo usuarios con rol ADMIN pueden actualizar categorías
  @ApiOperation({ summary: 'Actualizar una categoría (requiere rol ADMIN)' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - Se requiere rol ADMIN' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('ADMIN') // Solo usuarios con rol ADMIN pueden eliminar categorías
  @ApiOperation({ summary: 'Eliminar una categoría (requiere rol ADMIN)' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - Se requiere rol ADMIN' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}