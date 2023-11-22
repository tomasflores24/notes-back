import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { STATUS } from '../../../common/enums/status.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { IEntity } from '../../../common/interfaces';
import { NoteEntity } from '../../../modules/notes/entities/note.entity';

@Entity({ name: 'status' })
export class StatusEntity implements IEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: STATUS })
  name: STATUS;

  @OneToMany(() => UserEntity, (user) => user.status)
  users: UserEntity[];

  @OneToMany(() => NoteEntity, (note) => note.status)
  notes: NoteEntity[];
}
