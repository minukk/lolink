import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import * as serviceAccountJson from '../../lolink_dev_service_account_key.json';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LikeService } from '../like/like.service';

const serviceAccount = serviceAccountJson as admin.ServiceAccount;

@Controller('product')
export class ProductController {
  private storageBucket: any;

  constructor(
    private productService: ProductService,
    private likeService: LikeService,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'lolink-dev.appspot.com',
    });
    this.storageBucket = admin.storage().bucket();
  }

  @Get('/')
  async getProducts(@Query('page') page: number = 1) {
    return await this.productService.paginate(page);
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    return product;
  }

  @Get('/cookie/:id')
  async getCookie(@Param('id') id: string, @Req() req, @Res() res) {
    const cookieName = `viewed_product_${id}`;
    console.log('cookie::::', req.cookies[cookieName]);
    if (!req.cookies[cookieName]) {
      await this.productService.incrementViewCount(id);
      res.cookie(cookieName, 'true', {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // 24시간 동안 유효한 쿠키 설정
    }
  }

  @Post('/write')
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Post('/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async uploadFiles(@UploadedFiles() images): Promise<any> {
    const uploadedImageUrls = [];

    for (const image of images) {
      const filename = `products/${Date.now()}${image.size}.webp`;
      const file = this.storageBucket.file(filename);
      const stream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      stream.write(image.buffer);
      stream.end();

      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        this.storageBucket.name
      }/o/${encodeURIComponent(filename)}?alt=media`;
      uploadedImageUrls.push(publicUrl);
    }

    return { imageUrls: uploadedImageUrls };
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(@Param('id') id: any, @Body() product: any) {
    return this.productService.updateProduct(id, product);
  }

  @Post('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param() id: any) {
    return this.productService.deleteProduct(id?.id);
  }

  @Post('/like/:id')
  @UseGuards(JwtAuthGuard)
  like(@Body() body, @Param('id') productId: string) {
    console.log('body.userId', body.userId);
    return this.likeService.like(body.userId, productId);
  }

  @Post('/unlike/:id')
  @UseGuards(JwtAuthGuard)
  unlike(@Body() body, @Param('id') productId: string) {
    return this.likeService.unlike(body.userId, productId);
  }
}
