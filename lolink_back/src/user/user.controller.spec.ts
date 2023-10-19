import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserEmail: jest.fn(),
            getUserAndLikes: jest.fn(),
            deleteUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            createUser: jest.fn(),
            signin: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('getMyAuth', () => {
    it('should return the authenticated user', async () => {
      const user = { id: 1, email: 'test@example.com', nickname: 'test' };
      const req = { user };
      const result = await controller.getMyAuth(req);
      expect(result).toEqual(user);
    });
  });

  describe('getUserEmail', () => {
    it('should return the user with the given email', async () => {
      const email = 'test@example.com';
      const user = new User();
      jest.spyOn(userService, 'getUserEmail').mockResolvedValueOnce(user);
      const result = await controller.getUserEmail(email);
      expect(result).toEqual(user);
      expect(userService.getUserEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('getUserInfo', () => {
    it('should return the user with the given id', async () => {
      const user = new User();
      const id = user.id;
      const data = {
        result: user,
        likes: [],
      };
      jest.spyOn(userService, 'getUserAndLikes').mockResolvedValueOnce(data);
      const result = await controller.getUserInfo(id);
      expect(result).toEqual(data);
      expect(userService.getUserAndLikes).toHaveBeenCalledWith(id);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: CreateUserDto = {
        email: 'test@example.com',
        nickname: 'test',
        password: 'password',
        phone: '01012345678',
        providerId: '',
        point: 0,
      };
      await controller.createUser(user);
      expect(authService.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('loginUser', () => {
    it('should sign in the user', async () => {
      const body = { email: 'test@example.com', password: 'password' };
      await controller.loginUser(body);
      expect(authService.signin).toHaveBeenCalledWith(body);
    });
  });

  describe('logout', () => {
    it('should log out the user', () => {
      const req = { logout: jest.fn() };
      const res = { clearCookie: jest.fn(), send: jest.fn() };
      controller.logout(req, res);
      expect(req.logout).toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith('로그아웃 성공');
    });
  });

  describe('deleteUser', () => {
    it('should delete the user with the given email', async () => {
      const email = 'test@example.com';
      await controller.deleteUser(email);
      expect(userService.deleteUser).toHaveBeenCalledWith(email);
    });
  });

  describe('updateUser', () => {
    it('should update the user with the given email', async () => {
      const email = 'test@example.com';
      const user: UpdateUserDto = {
        nickname: 'new nickname',
        password: 'new password',
      };
      await controller.updateUser(email, user);
      expect(userService.updateUser).toHaveBeenCalledWith(email, user);
    });
  });
});
