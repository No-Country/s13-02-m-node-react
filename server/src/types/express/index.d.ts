import { IUserDataToken } from 'your-path-to-IUserDataToken';
import { Request as ExpressRequest } from 'express';

declare module 'express' {
  export interface Request extends ExpressRequest {
    userAuth?: IUserDataToken;
  }
}
