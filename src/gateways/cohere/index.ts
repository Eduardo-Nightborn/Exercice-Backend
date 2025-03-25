import { Config } from '../../libs/config';
import Joi from 'joi';
import { BadRequestError } from '../../entities/errors/bad-request-error';
import { UnknownError } from '../../entities/errors/unknown-error';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';

interface ChatInput {
  message: string;
}

interface ChatResponse {
  text?: string;
  [key: string]: any;
}

export const initCohereGateway = (config: Config) => {
  const apiKey = config.cohere.cohereApiKey;
  const baseUrl = 'https://api.cohere.com/v2/chat';

  const chat = async (input: ChatInput): Promise<ChatResponse> => {
    validateInput(input);

    const { message } = input;

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stream: false,
          model: 'command-r',
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorMessage = errorText || 'Error communicating with Cohere API';

        switch (response.status) {
          case 400:
            throw new BadRequestError(
              `Invalid request to Cohere API: ${errorMessage}`,
            );
          case 401:
            throw new UnauthorizedError(
              `Unauthorized access to Cohere API: ${errorMessage}`,
            );
          case 403:
            throw new UnauthorizedError(
              `Forbidden access to Cohere API: ${errorMessage}`,
            );
          default:
            throw new UnknownError(
              `Error communicating with Cohere API: ${errorMessage}`,
            );
        }
      }

      const body: ChatResponse = await response.json();
      return body;
    } catch (err: any) {
      if (
        err instanceof BadRequestError ||
        err instanceof UnauthorizedError ||
        err instanceof UnknownError
      ) {
        throw err; 
      }
      throw new UnknownError(
        `Unexpected error communicating with Cohere API: ${err.message}`,
      );
    }
  };

  return { chat };
};

function validateInput(input: ChatInput) {
  const messageSchema = Joi.object({
    message: Joi.string().required(),
  });

  const { error } = messageSchema.validate(input);
  if (error) {
    throw new BadRequestError(error.message);
  }
}

export type CohereGateway = ReturnType<typeof initCohereGateway>;
