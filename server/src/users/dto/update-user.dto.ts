import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { NOTIFICATIONFREQUENCY } from '../../config/constants/notification_frequency';
import { ROLES } from '../../config/constants/roles';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  // @IsNotEmpty()
  // @IsEmail()
  // email: string;

  // @IsNotEmpty()
  // @IsStrongPassword()
  // password: string;

  // @IsString()
  // tokenPass: string;

  @IsEnum(ROLES)
  role: ROLES;

  @IsInt()
  life: number;

  @IsInt()
  totalPoints: number;

  @IsEnum(NOTIFICATIONFREQUENCY)
  challengeNotification: NOTIFICATIONFREQUENCY;

  @IsBoolean()
  notification: boolean;
}
