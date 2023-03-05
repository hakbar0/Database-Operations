import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(ThrottlerGuard)
  @Throttle()
  async findAll(
    @Query('offset') offset = 0,
    @Query('limit') limit = 50,
  ): Promise<{
    offset: number;
    limit: number;
    totalPages: number;
    users: Partial<User[]>;
    totalCount: number;
  }> {
    const [users, count] = await this.usersService.findAll({
      skip: offset,
      take: limit,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      offset,
      limit,
      totalCount: count,
      totalPages,
      users,
    };
  }
}
