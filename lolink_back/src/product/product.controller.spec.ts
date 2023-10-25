import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { LikeService } from '../like/like.service';
import { Product } from './product.entity';
import * as admin from 'firebase-admin';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;
  let likeService: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            paginate: jest.fn(),
            getProduct: jest.fn(),
            create: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
            incrementViewCount: jest.fn(),
          },
        },
        {
          provide: LikeService,
          useValue: {
            like: jest.fn(),
            unlike: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    likeService = module.get<LikeService>(LikeService);

    jest.spyOn(admin, 'initializeApp').mockReturnValueOnce(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return products', async () => {
      const page = 1;
      const product = new Product();
      const products = {
        data: [product],
        meta: {
          total: 10,
          page: 1,
          last_page: 1,
        },
      };
      jest.spyOn(productService, 'paginate').mockResolvedValueOnce(products);

      const result = await controller.getProducts(page);

      expect(productService.paginate).toHaveBeenCalledWith(page);
      expect(result).toEqual(products);
    });
  });

  describe('getProduct', () => {
    it('should return a product', async () => {
      const id = '1';
      const product = new Product();
      product.id = '1';
      jest.spyOn(productService, 'getProduct').mockResolvedValueOnce(product);

      await controller.getProduct(id);

      expect(productService.getProduct).toHaveBeenCalledWith(id);
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      // given
      const newProduct = new Product();
      const product = {
        userId: 'abc',
        nickname: 'test',
        title: 'testproduct',
        body: 'testbody',
        price: 1000,
        category: 'testcategory',
        location: 'testlocation',
        location_detail: 'testlocation_detail',
        imageUrls: 'testimageurl',
        hashtags: [{ hashtags: 'testhashtag' }],
        hash: 'testhashtag',
      };
      const createdProduct = { ...newProduct, userId: 'abc' };
      jest
        .spyOn(productService, 'create')
        .mockResolvedValueOnce(createdProduct);

      // when
      const result = await controller.createProduct(product);

      // then
      expect(productService.create).toHaveBeenCalledWith(product);
      expect(result).toEqual(createdProduct);
    });
  });

  // describe('uploadFiles', () => {
  //   it('should upload files', async () => {
  //     const images = [
  //       {
  //         buffer: Buffer.from('testimage1'),
  //         mimetype: 'image/jpeg',
  //         size: 100,
  //       },
  //       {
  //         buffer: Buffer.from('testimage2'),
  //         mimetype: 'image/jpeg',
  //         size: 200,
  //       },
  //     ];
  //     const uploadedImageUrls = [
  //       'https://firebasestorage.googleapis.com/v0/b/testbucket/o/testfilename1?alt=media',
  //       'https://firebasestorage.googleapis.com/v0/b/testbucket/o/testfilename2?alt=media',
  //     ];
  //     jest.spyOn(controller['storageBucket'], 'file').mockReturnValueOnce({
  //       createWriteStream: jest.fn().mockReturnValueOnce({
  //         write: jest.fn(),
  //         end: jest.fn(),
  //         on: jest.fn(),
  //       }),
  //     });
  //     jest
  //       .spyOn(controller['storageBucket'], 'name', 'get')
  //       .mockReturnValueOnce('testbucket');

  //     const result = await controller.uploadFiles(images);

  //     expect(result).toEqual({ imageUrls: uploadedImageUrls });
  //   });
  // });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      // given
      const id = 1;
      const newProduct = new Product();
      const product = { ...newProduct, title: 'product' };
      jest
        .spyOn(productService, 'updateProduct')
        .mockResolvedValueOnce(Promise.resolve());

      const result = await controller.updateProduct(id, product);

      expect(productService.updateProduct).toHaveBeenCalledWith(id, product);
      expect(result).toEqual(undefined);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const id = 'abc';
      const newProduct = new Product();
      newProduct.id = 'abc';
      const deletedProduct = {
        ...newProduct,
        id: 'abc',
        title: 'testproduct',
        show: false,
      };
      jest
        .spyOn(productService, 'deleteProduct')
        .mockResolvedValueOnce(deletedProduct);

      const result = await controller.deleteProduct(id);

      expect(productService.deleteProduct).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(deletedProduct);
    });
  });

  describe('like', () => {
    it('should like a product', () => {
      const body = { userId: 2 };
      const productId = '1';
      jest.spyOn(likeService, 'like').mockReturnValueOnce(Promise.resolve());

      const result = controller.like(body, productId);

      expect(likeService.like).toHaveBeenCalledWith(body.userId, productId);
      expect(result).toEqual(Promise.resolve());
    });
  });

  describe('unlike', () => {
    it('should unlike a product', () => {
      const body = { userId: 2 };
      const productId = '1';
      jest.spyOn(likeService, 'unlike').mockReturnValueOnce(Promise.resolve());

      const result = controller.unlike(body, productId);

      expect(likeService.unlike).toHaveBeenCalledWith(body.userId, productId);
      expect(result).toEqual(Promise.resolve());
    });
  });
});
