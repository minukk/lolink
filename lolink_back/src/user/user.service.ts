import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { nickTrans } from '../util/nickTrans';
import { LikeService } from '../like/like.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private likeService: LikeService,
  ) {}

  createUser(user) {
    return this.userRepository.save(user);
  }

  async getUserAndLikes(id: string) {
    const result = await this.userRepository.findOne({
      where: { id },
    });

    const likes = await this.likeService.getLikes(result.id);

    return {
      result,
      likes,
    };
  }

  async getUserId(id: string) {
    const result = await this.userRepository.findOne({
      where: { id },
    });

    return result;
  }

  async getUserEmail(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });

    return result;
  }

  async updateUser(email, _user) {
    const user: User = await this.getUserEmail(email);
    console.log(_user);
    user.nickname = _user.nickname;
    user.password = _user.password;
    user.phone = _user.phone;
    console.log(user);
    this.userRepository.save(user);
  }

  async deleteUser(email: string) {
    const user: User = await this.getUserEmail(email);

    user.password = null;
    user.phone = null;
    user.role = 'LEAVER';
    user.certification = false;
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.userRepository.save(user);
  }

  async findByEmailOrSave(email, providerId, platform): Promise<User> {
    const foundUser = await this.getUserEmail(email);

    if (foundUser) {
      return foundUser;
    }

    const newUser = await this.userRepository.save({
      email,
      nickname: nickTrans(email),
      providerId,
      platform,
    });
    return newUser;
  }
}
