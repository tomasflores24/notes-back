import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { ErrorManager } from '../../../utils/error.manager';
import {
  ACTIVE_ID,
  INACTIVE_ID,
} from '../../../common/constants/status.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        status: { id: createUserDto.status },
      });
      const userCreated = await this.userRepository.save(user);
      return userCreated;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.name', 'user.email'])
        .leftJoin('user.status', 'status', 'status.id = user.status')
        .where('user.status = :userStatus', { userStatus: ACTIVE_ID })
        .getMany();

      if (!users.length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Users not found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.name', 'user.email', 'user.password'])
        .where('id = :userId', { userId })
        .andWhere('user.status = :userStatus', { userStatus: ACTIVE_ID })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set(updateUserDto)
        .where('id = :userId', { userId })
        .andWhere('status = :userStatus', { userStatus: ACTIVE_ID })
        .execute();

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update user',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(userId: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .update()
        .set({ status: { id: INACTIVE_ID } })
        .where('id = :userId', { userId })
        .andWhere('status = :userStatus', { userStatus: ACTIVE_ID })
        .execute();

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Could not be deleted',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
