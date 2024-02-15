import { PartialType } from '@nestjs/mapped-types';
import { CreateStackDto } from './create-stack.dto';

export class UpdateStackDto extends PartialType(CreateStackDto) {}
