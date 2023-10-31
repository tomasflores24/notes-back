import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { STATUS } from '../../../constants/enums/status.enum';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'status' })
export class StatusEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: STATUS })
  name: STATUS;

  @OneToMany(() => UserEntity, (user) => user.status)
  users: UserEntity[];
}
