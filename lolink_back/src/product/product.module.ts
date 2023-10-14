import { Logger, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UserModule,
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  controllers: [ProductController],
  providers: [ProductService, Logger],
})
export class ProductModule {}
