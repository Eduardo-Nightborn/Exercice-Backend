import { AppContext } from '../../libs/context';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { AuthTokensEntity } from '../../entities/auth/auth-tokens';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';
import { ForbiddenError } from '../../entities/errors/forbidden-error';
import { ImpersonateUserInput } from '../../entities/auth/impersonate-user-input';

export const impersonateUser = async (
  ctx: AppContext,
  input: ImpersonateUserInput,
): Promise<AuthTokensEntity> => {
  if (!ctx.auth.isAuthenticated) {
    throw new UnauthorizedError('User not authenticated');
  }

  validateInput(input);

  const user = await ctx.repositories.user.getByExternalId(ctx.auth.externalId);
  if (!user.isAdmin) {
    throw new ForbiddenError('User not allowed to impersonate other users', {
      userId: user.id,
    });
  }

  const targetUser = await ctx.repositories.user.getById(input.userId);

  const tokens = await ctx.gateways.iam.impersonateUser(
    ctx.auth,
    input.refreshToken,
    targetUser.externalId,
  );
  return tokens;
};

function validateInput(input: ImpersonateUserInput) {
  const schema = Joi.object<ImpersonateUserInput>({
    userId: Joi.string().uuid().required().not().empty(),
    refreshToken: Joi.string().required().not().empty(),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
