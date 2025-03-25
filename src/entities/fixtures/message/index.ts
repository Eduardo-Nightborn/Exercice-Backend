import { faker } from '@faker-js/faker';
import { CreateUserInput } from '../../user/create-user-input';
import { WithRequired } from '../../../libs/types';
import { UserEntity } from '../../user/user';
import { MessageEntity } from '../../message/message';
import { CreateMessageInput } from '../../../usecases/message/create-message';

export const messageFixtures = {
  sendMessage: (input?: Partial<CreateMessageInput>): CreateMessageInput => {
    return {
      userMessage: 'Hello IA , how are you ?',
      ...input,
    };
  },
  messages: (count: number = 5): MessageEntity[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: faker.string.uuid(),
      sessionId: faker.string.uuid(),
      source: index % 2 === 0 ? 'HUMAIN' : 'IA',
      message: faker.lorem.sentence(),
      sentAt: faker.date.recent(),
    }));
  },
  message: (overrides?: Partial<MessageEntity>): MessageEntity => ({
    id: faker.string.uuid(),
    sessionId: faker.string.uuid(),
    source: 'HUMAIN',
    message: faker.lorem.sentence(),
    sentAt: faker.date.recent(),
    ...overrides,
  }),
};
