import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env.model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getAllUsers() {
    /* const appName = this.configService.get('APP_NAME', { infer: true });
    console.log(`Application Name: ${appName}`); */
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return await this.usersService.delete(id);
  }

  @Get(':id/posts')
  getPosts(@Param('id') id: string) {
    return this.usersService.getPostsByUserId(id);
  }
}
