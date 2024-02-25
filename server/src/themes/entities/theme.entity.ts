import { BaseEntity } from '../../config/base.entity';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ITheme } from '../../types/interfaces/theme.interface';
import { LEVELS } from '../../config/constants/levels';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity({ name: 'themes' })
@Unique(['name', 'level', 'stack'])
export class ThemesEntity extends BaseEntity implements ITheme {
  @Column({ nullable: false })
  name: string;
  @Column({ type: 'enum', enum: LEVELS, default: LEVELS.DEBUTANT })
  level: LEVELS;
  @Column({ nullable: true, default: true })
  description?: string;
  @Column({ default: 100 })
  points: number;
  @Column({ nullable: false })
  order: number;
  @Column({ nullable: true })
  stackId: string;

  @ManyToOne(() => StacksEntity)
  @JoinColumn()
  stack: StacksEntity;
}
