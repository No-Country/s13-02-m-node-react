import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { ThemesEntity } from './theme.entity';
import { ProgressStacksEntity } from '../../users/entities/progressStacks.entity';

@Entity({ name: 'progress_themes' })
@Unique(['themeId', 'progressStackId'])
export class ProgressThemesEntity extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => ThemesEntity)
  theme: ThemesEntity;

  @Column({ nullable: true })
  themeId: string;

  @ManyToOne(
    () => ProgressStacksEntity,
    (progressStack) => progressStack.themes,
    {
      onDelete: 'CASCADE',
    },
  )
  progressStack: ProgressStacksEntity;

  @Column({ nullable: true })
  progressStackId: string;
}
