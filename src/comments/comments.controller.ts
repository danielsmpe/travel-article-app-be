import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  // === ARTICLE-SCOPED ROUTES ===

  @Post('articles/:articleId/comments')
  create(
    @Param('articleId') articleId: string,
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    return this.commentService.create(articleId, dto, req.user);
  }

  @Get('articles/:articleId/comments')
  findAll(@Param('articleId') articleId: string) {
    return this.commentService.findAll(articleId);
  }

  // === COMMENT-SPECIFIC ROUTES ===

  @Get('comments/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch('comments/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto, @Req() req) {
    return this.commentService.update(id, dto, req.user);
  }

  @Delete('comments/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.commentService.remove(id, req.user);
  }
}
