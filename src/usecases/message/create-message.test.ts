import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { tests } from '../../libs/tests';
import { Setup } from '../../libs/tests/setup/setup';

describe('createMessage', () => {
  const { fixtures } = tests;
  let setup: Setup | undefined;

  beforeAll(async () => {
    try {
      setup = await tests.setup();
    } catch (error) {
      console.error('Failed to initialize setup:', error);
      throw error;
    }
  }, 30000);

  afterAll(async () => {
    if (setup) {
      await setup.onStop();
    }
  }, 30000);

  it('should create a message and return AI response', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    // Simuler une réponse de Cohere
    ctx.gateways.cohere.chat = jest.fn().mockResolvedValue({
      message: {
        content: [{ 
          text: 'Ceci est une réponse de test de l\'IA' 
        }]
      }
    });

    const input = fixtures.entities.message.sendMessage();
    const message = await setup.usecases.message.createMessage(ctx, input);

    expect(message).toMatchObject({
      id: expect.any(String),
      sessionId: expect.any(String),
      source: 'IA',
      message: expect.any(String),
      sentAt: expect.any(Date),
    });
  }, 100000);

  it('should throw BadUserInputError if userMessage is empty or null', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    const invalidMessage = {
      userMessage: '',
    };

    await expect(
      setup.usecases.message.createMessage(ctx, invalidMessage)
    ).rejects.toThrow(
      new BadUserInputError('"userMessage" is not allowed to be empty')
    );
  }, 100000);
});