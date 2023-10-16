import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('접근이 허용되지 않습니다.', info.message)
      );
    }
    return user;
  }
  // constructor(private reflector: Reflector) {
  //   super();
  // }
  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (isPublic) {
  //     return true;
  //   }
  //   return super.canActivate(context);
  // }
  // handleRequest(err, user, info: Error, context) {
  //   const request = context.switchToHttp().getRequest();
  //   request.additionalData = "추가 데이터"; // 추가 정보 설정
  //   return super.handleRequest(err, user, info, context);
  // }
}
