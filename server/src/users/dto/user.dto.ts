import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { NOTIFICATIONFREQUENCY } from '../../config/constants/notification_frequency';
import { ROLES } from '../../config/constants/roles';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  tokenPass: string;

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

  @IsString()
  @IsOptional()
  avatarUrl: string;
}
