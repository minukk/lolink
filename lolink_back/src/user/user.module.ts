import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../auth/google.strategy';
import { NaverStrategy } from '../auth/naver.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { LikeModule } from '../like/like.module';
import { Like } from '../like/like.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forFeature([User, Like]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
    PassportModule.register({ defaultStrategy: 'local' }),
    LikeModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    NaverStrategy,
    Logger,
  ],
  exports: [UserService],
})
export class UserModule {}
