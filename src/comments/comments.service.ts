import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Article } from '../articles/article.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
  ) {}

  async create(articleId: string, dto: CreateCommentDto, userPayload: any) {
    const article = await this.articleRepo.findOne({
      where: { id: articleId },
    });
    if (!article) throw new NotFoundException('Article not found');

    const comment = this.commentRepo.create({
      content: dto.content,
      author: { id: userPayload.userId },
      article,
    });

    const saved = await this.commentRepo.save(comment);
    return instanceToPlain(saved);
  }

  async findAll(articleId: string) {
    const comments = await this.commentRepo.find({
      where: { article: { id: articleId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });

    return comments.map((comment) => instanceToPlain(comment));
  }
  async findOne(commentId: string) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['author', 'article'],
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return instanceToPlain(comment);
  }
  async update(commentId: string, dto: UpdateCommentDto, userPayload: any) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['author', 'article'],
    });
    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.author.id !== userPayload.userId)
      throw new ForbiddenException(
        'You are not allowed to update this comment',
      );

    Object.assign(comment, dto);
    const updated = await this.commentRepo.save(comment);
    return instanceToPlain(updated);
  }

  async remove(
    commentId: string,
    userPayload: any,
  ): Promise<{ message: string }> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['author'],
    });

    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.author.id !== userPayload.userId)
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );

    await this.commentRepo.remove(comment);
    return {
      message: 'Article deleted successfully',
    };
  }
}
