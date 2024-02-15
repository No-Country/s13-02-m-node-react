import { BaseEntity } from '../../config/base.entity';
import { ThemesEntity } from '../../themes/entities/theme.entity';
import { IStack } from '../../types/stack.interface';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'stacks' })
export class StacksEntity extends BaseEntity implements IStack {
  @Column({ unique: true, nullable: false })
  name: string;
  @Column()
  points: number;
  @OneToMany(() => ThemesEntity, (theme) => theme.stack)
  themes: ThemesEntity[];
}
