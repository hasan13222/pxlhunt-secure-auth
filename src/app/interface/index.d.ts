import { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../modules/auth/auth.interface';


declare global {
  namespace Express {
    interface User extends TUser {} 
    interface Request {
      user?: TUser; 
    }
  }
}