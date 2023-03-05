import { getRepositoryToken } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import * as faker from 'faker';
import { INestApplication } from '@nestjs/common';

export async function seed(app: INestApplication) {
  const logger = new Logger('Seed');

  logger.log('Seeding the database. Please be patient...');

  const postRepository = app.get(getRepositoryToken(Post));
  const postCount = await postRepository.count();

  if (postCount === 0) {
    const userRepository = app.get(getRepositoryToken(User));

    // Create up to 50 users
    for (let i = 1; i <= 50; i++) {
      const user = new User();
      user.username = faker.internet.userName();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.createdAt = faker.date.past(); // Generate a random created date in the past for the user
      await userRepository.save(user);

      // Generate a random number of posts for each user (between 1 and 10)
      const postCount = faker.datatype.number({ min: 1, max: 70 });
      for (let j = 0; j < postCount; j++) {
        const post = new Post();
        post.title = faker.lorem.sentence();
        post.content = faker.lorem.paragraph();
        post.author = user;

        // Generate a random created date for the post after the user's created date but before today
        const maxDate = new Date();
        const minDate = user.createdAt;
        post.createdAt = faker.date.between(minDate, maxDate);

        await postRepository.save(post);
      }
    }

    logger.log('Database seeding complete!');
  } else {
    logger.log('Database already seeded. Skipping...');
  }
}
