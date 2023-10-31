import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEntity } from '../../status/entitities/status.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => StatusEntity, (status) => status.users, {})
  @JoinColumn({ name: 'status' })
  status!: StatusEntity;
}
