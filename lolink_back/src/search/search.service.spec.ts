import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  createQueryBuilder: jest.fn(),
});

describe('SearchService', () => {
  let searchService: SearchService;
  let postRepository: MockRepository<Post>;
  let productRepository: MockRepository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Hashtag),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    postRepository = module.get(getRepositoryToken(Post));
    productRepository = module.get(getRepositoryToken(Product));
  });

  describe('search', () => {
    it('should return posts and products that match the query', async () => {
      // given
      const query = 'test';
      const posts = [{ id: 1, title: 'test post', body: 'test body' }];
      const products = [{ id: 1, title: 'test product', body: 'test body' }];
      jest.spyOn(postRepository, 'createQueryBuilder').mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(posts),
      } as any);
      jest.spyOn(productRepository, 'createQueryBuilder').mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(products),
      } as any);

      // when
      const result = await searchService.search(query);

      // then
      expect(postRepository.createQueryBuilder).toHaveBeenCalled();
      expect(productRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual({ posts, products });
    });
  });
});
