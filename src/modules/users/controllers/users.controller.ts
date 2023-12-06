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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PublicAccess } from 'src/modules/auth/decorators/public.decorator';
import { AdminAccess } from 'src/modules/auth/decorators/admin.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { swaggerText } from 'src/common/swagger.text';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ ...swaggerText.user.register })
  @Post()
  @PublicAccess()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ ...swaggerText.user.getAllUsers })
  @Get()
  @AdminAccess()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ ...swaggerText.user.getUserById })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ ...swaggerText.user.updateUser })
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ ...swaggerText.user.deleteUser })
  @Delete(':id')
  @AdminAccess()
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
