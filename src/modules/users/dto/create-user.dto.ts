import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
