import { AppContext } from '../../libs/context';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';
import { UserEntity } from '../../entities/user/user';

export const getAllUsers = (ctx: AppContext): Promise<UserEntity[]> => {
  if (!ctx.auth.isAuthenticated) {
    throw new UnauthorizedError('User not authenticated');
  }
  return ctx.repositories.user.getAll();
};
