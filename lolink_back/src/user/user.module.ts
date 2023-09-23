import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.startegy';
import { SessionSerializer } from 'src/auth/session.serializer';
import { GoogleStrategy } from 'src/auth/google.strategy';
import { NaverStrategy } from 'src/auth/naver.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    SessionSerializer,
    NaverStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
