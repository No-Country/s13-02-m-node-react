import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProgressStacksEntity } from '../../progress-stacks/entities/progress-stack.entity';
import { ROLES, NOTIFICATIONFREQUENCY } from '../../config/constants';
import { IUser } from '../../types';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: true }) // cambie esto para poder hacer pruebas
  @Exclude()
  tokenPass: string;

  @Column({ unique: true, nullable: true })
  @Exclude()
  identifier_ia: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.BASIC })
  role: ROLES;

  @Column({ default: 3 })
  life: number;

  @Column({ default: 0 })
  totalPoints: number;

  @Column({
    type: 'enum',
    enum: NOTIFICATIONFREQUENCY,
    default: NOTIFICATIONFREQUENCY.DAILY,
  })
  challengeNotification: NOTIFICATIONFREQUENCY;

  @Column({ default: true })
  notification: boolean;

  @OneToMany(() => ProgressStacksEntity, (progressStack) => progressStack.user)
  @JoinColumn()
  stacks: ProgressStacksEntity[];
}
