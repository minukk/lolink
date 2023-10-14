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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Trade } from './trade.entity';

@Entity('products')
export class Product {
  constructor() {
    this.id = uuidv4();
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  nickname: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  like: number;

  @Column()
  location: string;

  @Column()
  location_detail: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: true })
  show: boolean;

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
