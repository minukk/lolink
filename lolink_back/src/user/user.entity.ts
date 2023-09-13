import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @Column({ length: 11 })
  phone: string;
}
