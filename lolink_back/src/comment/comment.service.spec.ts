import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Comment } from './comment.entity';
import { LikeService } from '../like/like.service';
import { Like } from '../like/like.entity';
import { HashtagService } from '../hashtag/hashtag.service';
import { Hashtag } from '../hashtag/hashtag.entity';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

describe('CommentService', () => {
  let commentService: CommentService;
  let commentRepository: MockRepository<Comment>;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        UserService,
        PostService,
        LikeService,
        HashtagService,
        ProductService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Like),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Hashtag),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    commentService = module.get<CommentService>(CommentService);
    commentRepository = module.get(getRepositoryToken(Comment));
  });

  describe('paginate', () => {
    it('should return paginated comments', async () => {
      // given
      const newComment = new Comment();
      const postId = 1;
      const page = 1;
      const comments = [{ ...newComment, id: 1, content: 'test comment' }];
      const total = 1;
      jest
        .spyOn(commentRepository, 'findAndCount')
        .mockResolvedValueOnce([comments, total]);

      // when
      const result = await commentService.paginate(postId, page);

      // then
      expect(commentRepository.findAndCount).toHaveBeenCalledWith({
        where: { postId, show: true },
        order: { createdAt: 'DESC' },
        take: 10,
        skip: 0,
      });
      expect(result).toEqual({
        data: comments,
        meta: {
          total,
          page,
          last_page: 1,
        },
      });
    });
  });

  describe('create', () => {
    it('should create a comment', async () => {
      // given
      const newUser = new User();
      const newComment = new Comment();
      const comment = {
        ...newComment,
        email: 'test@test.com',
        postId: 1,
        content: 'test comment',
      };
      const user = { ...newUser, id: 'abc' };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(commentRepository, 'save')
        .mockResolvedValueOnce({ ...comment });

      // when
      const result = await commentService.create(comment);

      // then
      expect(userService.getUserEmail).toHaveBeenCalledWith(comment.email);
      expect(commentRepository.save).toHaveBeenCalledWith({
        userId: user.id,
        postId: comment.postId,
        content: comment.content,
      });
      expect(result).toEqual({ ...comment });
    });
  });

  describe('getComment', () => {
    it('should return a comment', async () => {
      // given
      const newComment = new Comment();
      const id = 1;
      const comment = { ...newComment, id, content: 'test comment' };
      jest.spyOn(commentRepository, 'findOne').mockResolvedValueOnce(comment);

      // when
      const result = await commentService.getComment(id);

      // then
      expect(commentRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(comment);
    });
  });

  describe('getComments', () => {
    it('should return comments for a post', async () => {
      // given
      const newComment = new Comment();
      const postId = 1;
      const comments = [{ ...newComment, id: 1, content: 'test comment' }];
      jest.spyOn(commentRepository, 'find').mockResolvedValueOnce(comments);

      // when
      const result = await commentService.getComments(postId);

      // then
      expect(commentRepository.find).toHaveBeenCalledWith({
        where: { postId, show: true },
      });
      expect(result).toEqual(comments);
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      // given
      const newComment = new Comment();
      const newUser = new User();
      const newPost = new Post();
      const id = 1;
      const comment = {
        ...newComment,
        id,
        content: 'test comment',
        show: false,
        userId: 'abc',
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: newUser,
        post: newPost,
      };
      jest.spyOn(commentService, 'getComment').mockResolvedValueOnce(comment);
      jest
        .spyOn(commentRepository, 'save')
        .mockResolvedValueOnce({ ...comment });

      // when
      const result = await commentService.deleteComment(id);

      // then
      expect(commentService.getComment).toHaveBeenCalledWith(id);
      expect(commentRepository.save).toHaveBeenCalledWith({
        ...comment,
        show: false,
      });
      expect(result).toEqual({ ...comment, show: false });
    });
  });
});
