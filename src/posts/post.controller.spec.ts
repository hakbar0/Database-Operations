import { Test } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { ThrottlerModule } from '@nestjs/throttler';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;
  let postRepository: any;

  beforeEach(async () => {
    postRepository = {
      createQueryBuilder: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRootAsync({
          useFactory: () => ({
            ttl: 60,
            limit: 10,
          }),
        }),
      ],
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: postRepository,
        },
      ],
    }).compile();

    controller = moduleRef.get<PostsController>(PostsController);
    service = moduleRef.get<PostsService>(PostsService);
  });

  describe('findAllByUser', () => {
    it('should return all posts by username', async () => {
      const mockUsername = 'testuser';
      const mockPosts = [
        {
          id: 1,
          title: 'Post 1',
          content: 'Lorem ipsum dolor sit amet',
          author: {
            id: 1,
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password',
            createdAt: new Date('2022-03-07T02:39:31.527Z'),
            posts: [],
            updatedAt: new Date('2022-03-07T02:39:31.527Z'),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Post 2',
          content: 'Lorem ipsum dolor sit amet',
          author: {
            id: 1,
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password',
            createdAt: new Date('2022-03-07T02:39:31.527Z'),
            posts: [],
            updatedAt: new Date('2022-03-07T02:39:31.527Z'),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockPosts),
      };

      jest
        .spyOn(postRepository, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilder);

      const result = await service.findAllByUser(mockUsername);

      expect(postRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'post.title',
        'post.content',
        'post.createdAt',
        'author.username',
        'author.createdAt',
      ]);
      expect(postRepository.createQueryBuilder().where).toHaveBeenCalledWith(
        'author.username = :username',
        { username: mockUsername },
      );
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'post.author',
        'author',
      );
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'post.title',
        'post.content',
        'post.createdAt',
        'author.username',
        'author.createdAt',
      ]);
      expect(result).toEqual(mockPosts);
    });
  });
});
