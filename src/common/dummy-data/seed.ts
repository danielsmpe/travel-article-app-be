import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';
import { Article } from '../../articles/article.entity';
import { Comment } from '../../comments/comment.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: process.env.DB_NAME || 'travel_db',
  entities: [User, Article, Comment],
  synchronize: true,
});

function generateLorem(paragraphs: number = 3): string {
  const paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Pellentesque imperdiet, nisi sed gravida feugiat, nisi velit hendrerit purus, 
  nec ultricies mauris orci vel magna. Integer sit amet orci eget sem cursus viverra. 
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.`;
  return Array(paragraphs).fill(paragraph).join('\n\n');
}

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
      summary: `Ringkasan artikel ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      content: generateLorem(5), // 5 paragraph lorem ipsum
      thumbnail: `https://lipsum.app/random/1600x900?${i}`,
      author: user,
    });
    await articleRepo.save(article);

    for (let j = 1; j <= 3; j++) {
      const comment = commentRepo.create({
        content: `Komentar ${j} untuk artikel ${i}: ${generateLorem(1)}`,
        article,
        author: user,
      });
      await commentRepo.save(comment);
    }
  }

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  dataSource.destroy();
});
