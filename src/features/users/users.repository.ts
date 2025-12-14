import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<IUser>;
  abstract findAll(): Promise<IUser[]>;
  abstract findById(id: string): Promise<IUser | null>;
  abstract updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser | null>;
  abstract delete(id: string): Promise<void>;
}

@Injectable()
export class TypeOrmUsersRepository extends UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const user = this.userRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
    });
    const savedUser = await this.userRepository.save(user);
    return {
      id: savedUser.id,
      login: savedUser.login,
      password: savedUser.password,
      version: savedUser.version,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      login: user.login,
      password: user.password,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      login: user.login,
      password: user.password,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    user.password = updatePasswordDto.newPassword;
    const savedUser = await this.userRepository.save(user);
    return {
      id: savedUser.id,
      login: savedUser.login,
      password: savedUser.password,
      version: savedUser.version,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
