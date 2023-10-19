import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Like } from '../like/like.entity';
import { LikeService } from '../like/like.service';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';
import { HashtagService } from '../hashtag/hashtag.service';
import { Hashtag } from '../hashtag/hashtag.entity';

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

describe('UserService', () => {
  let userService: UserService;
  let likeService: LikeService;
  let userRepository: MockRepository<User>;
  // let hashtagService: HashtagService;
  // let productService: ProductService
  // let productRepository: MockRepository<Product>;
  // let likeRepository: MockRepository<Like>;
  // let hashtagRepository: MockRepository<Hashtag>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ProductService,
        LikeService,
        HashtagService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Product),
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
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    likeService = module.get<LikeService>(LikeService);
    userRepository = module.get(getRepositoryToken(User));
    // likeRepository = module.get(getRepositoryToken(Like));
    // hashtagService = module.get<HashtagService>(HashtagService);
    // productService = module.get<ProductService>(ProductService);
    // hashtagRepository = module.get(getRepositoryToken(Hashtag));
    // productRepository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      expect(await userService.createUser(user)).toEqual(user);
    });
  });

  describe('getUserAndLikes', () => {
    it('should get user and likes', async () => {
      const user = new User();
      const product = new Product();
      user.id = '20f7ded2-5ab8-4180-ac28-b144c704bd65';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(likeService, 'getLikes').mockResolvedValueOnce([
        {
          id: 1,
          userId: user.id,
          type: 'like',
          user: user,
          productId: product.id,
          product: product,
        },
      ]);

      const result = await userService.getUserAndLikes('1');
      expect(result.result).toEqual(user);
      expect(result.likes).toEqual([
        {
          id: 1,
          product: {
            id: product.id,
          },
          productId: product.id,
          type: 'like',
          user: {
            id: user.id,
          },
          userId: user.id,
        },
      ]);
    });
  });

  describe('getUserEmail', () => {
    it('should get a user by email', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        nickname: 'test',
        password: 'password',
        phone: '01012345678',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await userService.getUserEmail('test@example.com');

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = new User();
      const updatedUser = { ...user, nickname: 'updated' };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(updatedUser);

      await userService.updateUser('test@example.com', { nickname: 'updated' });

      expect(userService.getUserEmail).toHaveBeenCalledWith('test@example.com');
      expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = new User();
      user.email = 'test@example.com';

      const deletedUser = {
        ...user,
        email: 'test@example.com',
        password: null,
        phone: null,
        role: 'LEAVER',
        certification: false,
      };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(deletedUser);

      const result = await userService.deleteUser('test@example.com');

      expect(result).toEqual(deletedUser);
      expect(userService.getUserEmail).toHaveBeenCalledWith('test@example.com');
      expect(userRepository.save).toHaveBeenCalledWith(deletedUser);
    });
  });

  describe('findByEmailOrSave', () => {
    it('should return found user if exists', async () => {
      const user = new User();
      user.email = 'test@test.com';
      jest.spyOn(userService, 'getUserEmail').mockResolvedValue(user);

      const result = await userService.findByEmailOrSave(
        'test@test.com',
        'providerId',
        'platform',
      );
      expect(result).toEqual(user);
    });

    it('should save and return new user if not exists', async () => {
      const user = new User();
      user.email = 'new@test.com';
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await userService.findByEmailOrSave(
        'new@test.com',
        'providerId',
        'platform',
      );
      expect(result).toEqual(user);
    });
  });
});
