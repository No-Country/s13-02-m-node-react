import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { StacksEntity } from './entities/stack.entity';

@Injectable()
export class StacksService {
  constructor(
    @InjectRepository(StacksEntity)
    private stackRepository: Repository<StacksEntity>,
  ) {}

  async create(createStackDto: CreateStackDto) {
    createStackDto.name = createStackDto.name.toLocaleLowerCase();

    try {
      const stack = this.stackRepository.create(createStackDto);
      await this.stackRepository.save(stack);
      return stack;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating stack');
    }
  }

  async findAll() {
    return await this.stackRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} stack`;
  }

  update(id: number, updateStackDto: UpdateStackDto) {
    return `This action updates a #${id} stack`;
  }

  remove(id: number) {
    return `This action removes a #${id} stack`;
  }
}
