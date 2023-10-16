import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // req.body에서 어떤 필드를 ID로 사용할지 지정 (기본값은 'username')
      passwordField: 'password', // req.body에서 어떤 필드를 비밀번호로 사용할지 지정 (기본값은 'password')
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('로그인 정보가 잘못되었습니다.');
    }
    return user;
  }
}
