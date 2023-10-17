import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { UserService } from 'src/user/user.service';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private userService: UserService,
    private hashtagService: HashtagService,
  ) {}

  async paginate(page: number = 1) {
    const take = 8;

    const [products, total] = await this.productRepository.findAndCount({
      where: { show: true },
      order: {
        createdAt: 'DESC',
      },
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
    const user = await this.userService.getUserEmail(_product.email);
    const hashtags = await this.hashtagService.createHashtag(_product.hashtags);

    const product = {
      userId: user.id,
      nickname: user.nickname,
      title: _product.title,
      body: _product.body,
      price: _product.price,
      category: _product.category,
      location: _product.location,
      location_detail: _product.location_detail,
      imageUrls: _product.imageUrls,
      hashtags: hashtags,
    };

    return this.productRepository.save(product);
  }

  async getProducts() {
    return await this.productRepository.find({ where: { show: true } });
  }

  async incrementViewCount(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    product.views += 1;
    await this.productRepository.save(product);
  }

  async getProduct(id) {
    const result = await this.productRepository.findOne({
      where: { id },
      relations: ['hashtags'],
    });

    console.log('result: ', result);

    return result;
  }

  async updateProduct(id, _product) {
    const product: Product = await this.getProduct(id);
    const hashtags = await this.hashtagService.createHashtag(_product.hashtags);

    product.title = _product.title;
    product.body = _product.body;
    product.price = _product.price;
    product.location = _product.location;
    product.location_detail = _product.location_detail;
    product.imageUrls = _product.imageUrls;
    product.category = _product.category;
    product.hashtags = hashtags;

    this.productRepository.save(product);
  }

  async deleteProduct(id) {
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    const product = await this.getProduct(id);

    product.show = false;
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.productRepository.save(product);
  }
}
