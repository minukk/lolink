import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('hashtags')
export class Hashtag {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  tag: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
