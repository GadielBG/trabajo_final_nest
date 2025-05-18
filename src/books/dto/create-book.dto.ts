// src/books/dto/create-book.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Cien años de soledad', description: 'Título del libro' })
  @IsNotEmpty()
  @IsString()
  title: string;

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

  @ApiProperty({ example: 1, description: 'ID del autor del libro' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  authorId: number;

  // Añadir categoryId como opcional
  @ApiPropertyOptional({ example: 1, description: 'ID de la categoría del libro' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  categoryId?: number;
}