import { Comment } from '../comment/comment.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Recommend } from '../recommend/recommend.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;
  // @PrimaryColumn('binary', { length: 16 })
  // id: Buffer;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  nickname: string;

  @Column({ default: 0 })
  views: number;

  @Column()
  category: string;

  @Column({ default: true })
  show: boolean;

  @Column({ default: 0 })
  recommendCount: number;

  @Column('text', { nullable: true })
  imageUrls: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts, { cascade: true })
  @JoinTable({ name: 'post_hashtag' })
  hashtags: Hashtag[];

  @OneToMany(() => Recommend, (recommend) => recommend.post, { cascade: true })
  recommend: Recommend[];
}
