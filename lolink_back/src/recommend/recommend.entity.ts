import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recommends')
export class Recommend {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: Buffer;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  location: string;

  @Column()
  like: string;

  @Column()
  hobby: string;

  @Column()
  interest: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  favariteCate: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
