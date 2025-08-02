import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  summary: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
