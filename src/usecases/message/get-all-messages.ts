import { AppContext } from '../../libs/context';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';
import { MessageEntity } from '../../entities/message/message';

export const getAllMessages = (ctx: AppContext): Promise<MessageEntity[]> => {
  return ctx.repositories.message.getAll();
};
