import { BaseEntity } from '../../config/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { UsersEntity } from './user.entity';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ProgressThemesEntity } from '../../themes/entities/progressTheme.entity';

@Entity({ name: 'progress_stacks' })
@Unique(['stack', 'user'])
export class ProgressStacksEntity extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  // En ThemesEntity
  @ManyToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => StacksEntity)
  @JoinColumn()
  stack: StacksEntity;

  @Column({ nullable: true })
  stackId: string;

  @OneToMany(() => ProgressThemesEntity, (themes) => themes.stack)
  @JoinColumn({ name: 'themes' })
  themes: ProgressThemesEntity[];
}
