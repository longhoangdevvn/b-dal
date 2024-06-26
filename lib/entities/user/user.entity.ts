import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { name: 'full_name', nullable: true })
  fullName: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column('varchar', { nullable: true })
  avatar: string;
}
