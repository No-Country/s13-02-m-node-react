import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NOTIFICATIONFREQUENCY } from '../../config/constants/notification_frequency';
import { ROLES } from '../../config/constants/roles';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  life: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  totalPoints: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(NOTIFICATIONFREQUENCY)
  challengeNotification: NOTIFICATIONFREQUENCY;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  notification: boolean;
}
