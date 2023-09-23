import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRating, UserRole } from 'common/Enums';
import { Post } from 'src/post/post.entity';
import { Product } from 'src/product/product.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity('users')
export class User {
  @PrimaryColumn('binary', { length: 16 })
  id: Buffer;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ length: 200, nullable: true })
  password: string;

  @Column({ unique: true, length: 20 })
  nickname: string;

  @Column({ unique: true, length: 11, nullable: true })
  phone: string;

  @Column({ default: 0 })
  point?: number;

  @Column({ nullable: true })
  providerId: string;

  @Column()
  platform: string;

  @Column({ type: 'enum', enum: UserRating, default: UserRating.UNRANKED })
  rating: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
