import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Updated content of the comment',
    example: 'This article is very informative!',
  })
  @IsOptional()
  @IsNotEmpty()
  content?: string;
}
