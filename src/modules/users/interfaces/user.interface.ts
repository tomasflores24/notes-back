import { UserEntity } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<string>;

  findAll(): Promise<UserEntity[]>;

  findOne(userId: string): Promise<UserEntity>;

  findBy(email: string): Promise<UserEntity>;

  update(userId: string, updateUserDto: UpdateUserDto): Promise<string>;

  remove(userId: string): Promise<string>;
}
