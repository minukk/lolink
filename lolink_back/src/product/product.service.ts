import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product.entity';
import { UserService } from 'src/user/user.service';
import { uuidToBuffer } from 'util/transUUID';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private userService: UserService,
  ) {}

  async paginate(page: number = 1) {
    const take = 10;

    const [products, total] = await this.productRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: products,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(_product) {
    const user = await this.userService.getUser(_product.email);

    const product = {
      id: uuidToBuffer(uuid()),
      userId: user.id,
      title: _product.title,
      body: _product.body,
      location: _product.location,
    };

    return this.productRepository.save(product);
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProduct(id) {
    const result = await this.productRepository.findOne({
      where: { id },
    });
    return result;
  }

  async updateProduct(id, _product) {
    const product: Product = await this.getProduct(id);

    product.title = _product.title;
    product.body = _product.body;
    // product.hash = _product.hash;
    product.imageUrls = _product.imageUrls;

    this.productRepository.save(product);
  }

  async deleteProduct(id) {
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.productRepository.delete({ id });
  }
}
