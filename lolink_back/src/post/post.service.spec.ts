import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { HashtagService } from '../hashtag/hashtag.service';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Recommend } from '../recommend/recommend.entity';
import { RecommendService } from '../recommend/recommend.service';
import { User } from '../user/user.entity';
import { Like } from '../like/like.entity';
import { LikeService } from '../like/like.service';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  query: jest.fn(),
});

describe('PostService', () => {
  let postService: PostService;
  let userService: UserService;
  let hashtagService: HashtagService;
  let postRepository: MockRepository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        UserService,
        HashtagService,
        RecommendService,
        LikeService,
        ProductService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Hashtag),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Recommend),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Like),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
    hashtagService = module.get<HashtagService>(HashtagService);
    postRepository = module.get(getRepositoryToken(Post));
  });

  describe('paginate', () => {
    it('should return paginated posts', async () => {
      const page = 1;
      const take = 20;
      const posts = [
        { id: 1, title: 'post1', show: true, createdAt: new Date() },
        { id: 2, title: 'post2', show: true, createdAt: new Date() },
        { id: 3, title: 'post3', show: true, createdAt: new Date() },
      ];
      const total = 3;
      jest
        .spyOn(postRepository, 'findAndCount')
        .mockResolvedValueOnce([posts, total]);

      const result = await postService.paginate(page);

      expect(postRepository.findAndCount).toHaveBeenCalledWith({
        where: { show: true },
        order: {
          createdAt: 'DESC',
        },
        take,
        skip: (page - 1) * take,
      });
      expect(result).toEqual({
        data: posts,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      });
    });
  });

  describe('create', () => {
    it('should create a post', async () => {
      const newUser = new User();
      const _post = {
        email: 'test@example.com',
        title: 'test post',
        body: 'test body',
        category: 'test category',
        imageUrls: ['test image'],
        hashtags: ['test hashtag'],
      };
      const user = { ...newUser, id: 'abc', nickname: 'test user' };
      const hashtags = [{ id: 1, name: 'test hashtag' }];
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(hashtagService, 'createHashtag')
        .mockResolvedValueOnce(hashtags);
      const post = {
        userId: user.id,
        nickname: user.nickname,
        title: _post.title,
        body: _post.body,
        category: _post.category,
        imageUrls: _post.imageUrls,
        hashtags: hashtags,
      };
      jest.spyOn(postRepository, 'save').mockResolvedValueOnce(post);

      const result = await postService.create(_post);

      expect(userService.getUserEmail).toHaveBeenCalledWith(_post.email);
      expect(hashtagService.createHashtag).toHaveBeenCalledWith(_post.hashtags);
      expect(postRepository.save).toHaveBeenCalledWith(post);
      expect(result).toEqual(post);
    });
  });

  describe('getPosts', () => {
    it('should return all posts', async () => {
      const posts = [
        { id: 1, title: 'post1', show: true, createdAt: new Date() },
        { id: 2, title: 'post2', show: true, createdAt: new Date() },
        { id: 3, title: 'post3', show: true, createdAt: new Date() },
      ];
      jest.spyOn(postRepository, 'find').mockResolvedValueOnce(posts);

      const result = await postService.getPosts();

      expect(postRepository.find).toHaveBeenCalledWith({
        where: { show: true },
      });
      expect(result).toEqual(posts);
    });
  });

  describe('incrementViewCount', () => {
    it('should increment the view count of a post', async () => {
      const id = 1;
      const post = { id, views: 0 };
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(post);
      jest.spyOn(postRepository, 'save').mockResolvedValueOnce(post);

      await postService.incrementViewCount(id);

      expect(postRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(postRepository.save).toHaveBeenCalledWith({ ...post, views: 1 });
    });
  });

  describe('getPost', () => {
    it('should return a post with hashtags', async () => {
      const id = 1;
      const post = {
        id,
        title: 'test post',
        hashtags: [{ id: 1, name: 'test hashtag' }],
      };
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(post);

      const result = await postService.getPost(id);

      expect(postRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['hashtags'],
      });
      expect(result).toEqual(post);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const newPost = new Post();
      const id = 1;
      const _post = {
        title: 'updated post',
        body: 'updated body',
        hashtags: ['updated hashtag'],
      };
      const post = {
        ...newPost,
        id,
        title: 'test post',
        body: 'test body',
      };
      const hashtags = [{ id: 2, name: 'updated hashtag' }];
      jest.spyOn(postService, 'getPost').mockResolvedValueOnce(post);
      jest
        .spyOn(hashtagService, 'createHashtag')
        .mockResolvedValueOnce(hashtags);
      jest.spyOn(postRepository, 'save').mockResolvedValueOnce(post);

      await postService.updatePost(id, _post);

      expect(postService.getPost).toHaveBeenCalledWith(id);
      expect(hashtagService.createHashtag).toHaveBeenCalledWith(_post.hashtags);
      expect(postRepository.save).toHaveBeenCalledWith({
        ...post,
        ..._post,
        hashtags,
      });
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const newPost = new Post();
      const id = 1;
      const post = { ...newPost, id, show: true };
      jest.spyOn(postService, 'getPost').mockResolvedValueOnce(post);
      jest.spyOn(postRepository, 'save').mockResolvedValueOnce(post);

      const result = await postService.deletePost(id);

      expect(postService.getPost).toHaveBeenCalledWith(id);
      expect(postRepository.save).toHaveBeenCalledWith({
        ...post,
        show: false,
      });
      expect(result).toEqual(post);
    });
  });

  describe('getBestPost', () => {
    it('should return the best posts', async () => {
      const page = 1;
      const take = 20;
      const posts = [
        {
          id: 1,
          title: 'post1',
          show: true,
          recommend: 30,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'post2',
          show: true,
          recommend: 30,
          createdAt: new Date(),
        },
        {
          id: 3,
          title: 'post3',
          show: true,
          recommend: 30,
          createdAt: new Date(),
        },
      ];
      const total = 3;
      jest
        .spyOn(postRepository, 'findAndCount')
        .mockResolvedValueOnce([posts, total]);

      const result = await postService.getBestPost(page);

      expect(postRepository.findAndCount).toHaveBeenCalledWith({
        where: { show: true, recommend: MoreThan(29) },
        order: {
          createdAt: 'DESC',
        },
        take,
        skip: (page - 1) * take,
      });
      expect(result).toEqual({
        data: posts,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      });
    });
  });
});
