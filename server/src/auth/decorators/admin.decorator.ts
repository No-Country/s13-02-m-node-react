import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from '../../config/constants/key-decorators';
import { ROLES } from '../../config/constants/roles';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
