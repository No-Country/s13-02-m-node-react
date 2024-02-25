import { BaseEntity } from '../../config/base.entity';
import { ThemesEntity } from '../../themes/entities/theme.entity';
import { IStack } from '../../types/interfaces/stack.interface';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'stacks' })
export class StacksEntity extends BaseEntity implements IStack {
  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    // collation: 'utf8mb4_unicode_ci',
  })
  name: string;

  @Column()
  points: number;

  @OneToMany(() => ThemesEntity, (themes) => themes.stack, {
    cascade: ['update'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'themes' })
  themes: ThemesEntity[];
}
