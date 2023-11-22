import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { NoteEntity } from './entities/note.entity';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity]), UsersModule],
  controllers: [NotesController],
  providers: [NotesService, UsersService],
})
export class NotesModule {}
