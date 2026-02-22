import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import RequestWithUser from '../auth/types/requestWithUser.inteface';

const roleHierarchy: Record<Role, number> = {
  [Role.User]: 0,
  [Role.Moderator]: 1,
  [Role.Admin]: 2,
};

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return roleHierarchy[user?.role] >= roleHierarchy[role];
    }
  }

  return mixin(RoleGuardMixin);
}

export default RoleGuard;
