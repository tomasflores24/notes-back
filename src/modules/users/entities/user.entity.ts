import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { StatusEntity } from '../../status/entitities/status.entity';
import { IUser } from '../../../common/interfaces';
import { BaseEntity } from '../../../common/base-entities/base.entity';
import { NoteEntity } from '../../../modules/notes/entities/note.entity';
import { RoleEntity } from '../../../modules/roles/entities/role.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @ManyToOne(() => StatusEntity, (status) => status.users)
  @JoinColumn({ name: 'status' })
  status!: StatusEntity;

  @OneToMany(() => NoteEntity, (note) => note.user)
  notes!: NoteEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role' })
  role!: RoleEntity;
}
