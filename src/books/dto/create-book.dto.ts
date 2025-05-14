import { IsString, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsString()
  tittle: string;

  @IsString()
  isbn: string;

  @IsString()
  publisher: string;

  @IsInt()
  publication_year: number;

  @IsString()
  genre: string;

  @IsInt()
  author_id: number;
}

