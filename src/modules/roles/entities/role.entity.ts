import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { IEntity } from '../../../common/interfaces';
import { ROLES } from '../../../common/enums/role.enum';

@Entity({ name: 'roles' })
export class RoleEntity implements IEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: ROLES })
  name: ROLES;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
