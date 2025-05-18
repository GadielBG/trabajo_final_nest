import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({ example: 'Ciencia ficción', description: 'Nombre de la categoría' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ 
    example: 'Libros que exploran ideas futuristas...', 
    description: 'Descripción de la categoría' 
  })
  @IsOptional()
  @IsString()
  description?: string;
}