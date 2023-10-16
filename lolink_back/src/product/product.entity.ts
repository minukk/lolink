import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Trade } from './trade.entity';
import { Hashtag } from 'src/hashtag/hashtag.entity';
import { Like } from 'src/like/like.entity';

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

  @OneToOne(() => Trade, (trade) => trade.productId)
  trade: Trade;

  @Column('text', { nullable: true })
  imageUrls: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Like, (like) => like.product)
  likes: Like[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.products, { cascade: true })
  @JoinTable({ name: 'product_hashtag' })
  hashtags: Hashtag[];
}
