import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Public()
  @Get('/public')
  @ApiOperation({ summary: 'Get all public articles' })
  findPublic() {
    return this.articlesService.findPublic();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiBody({ type: CreateArticleDto })
  create(@Body() dto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.articlesService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update article by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateArticleDto })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateArticleDto,
    @Request() req,
  ) {
    return this.articlesService.update(id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete article by ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: string, @Request() req) {
    return this.articlesService.remove(id, req.user);
  }
}
