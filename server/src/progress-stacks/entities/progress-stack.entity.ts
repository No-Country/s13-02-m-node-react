import { BaseEntity } from '../../config/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ProgressThemesEntity } from '../../themes/entities/progressTheme.entity';
import { UsersEntity } from '../../users/entities/user.entity';

@Entity({ name: 'progress_stacks' })
@Unique(['stack', 'user'])
export class ProgressStacksEntity extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  // En ThemesEntity
  @ManyToOne(() => UsersEntity, (user) => user.stacks, { onDelete: 'CASCADE' })
  user: UsersEntity;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => StacksEntity)
  stack: StacksEntity;

  @Column({ nullable: true })
  stackId: string;

  // @OneToMany(() => ProgressThemesEntity, (themes) => themes.stack)
  // @JoinColumn({ name: 'themes' })
  // themes: ProgressThemesEntity[];
  @OneToMany(
    () => ProgressThemesEntity,
    (progressThemes) => progressThemes.progressStack,
  )
  @JoinColumn()
  themes: ProgressThemesEntity[];
}
