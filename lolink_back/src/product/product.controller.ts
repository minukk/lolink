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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import * as serviceAccountJson from '../../lolink_dev_service_account_key.json';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikeService } from 'src/like/like.service';

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
  async getProduct(@Param() id: any) {
    return await this.productService.getProduct(id?.id);
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

  // @Post('/images')
  // @UseInterceptors(
  //   FilesInterceptor('images', 10, {
  //     storage: diskStorage({
  //       destination: './uploads', // 저장할 위치
  //       filename: (req, file, callback) => {
  //         const name =
  //           path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
  //         const extension = path.extname(file.originalname);
  //         callback(null, `${name}${extension}.webp`);
  //       },
  //     }),
  //   }),
  // )
  // uploadFiles(@UploadedFiles() images, @Request() req: any): any {
  //   const imageUrls = images.map((image: any) => {
  //     return `${req.protocol}://${req.get('host')}/uploads/${image.filename}`;
  //   });
  //   console.log(imageUrls);

  //   return { imageUrls };
  // }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(@Param() id: any, @Body() product: any) {
    return this.productService.updateProduct(id?.id, product);
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
