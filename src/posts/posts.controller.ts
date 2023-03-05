import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':username')
  async findAllByUser(@Param('username') username: string) {
    const posts = await this.postsService.findAllByUser(username);
    return posts;
  }
}
