import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  summary: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  authorId: number;
}
