import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { NoteEntity } from '../entities/note.entity';
import {
  ACTIVE_ID,
  INACTIVE_ID,
} from '../../../common/constants/status.constant';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const note = this.noteRepository.create({
        ...createNoteDto,
        user: { id: createNoteDto.user },
        status: { id: createNoteDto.status },
      });
      const noteCreated = await this.noteRepository.save(note);
      return noteCreated;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const notes = await this.noteRepository
        .createQueryBuilder('note')
        .select(['note.id', 'note.title', 'note.content'])
        .where('note.status = :noteStatus', { noteStatus: ACTIVE_ID })
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
        .andWhere('note.status = :noteStatus', { noteStatus: ACTIVE_ID })
        .andWhere('user.status = :userStatus', { userStatus: ACTIVE_ID })
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
        .andWhere('status = :noteStatus', { noteStatus: ACTIVE_ID })
        .execute();

      if (note.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return note;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(noteId: string) {
    try {
      const note = await this.noteRepository
        .createQueryBuilder()
        .update()
        .set({ status: { id: INACTIVE_ID } })
        .where('id = :noteId', { noteId })
        .andWhere('status = :noteStatus', { noteStatus: ACTIVE_ID })
        .execute();

      if (note.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Could not be deleted',
        });
      }

      return note;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}