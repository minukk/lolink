import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { UserService } from '../user/user.service';
import { HashtagService } from '../hashtag/hashtag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { LikeService } from '../like/like.service';
import { Like } from '../like/like.entity';

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

  describe('paginate', () => {
    it('should return paginated products', async () => {
      // given
      const page = 1;
      const take = 8;
      const products = [
        { id: 1, name: 'product1', show: true, createdAt: new Date() },
        { id: 2, name: 'product2', show: true, createdAt: new Date() },
        { id: 3, name: 'product3', show: true, createdAt: new Date() },
      ];
      const total = 3;
      jest
        .spyOn(productRepository, 'findAndCount')
        .mockResolvedValueOnce([products, total]);

      const result = await productService.paginate(page);

      expect(productRepository.findAndCount).toHaveBeenCalledWith({
        where: { show: true },
        order: {
          createdAt: 'DESC',
        },
        relations: ['likes'],
        take,
        skip: (page - 1) * take,
      });
      expect(result).toEqual({
        data: products,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      });
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
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

  describe('getProducts', () => {
    it('should return products', async () => {
      const products = [{ id: 1, name: 'product1', show: true }];
      jest.spyOn(productRepository, 'find').mockResolvedValueOnce(products);

      const result = await productService.getProducts();

      expect(productRepository.find).toHaveBeenCalledWith({
        where: { show: true },
      });
      expect(result).toEqual(products);
    });
  });

  describe('incrementViewCount', () => {
    it('should increment view count', async () => {
      const id = '1';
      const product = { id, name: 'product1', show: true, views: 0 };
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(product);
      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(product);

      await productService.incrementViewCount(id);

      expect(productRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(productRepository.save).toHaveBeenCalledWith({
        ...product,
        views: 1,
      });
    });
  });

  describe('getProduct', () => {
    it('should return a product', async () => {
      const id = '1';
      const product = { id, name: 'product1', show: true };
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(product);

      const result = await productService.getProduct(id);

      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['hashtags', 'likes'],
      });
      expect(result).toEqual(product);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const newProduct = new Product();
      const id = '1';
      const _product = {
        title: 'new title',
        hashtags: ['hashtag1', 'hashtag2'],
      };
      const product = { ...newProduct, id, name: 'product1', show: true };
      const hashtags = [
        { id: 1, name: 'hashtag1' },
        { id: 2, name: 'hashtag2' },
      ];
      jest.spyOn(productService, 'getProduct').mockResolvedValueOnce(product);
      jest
        .spyOn(hashtagService, 'createHashtag')
        .mockResolvedValueOnce(hashtags);
      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(product);

      await productService.updateProduct(id, _product);

      expect(productService.getProduct).toHaveBeenCalledWith(id);
      expect(hashtagService.createHashtag).toHaveBeenCalledWith(
        _product.hashtags,
      );
      expect(productRepository.save).toHaveBeenCalledWith({
        ...product,
        title: _product.title,
        hashtags,
      });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const newProduct = new Product();
      const id = '1';
      const product = { ...newProduct, id, name: 'product1', show: true };
      jest.spyOn(productService, 'getProduct').mockResolvedValueOnce(product);
      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(product);

      const result = await productService.deleteProduct(id);

      expect(productService.getProduct).toHaveBeenCalledWith(id);
      expect(productRepository.save).toHaveBeenCalledWith({
        ...product,
        show: false,
      });
      expect(result).toEqual(product);
    });
  });

  describe('getBestProducts', () => {
    it('should return best products', async () => {
      const page = 1;
      const take = 8;
      const products = [{ id: 1, name: 'product1', show: true, like: 20 }];
      const total = 1;
      jest
        .spyOn(productRepository, 'findAndCount')
        .mockResolvedValueOnce([products, total]);

      const result = await productService.getBestProducts(page);

      expect(productRepository.findAndCount).toHaveBeenCalledWith({
        where: { show: true, like: MoreThan(15) },
        order: {
          createdAt: 'DESC',
        },
        take,
        skip: (page - 1) * take,
      });
      expect(result).toEqual({
        data: products,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      });
    });
  });
});
