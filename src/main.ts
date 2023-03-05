import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seed } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // Seed data if there are no existing Post entities
  await seed(app);
  await app.listen(3000);
}

bootstrap().catch((error) => console.error(error));
