import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(options?: {
    skip?: number;
    take?: number;
  }): Promise<[Partial<User[]>, number]> {
    const [users, count] = await this.userRepository.findAndCount({
      ...options,
      select: ['username', 'email', 'createdAt'],
    });
    return [users, count];
  }
}
