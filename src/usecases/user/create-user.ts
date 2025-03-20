import { AppContext } from '../../libs/context';
import { UserEntity } from '../../entities/user/user';
import { CreateUserInput } from '../../entities/user/create-user-input';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { BadRequestError } from '../../entities/errors/bad-request-error';

export const createUser = async (
  ctx: AppContext,
  input: CreateUserInput,
): Promise<UserEntity> => {
  validateInput(input);

  // Check existing user
  const existingUser = await ctx.repositories.user.getByEmail(input.email);
  if (existingUser) {
    throw new BadRequestError('User already exists', { email: input.email });
  }

  const externalId = await ctx.gateways.iam.createUser(
    input.email,
    input.password,
    `${input.firstName} ${input.lastName}`,
  );

  const createdUser = await ctx.repositories.user.create(
    input.email,
    input.firstName,
    input.lastName,
    externalId,
  );

  return createdUser;
};

function validateInput(input: CreateUserInput) {
  const schema = Joi.object<CreateUserInput>({
    email: Joi.string().email().required().not().empty(),
    firstName: Joi.string().required().not().empty(),
    lastName: Joi.string().required().not().empty(),
    password: Joi.string().required().not().empty(),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
