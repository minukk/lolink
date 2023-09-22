import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ length: 200, nullable: true })
  password: string;

  @Column({ unique: true, length: 20 })
  nickname: string;

  @Column({ unique: true, length: 11, nullable: true })
  phone: string;

  @Column({ default: 0 })
  point?: number;

  @Column({ nullable: true })
  providerId: string;

  @Column()
  platform: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
