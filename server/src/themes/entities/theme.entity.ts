import { BaseEntity } from '../../config/base.entity';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ITheme } from '../../types/interfaces/theme.interface';
import { LEVELS } from '../../config/constants/levels';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity({ name: 'themes' })
@Unique(['name', 'stack'])
export class ThemesEntity extends BaseEntity implements ITheme {
  @Column({ nullable: false })
  name: string;
  @Column({ type: 'enum', enum: LEVELS, default: LEVELS.DEBUTANT })
  level: LEVELS;
  @Column({ default: 100 })
  points: number;
  @Column({ nullable: false })
  order: number;
  @ManyToOne(() => StacksEntity)
  @JoinColumn({ name: 'stack_id' })
  stack: StacksEntity;
}
