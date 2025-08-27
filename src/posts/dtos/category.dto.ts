import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
