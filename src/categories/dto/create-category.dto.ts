import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Ciencia ficción', description: 'Nombre de la categoría' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ 
    example: 'Libros que exploran ideas futuristas basadas en avances científicos y tecnológicos', 
    description: 'Descripción de la categoría' 
  })
  @IsOptional()
  @IsString()
  description?: string;
}