import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/user/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, emails } = profile;

    console.log(accessToken);
    console.log(refreshToken);

    const providerId = id;
    const email = emails[0].value;
    const platform = 'google';

    const user: User = await this.userService.findByEmailOrSave(
      email,
      providerId,
      platform,
    );

    return user;
  }
}
