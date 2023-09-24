import { ProductHashtag } from '../hashtag/productHashtag.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ nullable: true })
  hash: string;

  @OneToMany(() => ProductHashtag, (hash) => hash.product)
  @JoinColumn({ name: 'hastagId' })
  productHashtag: ProductHashtag;

  @Column('text', { nullable: true })
  imageUrls: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
