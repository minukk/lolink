import { ProductHashtag } from '../hashtag/productHashtag.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Trade } from './trade.entity';

@Entity('products')
export class Product {
  @PrimaryColumn('binary', { length: 16 })
  id: Buffer;

  @Column({ type: 'binary', length: 16 })
  userId: Buffer;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  like: number;

  @Column()
  location: string;

  @Column({ default: 0 })
  views: number;

  @Column()
  category: string;

  @OneToMany(() => ProductHashtag, (hash) => hash.product)
  @JoinColumn({ name: 'hastagId' })
  productHashtag: ProductHashtag;

  @OneToOne(() => Trade, (trade) => trade.productId)
  trade: Trade;

  @Column('text', { nullable: true })
  imageUrls: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
