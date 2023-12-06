import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto, UpdateNoteDto } from '../dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { AdminAccess } from 'src/modules/auth/decorators/admin.decorator';
import { swaggerText } from 'src/common/swagger.text';
@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
@UseGuards(AuthGuard, RolesGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ ...swaggerText.note.createNote })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @ApiOperation({ ...swaggerText.note.getAllNotes })
  @Get()
  @AdminAccess()
  findAll() {
    return this.notesService.findAll();
  }

  @ApiOperation({ ...swaggerText.note.getNoteById })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.notesService.findOne(id);
  }

  @ApiOperation({ ...swaggerText.note.updateNote })
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @ApiOperation({ ...swaggerText.note.deleteNote })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.notesService.remove(id);
  }
}
