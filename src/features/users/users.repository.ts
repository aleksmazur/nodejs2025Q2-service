import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';

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
export class InMemoryUsersRepository extends UsersRepository {
  private readonly users: IUser[] = [];

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const now = Date.now();
    const newUser: IUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser | null> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return null;
    }

    const user = this.users[userIndex];
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }
}
