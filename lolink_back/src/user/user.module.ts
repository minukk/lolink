import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/auth/google.strategy';
import { NaverStrategy } from 'src/auth/naver.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'lolink-key',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    NaverStrategy,
    Logger,
  ],
  exports: [UserService],
})
export class UserModule {}
