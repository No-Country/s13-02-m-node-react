import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from 'src/config/constants/key-decorators';
import { ROLES } from 'src/config/constants/roles';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
