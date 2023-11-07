import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { ErrorManager } from '../../../utils/error.manager';
import { statusId } from 'src/common/constants/status.constant';
import { roleId } from 'src/common/constants/roles.constant';

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
        .createQueryBuilder('u')
        .select(['u.id', 'u.name', 'u.email', 'n.id', 'n.title', 'n.content'])
        .leftJoin('u.notes', 'n', 'n.status = :noteStatus', {
          noteStatus: statusId.ACTIVE,
        })
        .where('u.status = :userStatus', { userStatus: statusId.ACTIVE })
        .andWhere('u.roles = :userRole', { userRole: roleId.BASIC })
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
        .createQueryBuilder('u')
        .select(['u.id', 'u.name', 'u.email', 'n.id', 'n.title', 'n.content'])
        .leftJoin('u.notes', 'n', 'n.status = :noteStatus', {
          noteStatus: statusId.ACTIVE,
        })
        .where('u.id = :userId', { userId })
        .andWhere('u.status = :userStatus', { userStatus: statusId.ACTIVE })
        .andWhere('u.roles = :userRole', { userRole: roleId.BASIC })

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
        .andWhere('status = :userStatus', { userStatus: statusId.ACTIVE })
        .andWhere('u.roles = :userRole', { userRole: roleId.BASIC })
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
        .set({ status: { id: statusId.INACTIVE } })
        .where('id = :userId', { userId })
        .andWhere('status = :userStatus', { userStatus: statusId.ACTIVE })
        .andWhere('u.roles = :userRole', { userRole: roleId.BASIC })
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
