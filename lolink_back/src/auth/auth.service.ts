import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const users = await this.userService.getUserEmail(userInfo.email);
    if (users) {
      throw new BadRequestException('email in use');
    }
    const hashedPassword = await bcrypt.hash(userInfo.password, 13);
    try {
      const createdUser = await this.userService.createUser({
        ...userInfo,
        platform: 'LoLink',
        password: hashedPassword,
      });
      createdUser.password = null;

      return createdUser;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserEmail(email);

    const validatePassword = await bcrypt.compare(password, user.password);

    if (user && validatePassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(body) {
    const user = await this.validateUser(body.email, body.password);
    const payload = { email: body.email };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
