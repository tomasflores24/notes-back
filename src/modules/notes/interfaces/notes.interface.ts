import { NoteEntity } from '../entities/note.entity';
import { CreateNoteDto, UpdateNoteDto } from '../dto';

export interface INoteService {
  create(createNoteDto: CreateNoteDto): Promise<string>;

  findAll(): Promise<NoteEntity[]>;

  findOne(noteId: string): Promise<NoteEntity>;

  update(noteId: string, updateNoteDto: UpdateNoteDto): Promise<string>;

  remove(noteId: string): Promise<string>;
}
