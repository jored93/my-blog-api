import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { PostsService } from '../services/posts.service';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { Payload } from 'src/auth/models/payload.model';
import { Post as PostEntity } from '../entities/post.entity';

//@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postsService.create(createPostDto, userId);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'The list of posts' })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiResponse({ status: 200, description: 'The post', type: PostEntity })
  @ApiOperation({ summary: 'Get a post by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a post by id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  /* @ApiOperation({ summary: 'Publish a post by id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/publish')
  publish(@Param('id') id: string, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postsService.publish(id, userId);
  } */

  @ApiOperation({ summary: 'Delete a post by id' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
