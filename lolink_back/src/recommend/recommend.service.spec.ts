import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RecommendService } from './recommend.service';
import { Recommend } from './recommend.entity';
import { Post } from '../post/post.entity';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

describe('RecommendService', () => {
  let recommendService: RecommendService;
  let recommendRepository: MockRepository<Recommend>;
  let postRepository: MockRepository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommendService,
        {
          provide: getRepositoryToken(Recommend),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    recommendService = module.get<RecommendService>(RecommendService);
    recommendRepository = module.get(getRepositoryToken(Recommend));
    postRepository = module.get(getRepositoryToken(Post));
  });

  describe('recommend', () => {
    it('should recommend a post', async () => {
      // given
      const userId = '1';
      const postId = 1;
      const existingRecommendation = null;
      const post = { id: postId, recommendCount: 0 };
      jest
        .spyOn(recommendRepository, 'findOne')
        .mockResolvedValueOnce(existingRecommendation);
      jest.spyOn(recommendRepository, 'save').mockImplementationOnce(jest.fn());
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(post);
      jest.spyOn(postRepository, 'save').mockImplementationOnce(jest.fn());

      // when
      await recommendService.recommend(userId, postId);

      // then
      expect(recommendRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, post: { id: postId } },
      });
      expect(recommendRepository.save).toHaveBeenCalledWith({
        user: { id: userId },
        post: { id: postId },
        type: 'recommend',
      });
      expect(post.recommendCount).toEqual(1);
      expect(postRepository.save).toHaveBeenCalledWith(post);
    });

    it('should throw an error if already recommended', async () => {
      // given
      const userId = '1';
      const postId = 1;
      const existingRecommendation = { id: 1, type: 'recommend' };
      jest
        .spyOn(recommendRepository, 'findOne')
        .mockResolvedValueOnce(existingRecommendation);

      await expect(recommendService.recommend(userId, postId)).rejects.toThrow(
        '이미 추천하였습니다.',
      );
      expect(recommendRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, post: { id: postId } },
      });
    });
  });

  describe('notRecommend', () => {
    it('should not recommend a post', async () => {
      // given
      const userId = '1';
      const postId = 1;
      const existingRecommendation = null;
      const post = { id: postId, recommendCount: 1 };
      jest
        .spyOn(recommendRepository, 'findOne')
        .mockResolvedValueOnce(existingRecommendation);
      jest.spyOn(recommendRepository, 'save').mockImplementationOnce(jest.fn());
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(post);
      jest.spyOn(postRepository, 'save').mockImplementationOnce(jest.fn());

      // when
      await recommendService.notRecommend(userId, postId);

      // then
      expect(recommendRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, post: { id: postId } },
      });
      expect(recommendRepository.save).toHaveBeenCalledWith({
        user: { id: userId },
        post: { id: postId },
        type: 'not_recommend',
      });
      expect(post.recommendCount).toEqual(0);
      expect(postRepository.save).toHaveBeenCalledWith(post);
    });

    it('should throw an error if already not recommended', async () => {
      // given
      const userId = '1';
      const postId = 1;
      const existingRecommendation = { id: 1, type: 'not_recommend' };
      jest
        .spyOn(recommendRepository, 'findOne')
        .mockResolvedValueOnce(existingRecommendation);

      await expect(
        recommendService.notRecommend(userId, postId),
      ).rejects.toThrow('이미 비추천하였습니다.');
      expect(recommendRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, post: { id: postId } },
      });
    });
  });
});
