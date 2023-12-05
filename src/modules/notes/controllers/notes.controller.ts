import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto, UpdateNoteDto } from '../dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { AdminAccess } from 'src/modules/decorators/admin.decorator';

@Controller('notes')
@UseGuards(AuthGuard, RolesGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    const message = this.notesService.create(createNoteDto);
    return { message };
  }

  @Get()
  @AdminAccess()
  findAll() {
    const notes = this.notesService.findAll();
    return { notes };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const note = this.notesService.findOne(id);
    return { note };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const message = this.notesService.update(id, updateNoteDto);
    return { message };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const message = this.notesService.remove(id);
    return { message };
  }
}
