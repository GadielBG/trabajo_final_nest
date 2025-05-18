import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional({ example: 'Cien años de soledad', description: 'Título del libro' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 1967, description: 'Año de publicación' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  year?: number;

  @ApiPropertyOptional({ 
    example: 'Una de las obras más importantes...', 
    description: 'Descripción del libro' 
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID del autor del libro' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  authorId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID de la categoría del libro' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  categoryId?: number;
}