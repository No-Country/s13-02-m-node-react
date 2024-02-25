import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { ThemesEntity } from './theme.entity';
import { ProgressStacksEntity } from '../../users/entities/progressStacks.entity';

@Entity({ name: 'progress_themes' })
@Unique(['theme', 'stack'])
export class ProgressThemesEntity extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => ThemesEntity)
  @JoinColumn()
  theme: ThemesEntity;

  @ManyToOne(() => ProgressStacksEntity)
  @JoinColumn()
  stack: ProgressStacksEntity;

  @Column({ nullable: true })
  stackId: number;
}
