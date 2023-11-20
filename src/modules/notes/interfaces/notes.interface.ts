import { UpdateResult } from 'typeorm';
import { NoteEntity } from '../entities/note.entity';
import { CreateNoteDto, UpdateNoteDto } from '../dto';

export interface INoteService {
  create(createNoteDto: CreateNoteDto): Promise<NoteEntity>;

  findAll(): Promise<NoteEntity[]>;

  findOne(noteId: string): Promise<NoteEntity>;

  update(noteId: string, updateNoteDto: UpdateNoteDto): Promise<UpdateResult>;

  remove(noteId: string): Promise<UpdateResult>;
}
