import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { INote } from '../../../common/interfaces/note.interface';
import { BaseEntity } from '../../../common/base-entities/base.entity';
import { StatusEntity } from '../../../modules/status/entitities/status.entity';
import { UserEntity } from '../../../modules/users/entities/user.entity';

@Entity({ name: 'notes' })
export class NoteEntity extends BaseEntity implements INote {
  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => StatusEntity, (status) => status.notes)
  @JoinColumn({ name: 'status' })
  status!: StatusEntity;

  @ManyToOne(() => UserEntity, (user) => user.notes)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
