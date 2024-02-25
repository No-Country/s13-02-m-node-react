import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ThemesEntity } from './theme.entity';
import { ProgressStacksEntity } from '../../users/entities/progressStacks.entity';

@Entity({ name: 'progress_themes' })
export class ProgressThemesEntity extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => ThemesEntity)
  @JoinColumn({ name: 'theme' })
  theme: string;

  @ManyToOne(() => ProgressStacksEntity)
  @JoinColumn({ name: 'stack' })
  stack: string;
}
