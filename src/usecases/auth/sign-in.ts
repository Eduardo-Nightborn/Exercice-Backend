import { AppContext } from '../../libs/context';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { AuthTokensEntity } from '../../entities/auth/auth-tokens';
import { SignInInput } from '../../entities/auth/sign-in-input';

export const signIn = async (
  ctx: AppContext,
  input: SignInInput,
): Promise<AuthTokensEntity> => {
  validateInput(input);

  // Check existing user
  await ctx.repositories.user.getByEmail(input.email);

  const tokens = await ctx.gateways.iam.signIn(input.email, input.password);
  return tokens;
};

function validateInput(input: SignInInput) {
  const schema = Joi.object<SignInInput>({
    email: Joi.string().email().required().not().empty(),
    password: Joi.string().required().not().empty(),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
