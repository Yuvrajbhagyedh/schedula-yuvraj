import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../common/enums/role.enum';
import type { AuthUser } from '../common/types/auth-user.type';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorController {
  // GET /doctor/profile — DOCTOR only.
  @Get('profile')
  @Roles(Role.DOCTOR)
  getProfile(@CurrentUser() user: AuthUser) {
    return {
      message: 'Welcome Doctor! This route is accessible to the DOCTOR role only.',
      user,
    };
  }
}
