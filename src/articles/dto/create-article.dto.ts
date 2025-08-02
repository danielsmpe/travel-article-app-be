import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Title of the article',
    example: 'Exploring the Mountains',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Summary of the article',
    example: 'A brief overview of the article content.',
  })
  @IsNotEmpty()
  summary: string;

  @ApiProperty({
    description: 'Content of the article',
    example: 'This article explores the beauty of the mountains...',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'ID of the author',
    example: 1,
  })
  @IsNotEmpty()
  authorId: number;
}
