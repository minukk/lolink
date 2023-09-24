import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Betting } from './betting.entity';

@Entity('totos')
export class Toto {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content: string;

  @Column()
  point: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  endAt: Date;

  @Column({ type: 'timestamp' })
  finishAt: Date;

  @OneToMany(() => Betting, (betting) => betting.user)
  betting: Betting;
}
