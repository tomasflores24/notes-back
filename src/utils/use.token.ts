import * as jwt from 'jsonwebtoken';
import { PayloadToken } from 'src/modules/auth/interfaces/auth.interface';

export const useToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as PayloadToken;
    return payload;
  } catch {
    return 'Invalid Token';
  }
};
