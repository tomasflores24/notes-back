import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from '../entities/user.entity';
import { ErrorManager } from '../../../utils/error.manager';
import { statusId } from 'src/common/constants/status.constant';
import { roleId } from 'src/common/constants/roles.constant';
import { IUserService } from '../interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await argon2.hash(createUserDto.password, {
        secret: Buffer.from(process.env.HASH),
      });

      const user = this.userRepository.create({
        ...createUserDto,
        status: { id: statusId.ACTIVE },
        role: { id: roleId.BASIC },
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
        .leftJoin('u.role', 'r')
        .addSelect('r.name')
        .where('u.id = :userId', { userId })
        .andWhere('u.status = :userStatus', { userStatus: statusId.ACTIVE })
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

  async findBy(email: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('u')
        .where('u.email = :userEmail', { userEmail: email })
        .andWhere('u.status = :userStatus', { userStatus: statusId.ACTIVE })
        .getOne();

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
