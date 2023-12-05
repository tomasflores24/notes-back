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
    const message = this.usersService.create(createUserDto);
    return { message };
  }

  @Get()
  @AdminAccess()
  findAll() {
    const users = this.usersService.findAll();
    return { users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    return { user };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const message = this.usersService.update(id, updateUserDto);
    return { message };
  }

  @Delete(':id')
  @AdminAccess()
  remove(@Param('id') id: string) {
    const message = this.usersService.remove(id);
    return { message };
  }
}
