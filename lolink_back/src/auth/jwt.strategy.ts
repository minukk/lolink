import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'lolink-key',
    });
  }

  async validate(payload: any) {
    const email = payload.email;

    const user = await this.usersService.getUserEmail(email);
    const { password, ...userInfo } = user;

    if (!user) {
      throw new UnauthorizedException();
    }

    return userInfo;
  }
}
