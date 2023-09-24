import { Post } from 'src/post/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hashtag } from './hashtag.entity';

@Entity('hashtags')
export class PostHashtag {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  postId: number;

  @Column()
  hashtagId: number;

  @ManyToOne(() => Post, (post) => post.hash)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Hashtag, (hashtag) => hashtag.id)
  @JoinColumn({ name: 'hashtagId' })
  hashtag: Hashtag;
}
