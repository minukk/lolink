import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Product, (product) => product.likes)
  product: Product;

  @Column({ type: 'enum', enum: ['like', 'unlike'] }) // 좋아요, 좋아요 취소
  type: 'like' | 'unlike';
}
