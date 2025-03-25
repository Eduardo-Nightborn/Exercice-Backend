import { AppContext } from '../../libs/context';
import { MessageEntity } from '../../entities/message/message';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { v4 as uuidv4 } from 'uuid';

interface CreateMessageInput {
  userMessage: string;
}

export const createMessage = async (
  ctx: AppContext,
  input: CreateMessageInput,
): Promise<MessageEntity> => {
  validateInput(input);

  const { userMessage } = input;

  const messageEntity: MessageEntity = {
    id: uuidv4(),
    sessionId: uuidv4(),
    source: 'HUMAIN',
    message: userMessage,
    sentAt: new Date(),
  };

  

  try {
    return await ctx.repositories.message.createMessage(
      messageEntity.id,
      messageEntity.sessionId,
      messageEntity.source,
      messageEntity.message,
      messageEntity.sentAt,
    );
  } catch (err: any) {
    throw new BadUserInputError('Message creation failed: ' + err.message);
  }
};

function validateInput(input: CreateMessageInput) {
  const schema = Joi.object<CreateMessageInput>({
    //sessionId: Joi.string().not().empty(),
    userMessage: Joi.string().required().not().empty(),
    //role: Joi.string().required().not().empty(),
    //toolCallId: Joi.string().optional(),
  });

  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
