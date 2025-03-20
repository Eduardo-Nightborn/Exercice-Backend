import { AppContext } from '../../libs/context';
import { UserEntity } from '../../entities/user/user';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';

export const getUserById = (
  ctx: AppContext,
  id: string,
): Promise<UserEntity> => {
  if (!ctx.auth.isAuthenticated) {
    throw new UnauthorizedError('User not authenticated');
  }
  validateInput(id);
  return ctx.repositories.user.getById(id);
};

function validateInput(id: string) {
  const { error } = Joi.string().uuid().required().not().empty().validate(id);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
