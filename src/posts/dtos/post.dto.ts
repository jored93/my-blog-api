import { IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The title of the post' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The content of the post' })
  content?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The cover image of the post' })
  coverImage?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The summary of the post' })
  summary?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The userId' })
  userId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ description: 'The category ids of the post' })
  categoryIds?: string[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
