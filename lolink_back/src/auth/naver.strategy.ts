import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/user/naver',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, emails } = profile;

    console.log(accessToken);
    console.log(refreshToken);

    const providerId = id;

    console.log('profile===>', profile);
    console.log('providerId===>', providerId);

    const email = emails[0].value;

    const platform = 'naver';

    const user: User = await this.userService.findByEmailOrSave(
      email,
      providerId,
      platform,
    );

    return user;
  }
}
