import { AppContext } from '../../libs/context';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { AuthTokensEntity } from '../../entities/auth/auth-tokens';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';
import { StopImpersonatingUserInput } from '../../entities/auth/stop-impersonating-user-input';

export const stopImpersonatingUser = async (
  ctx: AppContext,
  input: StopImpersonatingUserInput,
): Promise<AuthTokensEntity> => {
  if (!ctx.auth.isAuthenticated) {
    throw new UnauthorizedError('User not authenticated');
  }
  if (!ctx.auth.isImpersonating) {
    throw new UnauthorizedError('User not impersonating');
  }

  validateInput(input);

  // Check existing user
  await ctx.repositories.user.getByExternalId(ctx.auth.externalId);

  const tokens = await ctx.gateways.iam.stopImpersonatingUser(
    ctx.auth,
    input.refreshToken,
  );
  return tokens;
};

function validateInput(input: StopImpersonatingUserInput) {
  const schema = Joi.object<StopImpersonatingUserInput>({
    refreshToken: Joi.string().required().not().empty(),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
