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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  // === ARTICLE-SCOPED ROUTES ===

  @Post('articles/:articleId/comments')
  @ApiOperation({ summary: 'Create a comment on an article' })
  @ApiParam({ name: 'articleId', type: String })
  @ApiBody({ type: CreateCommentDto })
  create(
    @Param('articleId') articleId: string,
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    return this.commentService.create(articleId, dto, req.user);
  }

  @Get('articles/:articleId/comments')
  @ApiOperation({ summary: 'Get all comments for an article' })
  @ApiParam({ name: 'articleId', type: String })
  findAll(@Param('articleId') articleId: string) {
    return this.commentService.findAll(articleId);
  }

  // === COMMENT-SPECIFIC ROUTES ===

  @Get('comments/:id')
  @ApiOperation({ summary: 'Get a specific comment by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch('comments/:id')
  @ApiOperation({ summary: 'Update a specific comment' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCommentDto })
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto, @Req() req) {
    return this.commentService.update(id, dto, req.user);
  }

  @Delete('comments/:id')
  @ApiOperation({ summary: 'Delete a specific comment' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string, @Req() req) {
    return this.commentService.remove(id, req.user);
  }
}
