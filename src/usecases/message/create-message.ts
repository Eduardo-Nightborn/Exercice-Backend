import { AppContext } from '../../libs/context'; // Adjust path as needed
import { MessageEntity } from '../../entities/message/message'; // Adjust path as needed
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error'; // Adjust path as needed
import { v4 as uuidv4 } from 'uuid';
import Logger from 'bunyan';

export interface CreateMessageInput {
  userMessage: string;
}

export const createMessage = async (
  ctx: AppContext,
  input: CreateMessageInput,
): Promise<MessageEntity> => {
  validateInput(input);

  const { userMessage } = input;
  const sessionId = uuidv4();

  // Create user message entity
  const userMessageEntity: MessageEntity = {
    id: uuidv4(),
    sessionId,
    source: 'HUMAIN',
    message: userMessage,
    sentAt: new Date(),
  };

  // Log the user message
  ctx.logger.info(
    {
      id: userMessageEntity.id,
      sessionId,
      message: userMessage,
      sentAt: userMessageEntity.sentAt,
    },
    'User message sent',
  );

  // Save user message to repository
  try {
    await ctx.repositories.message.createMessage(
      userMessageEntity.id,
      userMessageEntity.sessionId,
      userMessageEntity.source,
      userMessageEntity.message,
      userMessageEntity.sentAt,
    );
  } catch (err: any) {
    ctx.logger.error({ err }, 'Failed to save user message');
    throw new BadUserInputError('Failed to save user message: ' + err.message);
  }

  // Prepare input for Cohere Gateway
  const cohereInput = {
    message: userMessage,
  };

  let aiMessage: string;
  try {
    const cohereResponse = await ctx.gateways.cohere.chat(cohereInput);

    const text = cohereResponse.message.content[0].text;
    aiMessage = text || null;

    if (aiMessage === null) {
      throw new Error('No response from AI ');
    }

  } catch (err: any) {
    ctx.logger.error({ err }, 'Failed to get response from Cohere');
    throw new Error('Failed to communicate with LLM: ' + err.message);
  }

  // Create AI message
  const aiMessageEntity: MessageEntity = {
    id: uuidv4(),
    sessionId,
    source: 'IA',
    message: aiMessage,
    sentAt: new Date(),
  };

  // Log the AI response
  ctx.logger.info(
    {
      id: aiMessageEntity.id,
      sessionId,
      message: aiMessage,
      sentAt: aiMessageEntity.sentAt,
    },
    'AI response received',
  );

  // Save AI message to repository
  try {
    await ctx.repositories.message.createMessage(
      aiMessageEntity.id,
      aiMessageEntity.sessionId,
      aiMessageEntity.source,
      aiMessageEntity.message,
      aiMessageEntity.sentAt,
    );
    
  } catch (err: any) {
    ctx.logger.error({ err }, 'Failed to save AI message');
    throw new BadUserInputError('Failed to save AI message: ' + err.message);
  }

  return aiMessageEntity;
};

function validateInput(input: CreateMessageInput) {
  const schema = Joi.object<CreateMessageInput>({
    userMessage: Joi.string().required().not().empty(),
  });

  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
