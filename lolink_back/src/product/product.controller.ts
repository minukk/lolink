import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(@Query('page') page: number = 1) {
    return await this.productService.paginate(page);
  }

  @Get('/:id')
  async getProduct(@Param() id: string) {
    return await this.productService.getProduct(id);
  }

  @Post('/write')
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Patch('/:id')
  async updateProduct(@Param() id: string, @Body() product: any) {
    return this.productService.updateProduct(id, product);
  }

  @Post('/delete/:id')
  async deleteProduct(@Param() id: string) {
    return this.productService.deleteProduct(id);
  }
}
