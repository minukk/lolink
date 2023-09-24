import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Message {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  message: string;

  @Column()
  receiverId: number;

  @Column()
  callerId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'callerId' })
  caller: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
