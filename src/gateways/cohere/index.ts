import { CohereClient } from "cohere-ai";
import { Config } from '../../libs/config';
import Joi from 'joi';
import { BadRequestError } from '../../entities/errors/bad-request-error';
import { UnknownError } from '../../entities/errors/unknown-error';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';

// Define types
type ChatRole = 'USER' | 'CHATBOT' | 'SYSTEM' | 'TOOL';

interface ChatInput {
  messages: {
    role: string;
    content: string;
    toolCallId?: string;
  }[];
}


export const initCohereGateway = (config: Config) => {
  const cohereClient = new CohereClient({
    token: config.cohere.cohereApiKey,
  });

  const chat = async (input: ChatInput): Promise<any> => {
    validateInput(input);

    // Convert role strings to Cohere's expected enum values
    const mapRole = (role: string): ChatRole => {
      switch (role.toLowerCase()) {
        case 'user':
          return 'USER';
        case 'assistant':
          return 'CHATBOT';
        case 'system':
          return 'SYSTEM';
        case 'tool':
          return 'TOOL';
        default:
          return 'USER'; // Default fallback
      }
    };

    
    const cohereMessages = input.messages.map((msg) => ({
      role: mapRole(msg.role),
      message: msg.content,
      ...(msg.toolCallId && { tool_call_id: msg.toolCallId }),
    }));

    try {
      const response = await cohereClient.chat({
        model: 'command-r-a-03-2025',
        message: cohereMessages[cohereMessages.length - 1].message,
        chatHistory: cohereMessages.slice(0, -1),
      });

      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Error communicating with Cohere API';

      if (err.status) {
        switch (err.status) {
          case 400:
            throw new BadRequestError(
              'Invalid request to Cohere API: ' + errorMessage,
            );
          case 401:
            throw new UnauthorizedError(
              'Unauthorized access to Cohere API: ' + errorMessage,
            );
          case 403:
            throw new UnauthorizedError(
              'Forbidden access to Cohere API: ' + errorMessage,
            );
          default:
            throw new UnknownError(
              'Error communicating with Cohere API: ' + errorMessage,
            );
        }
      }
    }
  };

  return { chat };
};

function validateInput(input: ChatInput) {
  const messageSchema = Joi.object({
    role: Joi.string().required(),
    content: Joi.string().required(),
    toolCallId: Joi.string().optional(),
  });

  const schema = Joi.object({
    messages: Joi.array().items(messageSchema).min(1).required(),
  });

  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequestError(error.message);
  }
}

export type CohereGateway = ReturnType<typeof initCohereGateway>;
