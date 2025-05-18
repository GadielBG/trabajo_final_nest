import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Gabriel', description: 'Nombre del autor' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'García Márquez', description: 'Apellido del autor' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '1927-03-06', description: 'Fecha de nacimiento' })
  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  birthdate?: Date;

  @ApiPropertyOptional({ example: 'Colombia', description: 'País de origen' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ 
    example: 'Escritor y periodista colombiano...', 
    description: 'Biografía breve' 
  })
  @IsOptional()
  @IsString()
  biography?: string;

 
}