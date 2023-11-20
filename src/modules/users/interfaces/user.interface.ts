import { UpdateResult } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;

  findAll(): Promise<UserEntity[]>;

  findOne(userId: string): Promise<UserEntity>;

  findBy(email: string): Promise<UserEntity>;

  update(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;

  remove(userId: string): Promise<UpdateResult>;
}
