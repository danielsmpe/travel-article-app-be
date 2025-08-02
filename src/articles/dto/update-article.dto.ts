import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @ApiProperty({
    description: 'Title of the article',
    example: 'Exploring the Mountains',
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Summary of the article',
    example: 'A brief overview of the article content.',
  })
  @IsOptional()
  summary?: string;

  @ApiProperty({
    description: 'Content of the article',
    example: 'This article explores the beauty of the mountains...',
  })
  @IsOptional()
  content?: string;
}
