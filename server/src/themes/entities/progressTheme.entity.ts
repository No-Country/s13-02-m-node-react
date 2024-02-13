import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ThemesEntity } from './theme.entity';
import { ProgressStacksEntity } from '../../users/entities/progressStacks.entity';

@Entity({ name: 'progress_themes' })
export class ProgressThemesEntity extends BaseEntity {
  @Column({ default: 0 })
  progressStack: number;

  @ManyToOne(() => ThemesEntity, (theme) => theme.id)
  theme: ThemesEntity;

  @ManyToOne(() => ProgressStacksEntity, (stack) => stack.id)
  stack: ProgressStacksEntity;
}
