import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserRating, UserRole } from '../common/enums';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';
import { Comment } from '../comment/comment.entity';
import { Betting } from '../sports/betting.entity';
import { Recommend } from '../recommend/recommend.entity';
import { Like } from '../like/like.entity';

@Entity('users')
export class User {
  constructor() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ default: false })
  certification: boolean;

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

  @OneToMany(() => Betting, (betting) => betting.user)
  betting: Betting;

  @OneToMany(() => Recommend, (recommend) => recommend.user, { cascade: true })
  recommend: Recommend[];

  @OneToMany(() => Like, (like) => like.user, { cascade: true, eager: true })
  likes: Like[];
}
