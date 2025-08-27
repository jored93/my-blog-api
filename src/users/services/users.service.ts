import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['profile'] });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.findOne(id);
    return user;
  }

  async create(body: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.save(body);
    return this.usersRepository.save(newUser);
  }

  async update(id: string, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const updatedUser = this.usersRepository.merge(user, changes);
      const savedUser = await this.usersRepository.save(updatedUser);
      return savedUser;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return { message: `User with id ${id} deleted successfully` };
  }

  async getPostsByUserId(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user.posts;
  }

  private async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['profile'] });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
