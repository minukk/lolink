import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Toto } from './sports.entity';
import { User } from '../user/user.entity';

@Entity('bettings')
export class Betting {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  totoId: number;

  @Column()
  userId: Buffer;

  @ManyToOne(() => Toto, (toto) => toto.id)
  @JoinColumn({ name: 'totoId' })
  toto: Toto;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}
