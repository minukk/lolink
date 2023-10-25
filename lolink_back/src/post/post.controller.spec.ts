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

      const result = await controller.getPosts(page);

      expect(postService.paginate).toHaveBeenCalledWith(page);
      expect(result).toEqual(posts);
    });
  });

  describe('getPostAndHashtag', () => {
    it('should return a post', async () => {
      const newPost = new Post();
      const id = 1;
      const post = { ...newPost, id, title: 'post1' };

      jest.spyOn(postService, 'getPost').mockResolvedValueOnce(post);

      const result = await postService.getPost(id);

      expect(postService.getPost).toHaveBeenCalledWith(id);

      expect(result).toEqual(post);
    });
  });

  describe('createPost', () => {
    it('should create a post', async () => {
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

      const result = await controller.createPost(post);

      expect(postService.create).toHaveBeenCalledWith(post);
      expect(result).toEqual(createdPost);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const id = '1';
      const post = { title: 'post1', body: 'text', imageUrls: '' };
      jest
        .spyOn(postService, 'updatePost')
        .mockResolvedValueOnce(Promise.resolve());

      const result = await controller.updatePost(id, post);

      expect(postService.updatePost).toHaveBeenCalledWith(id, post);
      expect(result).toEqual(undefined);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const id = '1';
      jest.spyOn(postService, 'deletePost').mockResolvedValueOnce(undefined);

      const result = await controller.deletePost(id);

      expect(postService.deletePost).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
  });

  describe('recommend', () => {
    it('should recommend a post', async () => {
      const body = { userId: 1 };
      const postId = 1;
      jest
        .spyOn(recommendService, 'recommend')
        .mockResolvedValueOnce(undefined);

      const result = await controller.recommend(body, postId);

      expect(recommendService.recommend).toHaveBeenCalledWith(
        body.userId,
        postId,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('notRecommend', () => {
    it('should not recommend a post', async () => {
      const body = { userId: 1 };
      const postId = 1;
      jest
        .spyOn(recommendService, 'notRecommend')
        .mockResolvedValueOnce(undefined);

      const result = await controller.notRecommend(body, postId);

      expect(recommendService.notRecommend).toHaveBeenCalledWith(
        body.userId,
        postId,
      );
      expect(result).toBeUndefined();
    });
  });
});
