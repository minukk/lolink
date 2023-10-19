import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';

@Entity('hashtags')
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToMany(() => Post, (post) => post.hashtags)
  posts: Post[];

  @ManyToMany(() => Product, (product) => product.hashtags)
  products: Product[];
}
