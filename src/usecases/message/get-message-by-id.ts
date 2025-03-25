import { AppContext } from '../../libs/context';
import { MessageEntity } from '../../entities/message/message';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';
import { NotFoundError } from '../../entities/errors/not-found-error';

export const getMessageById = async (
  ctx: AppContext,
  id: string,
): Promise<MessageEntity> => {
  validateInput(id);

  const result = await ctx.repositories.message.getById(id);

  if (!result) {
    throw new NotFoundError(`Message with ID ${id} not found.`);
  }

  return result;
};

function validateInput(id: string): void {
  const { error } = Joi.string().uuid().required().validate(id);
  if (error) {
    throw new BadUserInputError(`Invalid message ID format: ${error.message}`);
  }
}
