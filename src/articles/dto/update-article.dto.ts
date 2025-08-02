import { IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  summary?: string;

  @IsOptional()
  content?: string;
}
