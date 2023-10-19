import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { UserService } from '../user/user.service';
import { HashtagService } from '../hashtag/hashtag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { LikeService } from '../like/like.service';
import { Like } from '../like/like.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  query: jest.fn(),
});

describe('ProductService', () => {
  let productService: ProductService;
  let userService: UserService;
  let hashtagService: HashtagService;
  let productRepository: MockRepository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        UserService,
        HashtagService,
        LikeService,
        {
          provide: getRepositoryToken(User),
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
        {
          provide: getRepositoryToken(Like),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    userService = module.get<UserService>(UserService);
    hashtagService = module.get<HashtagService>(HashtagService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  describe('create', () => {
    it('should create a product', async () => {
      // given
      const user = new User();
      user.id = 'abc';
      user.nickname = 'test';
      user.email = 'test@example.com';
      const hashtags = [{ id: 1, name: 'testhashtag' }];
      const product = {
        email: user.email,
        title: 'testproduct',
        body: 'testbody',
        price: 1000,
        category: 'testcategory',
        location: 'testlocation',
        location_detail: 'testlocation_detail',
        imageUrls: ['testimageurl'],
        hashtags: [{ hashtags: 'testhashtag' }],
      };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(hashtagService, 'createHashtag')
        .mockResolvedValueOnce(hashtags);
      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(product);

      const result = await productService.create(product);

      expect(userService.getUserEmail).toHaveBeenCalledWith(product.email);
      expect(hashtagService.createHashtag).toHaveBeenCalledWith(
        product.hashtags,
      );
      expect(productRepository.save).toHaveBeenCalledWith({
        userId: user.id,
        nickname: user.nickname,
        title: product.title,
        body: product.body,
        price: product.price,
        category: product.category,
        location: product.location,
        location_detail: product.location_detail,
        imageUrls: product.imageUrls,
        hashtags: hashtags,
      });

      expect(result).toEqual(product);
    });
  });
});
