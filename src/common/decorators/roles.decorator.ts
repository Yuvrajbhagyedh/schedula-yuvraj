import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';

/** Attach the roles allowed to access a route, e.g. @Roles(Role.DOCTOR). */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
