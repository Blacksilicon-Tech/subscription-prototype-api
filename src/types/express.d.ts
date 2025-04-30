import { User } from '../users/user.entity'; // or wherever your User type/entity is defined

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
