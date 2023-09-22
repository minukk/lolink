import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { nickTrans } from 'util/nickTrans';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(user) {
    return this.userRepository.save(user);
  }

  async getUser(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.nickname = _user.nickname;
    user.password = _user.password;
    user.phone = _user.phone;
    console.log(user);
    this.userRepository.save(user);
  }

  deleteUser(email: string) {
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.userRepository.delete({ email });
  }

  async findByEmailOrSave(email, providerId, platform): Promise<User> {
    const foundUser = await this.getUser(email);

    if (foundUser) {
      console.log('이미 있다!!!', foundUser);
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
