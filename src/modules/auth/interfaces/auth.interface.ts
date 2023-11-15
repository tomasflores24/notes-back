import { ROLES } from 'src/common/enums/role.enum';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}
