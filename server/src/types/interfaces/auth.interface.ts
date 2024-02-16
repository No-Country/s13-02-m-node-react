import { ROLES } from 'src/config/constants/roles';

export interface IJWTPayload {
  user: IUserDataToken;
}
export interface IAuthTokenResult {
  user: IUserDataToken;
  iat: number;
  exp: number;
}

export interface IUserDataToken {
  role: ROLES;
  id: string;
}
export interface IUseToken {
  role: ROLES;
  id: string;
  isExpired: boolean;
}
