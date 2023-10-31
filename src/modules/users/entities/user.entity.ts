import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StatusEntity } from '../../status/entitities/status.entity';
import { IUser } from '../../../common/interfaces/user.interface';
import { BaseEntity } from '../../../common/base-entities/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
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
