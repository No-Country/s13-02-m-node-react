import { IUserDataToken } from '../interfaces/auth.interface';
// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      userAuth?: IUserDataToken;
    }
  }
}
