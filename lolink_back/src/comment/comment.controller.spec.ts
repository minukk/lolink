import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Comment } from './comment.entity';

describe('CommentController', () => {
  let controller: CommentController;
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: {
            create: jest.fn(),
            paginate: jest.fn(),
            deleteComment: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    commentService = module.get<CommentService>(CommentService);
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      // given
      const newComment = new Comment();
      const newUser = new User();
      const newPost = new Post();
      const comment = {
        ...newComment,
        userId: 'abc',
        postId: 1,
        content: 'test comment',
        user: newUser,
        post: newPost,
        createdAt: new Date(),
        updatedAt: new Date(),
        show: true,
      };
      jest
        .spyOn(commentService, 'create')
        .mockResolvedValueOnce({ id: 1, ...comment });

      // when
      const result = await controller.createComment(comment);

      // then
      expect(commentService.create).toHaveBeenCalledWith(comment);
      expect(result).toEqual({ id: 1, ...comment });
    });
  });

  describe('getComments', () => {
    it('should return paginated comments for a post', async () => {
      // given
      const newComment = new Comment();
      const postId = 1;
      const page = 1;
      const newUser = new User();
      const newPost = new Post();
      const comment = {
        ...newComment,
        userId: 'abc',
        postId: 1,
        content: 'test comment',
        user: newUser,
        post: newPost,
        createdAt: new Date(),
        updatedAt: new Date(),
        show: true,
      };
      const comments = [{ ...comment, id: 1, content: 'test comment' }];
      const total = 1;
      jest.spyOn(commentService, 'paginate').mockResolvedValueOnce({
        data: comments,
        meta: { total, page, last_page: 1 },
      });

      // when
      const result = await controller.getComments({ postId }, page);

      // then
      expect(commentService.paginate).toHaveBeenCalledWith(postId, page);
      expect(result).toEqual({
        data: comments,
        meta: { total, page, last_page: 1 },
      });
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      // given
      const id = '1';
      const newComment = new Comment();
      const newUser = new User();
      const newPost = new Post();
      const comment = {
        ...newComment,
        userId: 'abc',
        id: 1,
        postId: 1,
        content: 'test comment',
        user: newUser,
        post: newPost,
        createdAt: new Date(),
        updatedAt: new Date(),
        show: true,
      };
      jest
        .spyOn(commentService, 'deleteComment')
        .mockResolvedValueOnce({ ...comment, show: false });

      // when
      const result = await controller.deleteComment(id);

      // then
      expect(commentService.deleteComment).toHaveBeenCalledWith(id);
      expect(result).toEqual({ ...comment, show: false });
    });
  });
});
