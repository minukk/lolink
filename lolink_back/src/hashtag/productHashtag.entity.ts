// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Hashtag } from './hashtag.entity';
// import { Product } from 'src/product/product.entity';

// @Entity('hashtags')
// export class ProductHashtag {
//   @PrimaryGeneratedColumn()
//   id?: number;

//   @Column()
//   productId: number;

//   @Column()
//   hashtagId: number;

//   @ManyToOne(() => Product, (product) => product.id)
//   @JoinColumn({ name: 'productId' })
//   product: Product;
// //
//   @ManyToOne(() => Hashtag, (hashtag) => hashtag.id)
//   @JoinColumn({ name: 'hashtagId' })
//   hashtag: Hashtag;
// }
