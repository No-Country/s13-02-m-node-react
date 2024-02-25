import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../config/constants/roles';
import { IUser } from '../../types/interfaces/user.interface';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { ProgressStacksEntity } from './progressStacks.entity';
import { NOTIFICATIONFREQUENCY } from '../../config/constants/notification_frequency';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true }) // cambie esto para poder hacer pruebas
  @Exclude()
  tokenPass: string;
  @Column({ type: 'enum', enum: ROLES, default: ROLES.BASIC })
  role: ROLES;
  @Column({ default: 3 })
  life: number;
  @Column({ unique: true, nullable: true })
  @Exclude()
  identifier_ia: string;
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

  @OneToMany(
    () => ProgressStacksEntity,
    (progressStack) => progressStack.user,
    { eager: true, cascade: ['update'], onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'stacks' })
  stacks: ProgressStacksEntity[];
}
