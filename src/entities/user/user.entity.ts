import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Index({ unique: true })
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { name: 'full_name', nullable: true })
  fullName: string;

  @Column('varchar', { nullable: false })
  password: string;
}
