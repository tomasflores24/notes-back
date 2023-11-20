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
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PublicAccess } from 'src/modules/decorators/public.decorator';
import { AdminAccess } from 'src/modules/decorators/admin.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @PublicAccess()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @AdminAccess()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @AdminAccess()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
