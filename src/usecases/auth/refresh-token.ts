import Joi from 'joi';
import { AppContext } from '../../libs/context';
import { AuthTokensEntity } from '../../entities/auth/auth-tokens';
import { RefreshTokenInput } from '../../entities/auth/refresh-token-input';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';

export const refreshToken = async (
  ctx: AppContext,
  input: RefreshTokenInput,
): Promise<AuthTokensEntity> => {
  validateInput(input);
  const tokens = await ctx.gateways.iam.refreshToken(input.refreshToken);
  return tokens;
};

function validateInput(input: RefreshTokenInput) {
  const schema = Joi.object<RefreshTokenInput>({
    refreshToken: Joi.string().required().not().empty(),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
