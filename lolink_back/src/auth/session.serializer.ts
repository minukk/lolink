import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, user: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUserEmail(payload);

    if (!user) {
      done(new Error('No User'), null);
      return;
    }

    const { password, ...userInfo } = user;

    done(null, userInfo);
  }
}
