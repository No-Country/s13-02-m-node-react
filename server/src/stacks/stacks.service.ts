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

  create(createStackDto: CreateStackDto) {
    return 'This action adds a new stack';
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
