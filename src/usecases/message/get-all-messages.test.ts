import { tests } from '../../libs/tests';
import { Setup } from '../../libs/tests/setup/setup';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';

describe('getAllMessages', () => {
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

  it('should return an empty array when no messages exist', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    // Mock the repository method to return an empty array
    ctx.repositories.message.getAll = jest.fn().mockResolvedValue([]);

    const messages = await setup.usecases.message.getAll(ctx);

    expect(messages).toEqual([]);
    expect(ctx.repositories.message.getAll).toHaveBeenCalledTimes(1);
  }, 100000);

  it('should return all existing messages', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    // Create test messages using the new fixtures
    const testMessages = fixtures.entities.message.messages(3);

    // Mock the repository method to return test messages
    ctx.repositories.message.getAll = jest.fn().mockResolvedValue(testMessages);

    const messages = await setup.usecases.message.getAll(ctx);

    expect(messages).toEqual(testMessages);
    expect(messages.length).toBe(3);
    expect(ctx.repositories.message.getAll).toHaveBeenCalledTimes(1);

    // Additional checks on message structure
    messages.forEach(message => {
      expect(message).toMatchObject({
        id: expect.any(String),
        sessionId: expect.any(String),
        source: expect.any(String),
        message: expect.any(String),
        sentAt: expect.any(Date),
      });
    });
  }, 100000);

  it('should handle repository errors', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    // Mock the repository method to throw an error
    ctx.repositories.message.getAll = jest.fn().mockRejectedValue(new Error('Database error'));

    await expect(
      setup.usecases.message.getAll(ctx)
    ).rejects.toThrow('Database error');
  }, 100000);

  it('should maintain message order from repository', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    // Create test messages with a specific number
    const testMessages = fixtures.entities.message.messages(5);

    // Mock the repository method to return test messages
    ctx.repositories.message.getAll = jest.fn().mockResolvedValue(testMessages);

    const messages = await setup.usecases.message.getAll(ctx);

    // Verify that the order of messages is maintained
    expect(messages).toEqual(testMessages);
  }, 100000);
});