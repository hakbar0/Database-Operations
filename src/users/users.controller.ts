import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('offset') offset = 0, @Query('limit') limit = 50) {
    const [users, count] = await this.usersService.findAll({
      skip: offset,
      take: limit,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      offset,
      limit,
      totalPages,
      users,
    };
  }
}
