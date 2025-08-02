import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';
import { Article } from '../../articles/article.entity';
import { Comment } from '../../comments/comment.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'POLQWS',
  database: 'travel_app',
  entities: [User, Article, Comment],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const articleRepo = dataSource.getRepository(Article);
  const commentRepo = dataSource.getRepository(Comment);

  let user = await userRepo.findOne({ where: { username: 'dummy' } });
  if (!user) {
    user = userRepo.create({ username: 'dummy', password: 'hashedpass' });
    await userRepo.save(user);
  }

  for (let i = 1; i <= 10; i++) {
    const article = articleRepo.create({
      title: `Artikel Dummy ${i}`,
      summary: `Ringkasan artikel ${i}`,
      content: `Konten panjang untuk artikel ${i}...`,
      thumbnail: `https://dummyimage.com/600x400/000/fff&text=Artikel+${i}`,
      author: user,
    });
    await articleRepo.save(article);

    for (let j = 1; j <= 3; j++) {
      const comment = commentRepo.create({
        content: `Komentar ${j} untuk artikel ${i}`,
        article,
        author: user,
      });
      await commentRepo.save(comment);
    }
  }

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  dataSource.destroy();
});
