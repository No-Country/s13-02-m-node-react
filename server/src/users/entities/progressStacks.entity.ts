import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersEntity } from './user.entity';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ProgressThemesEntity } from '../../themes/entities/progressTheme.entity';

@Entity({ name: 'progress_stacks' })
export class ProgressStacksEntity extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => UsersEntity, (user) => user.stacks)
  user: UsersEntity;

  @ManyToOne(() => StacksEntity, (stack) => stack.id)
  stack: StacksEntity;

  @ManyToOne(() => ProgressThemesEntity, (progress) => progress.id, {
    cascade: true,
  })
  themes: ProgressThemesEntity[];
}
