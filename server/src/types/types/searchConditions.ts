import { UsersEntity } from '../../users/entities/user.entity';

export type TSearchConditions = {
  field: keyof UsersEntity;
  value: string;
};
