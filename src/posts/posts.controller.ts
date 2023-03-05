import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':username')
  @UseGuards(ThrottlerGuard)
  @Throttle()
  async findAllByUser(@Param('username') username: string) {
    const posts = await this.postsService.findAllByUser(username);
    return posts;
  }
}
