import { createMessage } from './create-message';
import { getAllMessages } from './get-all-messages';
import { getMessageById } from './get-message-by-id';

export const initMessageUsecases = () => {
  return {
    createMessage: createMessage,
    getAll: getAllMessages,
    getOne: getMessageById,
  };
};

export type MessageUsecases = ReturnType<typeof initMessageUsecases>;
