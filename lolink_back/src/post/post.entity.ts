import { Comment } from 'src/comment/comment.entity';
import { PostHashtag } from '../hashtag/postHashtag.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ type: 'binary', length: 16 })
  userId: Buffer;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  recommend: number;

  @Column({ default: 0 })
  views: number;

  @Column()
  category: string;

  @OneToMany(() => PostHashtag, (hash) => hash.post)
  @JoinColumn({ name: 'hastagId' })
  postHashtag: PostHashtag;

  @Column('text', { nullable: true })
  imageUrls: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment;
}
