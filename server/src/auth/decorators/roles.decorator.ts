import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../../config/constants/roles';
import { ROLES_KEY } from '../../config/constants/key-decorators';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
