import { Module } from '@nestjs/common';
// import {
//   WinstonModule,
//   utilities as nestWinstonModuleUtilities,
// } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { TotoModule } from './sports/sports.module';
import { MessageModule } from './message/message.module';
import { RecommendModule } from './recommend/recommend.module';
import { LikeModule } from './like/like.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      synchronize: false,
      database: 'LL',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      logging: true,
    }),
    UserModule,
    ProductModule,
    PostModule,
    CommentModule,
    HashtagModule,
    TotoModule,
    MessageModule,
    RecommendModule,
    LikeModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
