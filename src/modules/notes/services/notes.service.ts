import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ErrorManager } from '../../../utils/error.manager';
import { NoteEntity } from '../entities/note.entity';
import { statusId } from 'src/common/constants/status.constant';
import { INoteService } from '../interfaces/notes.interface';
import { CreateNoteDto, UpdateNoteDto } from '../dto';

@Injectable()
export class NotesService implements INoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const note = this.noteRepository.create({
        ...createNoteDto,
        user: { id: createNoteDto.user },
        status: { id: statusId.ACTIVE },
      });
      await this.noteRepository.save(note);
      return 'Note created';
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const notes = await this.noteRepository
        .createQueryBuilder('note')
        .select(['note.id', 'note.title', 'note.content'])
        .where('note.status = :noteStatus', { noteStatus: statusId.ACTIVE })
        .getMany();

      if (notes.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Notes not found',
        });
      }
      return notes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(noteId: string) {
    try {
      const note = await this.noteRepository
        .createQueryBuilder('note')
        .leftJoinAndSelect('note.user', 'user')
        .select(['note.id', 'note.title', 'note.content'])
        .addSelect(['user.id', 'user.name'])
        .where('note.id = :id', { id: noteId })
        .andWhere('note.status = :noteStatus', { noteStatus: statusId.ACTIVE })
        .andWhere('user.status = :userStatus', { userStatus: statusId.ACTIVE })
        .getOne();

      if (!note) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'note not found',
        });
      }
      return note;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(noteId: string, updateNoteDto: UpdateNoteDto) {
    try {
      const note = await this.noteRepository
        .createQueryBuilder('note')
        .update()
        .set(updateNoteDto)
        .where('id = :noteId', { noteId })
        .andWhere('status = :noteStatus', { noteStatus: statusId.ACTIVE })
        .execute();

      if (note.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Could not update',
        });
      }
      return 'Updated note';
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(noteId: string) {
    try {
      const note = await this.noteRepository
        .createQueryBuilder()
        .update()
        .set({ status: { id: statusId.INACTIVE } })
        .where('id = :noteId', { noteId })
        .andWhere('status = :noteStatus', { noteStatus: statusId.ACTIVE })
        .execute();

      if (note.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Could not be deleted',
        });
      }

      return 'Note deleted';
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
