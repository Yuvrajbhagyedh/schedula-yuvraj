import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../common/enums/role.enum';
import type { AuthUser } from '../common/types/auth-user.type';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientController {
  // GET /patient/profile — PATIENT only.
  @Get('profile')
  @Roles(Role.PATIENT)
  getProfile(@CurrentUser() user: AuthUser) {
    return {
      message:
        'Welcome Patient! This route is accessible to the PATIENT role only.',
      user,
    };
  }
}
