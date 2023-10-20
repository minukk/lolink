import { Test, TestingModule } from '@nestjs/testing';
import { LikeService } from './like.service';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { Like } from './like.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

describe('LikeService', () => {
  let likeService: LikeService;
  let likeRepository: MockRepository<Like>;
  let productRepository: MockRepository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
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

    likeService = module.get<LikeService>(LikeService);
    likeRepository = module.get(getRepositoryToken(Like));
    productRepository = module.get(getRepositoryToken(Product));
  });

  describe('getLikes', () => {
    it('should return likes', async () => {
      const userId = '1';
      const likes = [{ id: 1, user: { id: userId }, type: 'like' }];
      jest.spyOn(likeRepository, 'find').mockResolvedValueOnce(likes);
      const result = await likeService.getLikes(userId);

      expect(likeRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId }, type: 'like' },
      });
      expect(result).toEqual(likes);
    });
  });

  describe('getLikesProduct', () => {
    it('should return likes', async () => {
      const productId = '1';
      const likes = [{ id: 1, product: { id: productId }, type: 'like' }];
      jest.spyOn(likeRepository, 'find').mockResolvedValueOnce(likes);
      const result = await likeService.getLikesProduct(productId);

      expect(likeRepository.find).toHaveBeenCalledWith({
        where: { user: { id: productId }, type: 'like' },
      });
      expect(result).toEqual(likes);
    });
  });

  describe('like', () => {
    it('should create a like', async () => {
      const userId = '1';
      const productId = '1';
      const existingLike = null;
      const product = { id: productId, like: 0 };
      jest.spyOn(likeRepository, 'findOne').mockResolvedValueOnce(existingLike);
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(product);
      jest.spyOn(likeRepository, 'save').mockImplementationOnce(jest.fn());
      jest.spyOn(productRepository, 'save').mockImplementationOnce(jest.fn());

      await likeService.like(userId, productId);

      expect(likeRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, product: { id: productId } },
      });
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
      });
      expect(likeRepository.save).toHaveBeenCalledWith({
        user: { id: userId },
        product: { id: productId },
        type: 'like',
      });
      expect(product.like).toEqual(1);
      expect(productRepository.save).toHaveBeenCalledWith(product);
    });

    it('should update an existing unlike to like', async () => {
      const userId = '1';
      const productId = '1';
      const existingLike = { id: 1, type: 'unlike' };
      const product = { id: productId, like: 0 };
      jest.spyOn(likeRepository, 'findOne').mockResolvedValueOnce(existingLike);
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(product);
      jest.spyOn(likeRepository, 'save').mockImplementationOnce(jest.fn());
      jest.spyOn(productRepository, 'save').mockImplementationOnce(jest.fn());

      await likeService.like(userId, productId);

      expect(likeRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, product: { id: productId } },
      });
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
      });
      expect(existingLike.type).toEqual('like');
      expect(likeRepository.save).toHaveBeenCalledWith(existingLike);
      expect(product.like).toEqual(1);
      expect(productRepository.save).toHaveBeenCalledWith(product);
    });

    it('should throw an error if already liked', async () => {
      const userId = '1';
      const productId = '1';
      const existingLike = { id: 1, type: 'like' };
      jest.spyOn(likeRepository, 'findOne').mockResolvedValueOnce(existingLike);

      await expect(likeService.like(userId, productId)).rejects.toThrow(
        '이미 좋아요를 눌렀습니다.',
      );
      expect(likeRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, product: { id: productId } },
      });
    });
  });

  describe('unlike', () => {
    it('should update a like to unlike', async () => {
      const userId = '1';
      const productId = '1';
      const existingLike = { id: 1, type: 'like' };
      const product = { id: productId, like: 1 };
      jest.spyOn(likeRepository, 'findOne').mockResolvedValueOnce(existingLike);
      jest.spyOn(likeRepository, 'save').mockImplementationOnce(jest.fn());
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(product);
      jest.spyOn(productRepository, 'save').mockImplementationOnce(jest.fn());

      await likeService.unlike(userId, productId);

      expect(likeRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, product: { id: productId } },
      });
      expect(existingLike.type).toEqual('unlike');
      expect(likeRepository.save).toHaveBeenCalledWith(existingLike);
      expect(product.like).toEqual(0);
      expect(productRepository.save).toHaveBeenCalledWith(product);
    });

    it('should throw an error if not liked', async () => {
      const userId = '1';
      const productId = '1';
      const existingLike = null;
      jest.spyOn(likeRepository, 'findOne').mockResolvedValueOnce(existingLike);

      await expect(likeService.unlike(userId, productId)).rejects.toThrow(
        '좋아요를 누르지 않았습니다.',
      );
      expect(likeRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, product: { id: productId } },
      });
    });

    it('should throw an error if already unliked', async () => {
      const userId = '1';
      const productId = '1';
      const existingLike = { id: 1, type: 'unlike' };
      jest.spyOn(likeRepository, 'findOne').mockResolvedValueOnce(existingLike);

      await expect(likeService.unlike(userId, productId)).rejects.toThrow(
        '이미 좋아요를 취소하였습니다.',
      );
      expect(likeRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, product: { id: productId } },
      });
    });
  });
});
