import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from './user.entity';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ProgressThemesEntity } from '../../themes/entities/progressTheme.entity';

@Entity({ name: 'progress_stacks' })
export class ProgressStacksEntity extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user' })
  user: string;

  @ManyToOne(() => StacksEntity)
  @JoinColumn({ name: 'stack' })
  stack: string;

  // @ManyToOne(() => ProgressThemesEntity, (progress) => progress.id, {
  //   cascade: true,
  // })
  // themes: ProgressThemesEntity[];
  @ManyToOne(() => ProgressThemesEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'themes' })
  themes: string[];
}
