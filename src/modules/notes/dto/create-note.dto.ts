import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @IsNotEmpty()
  @IsString()
  readonly content!: string;

  @IsNotEmpty()
  @IsNumber()
  status!: number;

  @IsUUID('4')
  @IsNotEmpty()
  user!: string;
}
