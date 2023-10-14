import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';
// import { uuidToBuffer } from 'util/transUUID';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
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
        // id: uuidToBuffer(uuid()),
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

  async createToken(email: string) {
    const payload = { email };
    return this.jwtService.sign(payload);
  }

  async signin(email: string, password: string) {
    const token = await this.createToken(email);
    const userFind = await this.userService.getUserEmail(email);

    const validatePassword = await bcrypt.compare(password, userFind.password);

    if (!userFind || !validatePassword) {
      throw new UnauthorizedException('bad password');
    }

    const user = {
      email: userFind.email,
      nickname: userFind.nickname,
      id: userFind.id,
      point: userFind.point,
    };

    return { user, token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserEmail(email);

    if (!user) {
      return null;
    }

    const { password: hashedPassword, ...userInfo } = user;

    if (bcrypt.compare(password, hashedPassword)) {
      return userInfo;
    }
    return null;
  }
}
