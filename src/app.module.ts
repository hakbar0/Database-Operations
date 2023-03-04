import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { Post } from 'src/posts/post.entity';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Post]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [User, Post],
      synchronize: true,
    }),
  ],
  controllers: [UsersController, PostsController],
  providers: [UsersService, PostsService],
})
export class AppModule {}
