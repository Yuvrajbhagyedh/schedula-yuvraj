import { Role } from '../enums/role.enum';

/** Shape of the user object attached to the request after JWT validation. */
export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}
