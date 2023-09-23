import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { TotoModule } from './toto/toto.module';

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
      synchronize: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
