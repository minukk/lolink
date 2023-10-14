import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserRating, UserRole } from 'common/Enums';
import { Post } from 'src/post/post.entity';
import { Product } from 'src/product/product.entity';
import { Comment } from 'src/comment/comment.entity';
import { Betting } from 'src/toto/betting.entity';
import { Recommend } from 'src/recommend/recommend.entity';

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

  @OneToOne(() => Recommend, (recommend) => recommend.userId)
  recommend: Recommend;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Betting, (betting) => betting.user)
  betting: Betting;
}
