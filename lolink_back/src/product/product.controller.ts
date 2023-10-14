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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import * as path from 'path';
import * as admin from 'firebase-admin';
import * as serviceAccountJson from '../../lolink_dev_service_account_key.json';

const serviceAccount = serviceAccountJson as admin.ServiceAccount;

@Controller('product')
export class ProductController {
  private storageBucket: any;

  constructor(private productService: ProductService) {
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
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Post('/images')
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
  async updateProduct(@Param() id: any, @Body() product: any) {
    return this.productService.updateProduct(id?.id, product);
  }

  @Post('/delete/:id')
  async deleteProduct(@Param() id: any) {
    return this.productService.deleteProduct(id?.id);
  }
}
