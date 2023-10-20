import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { RecommendService } from '../recommend/recommend.service';
import { Post } from './post.entity';

describe('PostController', () => {
  let controller: PostController;
  let postService: PostService;
  let recommendService: RecommendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            paginate: jest.fn(),
            getPost: jest.fn(),
            create: jest.fn(),
            updatePost: jest.fn(),
            deletePost: jest.fn(),
            incrementViewCount: jest.fn(),
          },
        },
        {
          provide: RecommendService,
          useValue: {
            recommend: jest.fn(),
            notRecommend: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
    recommendService = module.get<RecommendService>(RecommendService);
  });

  describe('getPosts', () => {
    it('should return paginated posts', async () => {
      // given
      const post = new Post();
      const page = 1;
      const posts = {
        data: [post],
        meta: {
          total: 20,
          page: 1,
          last_page: 1,
        },
      };
      jest.spyOn(postService, 'paginate').mockResolvedValueOnce(posts);

      // when
      const result = await controller.getPosts(page);

      // then
      expect(postService.paginate).toHaveBeenCalledWith(page);
      expect(result).toEqual(posts);
    });
  });

  describe('getPostAndHashtag', () => {
    it('should return a post and increment view count', async () => {
      // given
      const newPost = new Post();
      const id = 1;
      const req = { cookies: {} };
      const res = { json: jest.fn(), cookie: jest.fn() };
      const post = { ...newPost, id, title: 'post1' };
      jest
        .spyOn(postService, 'incrementViewCount')
        .mockResolvedValueOnce(undefined);
      jest.spyOn(postService, 'getPost').mockResolvedValueOnce(post);

      // when
      await controller.getPostAndHashtag(id, req, res);

      // then
      expect(postService.incrementViewCount).toHaveBeenCalledWith(id);
      expect(postService.getPost).toHaveBeenCalledWith(id);
      expect(res.cookie).toHaveBeenCalledWith(`viewed_post_${id}`, 'true', {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      expect(res.json).toHaveBeenCalledWith(post);
    });
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      // given
      const newPost = new Post();
      const post = {
        userId: 'abc',
        title: 'post1',
        body: newPost.body,
        category: 'free',
        imageUrls: '',
        hash: '',
      };
      const createdPost = { ...newPost, id: 1, ...post };
      jest.spyOn(postService, 'create').mockResolvedValueOnce(createdPost);

      // when
      const result = await controller.createPost(post);

      // then
      expect(postService.create).toHaveBeenCalledWith(post);
      expect(result).toEqual(createdPost);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      // given
      const id = '1';
      const post = { title: 'post1', body: 'text', imageUrls: '' };
      jest
        .spyOn(postService, 'updatePost')
        .mockResolvedValueOnce(Promise.resolve());

      // when
      const result = await controller.updatePost(id, post);

      // then
      expect(postService.updatePost).toHaveBeenCalledWith(id, post);
      expect(result).toEqual(undefined);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      // given
      const id = '1';
      jest.spyOn(postService, 'deletePost').mockResolvedValueOnce(undefined);

      // when
      const result = await controller.deletePost(id);

      // then
      expect(postService.deletePost).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
  });

  describe('recommend', () => {
    it('should recommend a post', async () => {
      // given
      const body = { userId: 1 };
      const postId = 1;
      jest
        .spyOn(recommendService, 'recommend')
        .mockResolvedValueOnce(undefined);

      // when
      const result = await controller.recommend(body, postId);

      // then
      expect(recommendService.recommend).toHaveBeenCalledWith(
        body.userId,
        postId,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('notRecommend', () => {
    it('should not recommend a post', async () => {
      // given
      const body = { userId: 1 };
      const postId = 1;
      jest
        .spyOn(recommendService, 'notRecommend')
        .mockResolvedValueOnce(undefined);

      // when
      const result = await controller.notRecommend(body, postId);

      // then
      expect(recommendService.notRecommend).toHaveBeenCalledWith(
        body.userId,
        postId,
      );
      expect(result).toBeUndefined();
    });
  });
});
