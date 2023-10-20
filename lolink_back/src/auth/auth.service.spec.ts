import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

const mockRepository = () => ({
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  sign: jest.fn(),
  getUserEmail: jest.fn(),
  createUser: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userInfo: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        nickname: 'test',
        phone: '01012345678',
        providerId: 'abcdefg',
        point: 0,
      };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(userInfo);

      const result = await authService.createUser(userInfo);
      result.password = null;

      expect(userService.getUserEmail).toHaveBeenCalledWith(userInfo.email);
      expect(result).toEqual(userInfo);
    });

    it('should throw an error if email is already in use', async () => {
      const newUser = new User();
      const userInfo = {
        ...newUser,
        email: 'test@example.com',
        password: 'password',
        nickname: 'test',
        phone: '01012345678',
        providerId: 'abcdefg',
        point: 0,
      };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(userInfo);

      await expect(authService.createUser(userInfo)).rejects.toThrow(
        'email in use',
      );
      expect(userService.getUserEmail).toHaveBeenCalledWith(userInfo.email);
    });

    it('should throw an error if an unknown error occurs', async () => {
      const userInfo = {
        email: 'test@example.com',
        password: 'password',
        nickname: 'test',
        phone: '01012345678',
        providerId: 'abcdefg',
        point: 0,
      };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(null);

      await expect(authService.createUser(userInfo)).rejects.toThrow(
        new HttpException(
          '알 수 없는 오류가 발생했습니다.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(userService.getUserEmail).toHaveBeenCalledWith(userInfo.email);
    });
  });

  describe('validateUser', () => {
    it('should return a user if email and password are valid', async () => {
      const newUser = new User();
      const email = 'test@example.com';
      const password = 'password';
      const user = {
        ...newUser,
        id: 'abc',
        email,
        password: 'hashedPassword',
        name: 'Test User',
      };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);

      const result = await authService.validateUser(email, password);

      expect(userService.getUserEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(null);
    });

    it('should return null if email is invalid', async () => {
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(null);
    });

    it('should return null if password is invalid', async () => {
      const newUser = new User();
      const email = 'test@example.com';
      const password = 'password';
      const user = {
        ...newUser,
        id: 'test',
        email,
        password: 'hashedPassword',
        name: 'Test User',
        nickname: 'test',
        phone: '01012345678',
        platform: 'LoLink',
      };
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);

      const result = await authService.validateUser(email, password);

      expect(userService.getUserEmail).toHaveBeenCalledWith(email);
      expect(result).toBeNull();
    });
  });

  describe('signin', () => {
    it('should sign in a user', async () => {
      const newUser = new User();
      const body = { email: 'test@example.com', password: 'password' };
      const user = {
        ...newUser,
        id: 'abc',
        email: body.email,
        name: 'Test User',
        nickname: 'test',
        phone: '01012345678',
        platform: 'LoLink',
        providerId: 'abcdefg',
      };
      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(user);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('token');

      const result = await authService.signin(body);

      expect(authService.validateUser).toHaveBeenCalledWith(
        body.email,
        body.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({ email: body.email });
      expect(result).toEqual({ access_token: 'token', user });
    });
  });
});
