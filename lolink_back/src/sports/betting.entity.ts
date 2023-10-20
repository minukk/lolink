import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sports } from './sports.entity';
import { User } from '../user/user.entity';

@Entity('bettings')
export class Betting {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  sportsId: number;

  @Column()
  userId: Buffer;

  @ManyToOne(() => Sports, (sport) => sport.betting)
  @JoinColumn({ name: 'totoId' })
  sports: Sports;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}
