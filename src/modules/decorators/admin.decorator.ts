import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from 'src/common/constants/key.decorator';
import { ROLES } from 'src/common/enums/role.enum';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
