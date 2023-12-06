import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly content!: string;

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  user!: string;
}
