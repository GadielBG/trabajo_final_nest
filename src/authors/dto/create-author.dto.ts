import { IsString, IsDateString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsString()
  nationality: string;

  @IsDateString()
  birth_date: Date;
}
