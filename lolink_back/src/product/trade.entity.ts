import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('trades')
export class Trade {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  buyerId: Buffer;

  @Column()
  sellerId: Buffer;

  @Column()
  productId: number;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
