import {
  IAuthTokenResult,
  IUseToken,
} from '../types/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as IAuthTokenResult;
    const isExpired = +decode.exp <= Date.now() / 1000;

    return {
      id: decode.user.id,
      role: decode.user.role,
      isExpired,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
