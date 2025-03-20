import { AppContext } from '../../libs/context';
import { MeEntity } from '../../entities/auth/me';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';

export const getMe = async (ctx: AppContext): Promise<MeEntity> => {
  if (!ctx.auth.isAuthenticated) {
    throw new UnauthorizedError('User not authenticated');
  }
  const user = await ctx.repositories.user.getByExternalId(ctx.auth.externalId);

  return {
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
