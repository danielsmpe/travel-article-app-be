import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createArticleDto: CreateArticleDto, userPayload: any) {
    const user = await this.userRepo.findOne({
      where: { id: userPayload.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const article = this.articleRepo.create({
      ...createArticleDto,
      author: user,
    });

    const saved = await this.articleRepo.save(article);
    return instanceToPlain(saved);
  }

  async findAll(page = 1, limit = 10): Promise<any> {
    const [articles, total] = await this.articleRepo.findAndCount({
      relations: ['author'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: instanceToPlain(articles),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const article = await this.articleRepo.findOne({
      where: { id },
    });

    if (!article) throw new NotFoundException('Article not found');

    return instanceToPlain(article);
  }

  async update(id: string, dto: UpdateArticleDto, userPayload: any) {
    const article = await this.articleRepo.findOne({
      where: { id },
    });

    if (!article) throw new NotFoundException('Article not found');
    if (article.author.id !== userPayload.userId) {
      throw new ForbiddenException('You are not the author');
    }

    Object.assign(article, dto);
    const updated = await this.articleRepo.save(article);
    return instanceToPlain(updated);
  }

  async remove(id: string, userPayload: any): Promise<{ message: string }> {
    const article = await this.articleRepo.findOne({
      where: { id },
    });

    if (!article) throw new NotFoundException('Article not found');
    if (article.author.id !== userPayload.userId) {
      throw new ForbiddenException('You are not the author');
    }

    await this.articleRepo.remove(article);
    return {
      message: 'Article deleted successfully',
    };
  }
}
