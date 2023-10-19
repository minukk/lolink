import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity('recommends')
export class Recommend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recommend)
  user: User;

  @ManyToOne(() => Post, (post) => post.recommend)
  post: Post;

  @Column({ type: 'enum', enum: ['recommend', 'not_recommend'] })
  type: 'recommend' | 'not_recommend';
}
