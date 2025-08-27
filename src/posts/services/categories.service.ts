import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async create(body: CreateCategoryDto) {
    try {
      const newCategory = await this.categoriesRepository.save(body);
      return this.findOne(newCategory.id);
    } catch {
      throw new BadRequestException('Error creating category');
    }
  }

  async update(id: string, changes: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      const updatedCategory = this.categoriesRepository.merge(category, changes);
      const savedCategory = await this.categoriesRepository.save(updatedCategory);
      return savedCategory;
    } catch {
      throw new BadRequestException('Error updating category');
    }
  }

  async remove(id: string) {
    try {
      await this.categoriesRepository.delete(id);
      return { message: 'Category deleted' };
    } catch {
      throw new BadRequestException('Error deleting category');
    }
  }
}
