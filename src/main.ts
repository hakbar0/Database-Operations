import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import * as faker from 'faker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Seed data if there are no existing Post entities
  const postRepository = app.get(getRepositoryToken(Post));
  const postCount = await postRepository.count();

  if (postCount === 0) {
    const userRepository = app.get(getRepositoryToken(User));

    // Create 1000 posts with a random author
    for (let i = 0; i < 1000; i++) {
      const user = new User();
      user.username = faker.internet.userName();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      await userRepository.save(user);

      const post = new Post();
      post.title = faker.lorem.sentence();
      post.content = faker.lorem.paragraph();
      post.author = user;
      await postRepository.save(post);
    }
  }

  await app.listen(3000);
}

bootstrap().catch((error) => console.error(error));
