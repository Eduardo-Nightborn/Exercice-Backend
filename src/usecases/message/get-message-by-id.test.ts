import { tests } from '../../libs/tests';
import { Setup } from '../../libs/tests/setup/setup';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';
import { NotFoundError } from '../../entities/errors/not-found-error';

describe('getOne', () => {
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

  it('should retrieve a message by its ID', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    // Créer un message de test unique
    const testMessage = fixtures.entities.message.message();

    // Mock the repository method to return the test message
    ctx.repositories.message.getById = jest.fn().mockResolvedValue(testMessage);

    const message = await setup.usecases.message.getOne(ctx, testMessage.id);

    expect(message).toEqual(testMessage);
    expect(ctx.repositories.message.getById).toHaveBeenCalledWith(testMessage.id);
  }, 100000);


  it('should throw NotFoundError when message does not exist', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }
  
    const ctx = setup.context({
      isAuthenticated: false,
    });
  
    const nonExistentMessageId = '63574a94-db7d-4642-b418-2f329292677e';
  
    // Mock the repository method to throw NotFoundError
    ctx.repositories.message.getById = jest.fn().mockRejectedValue(
      new NotFoundError(`Message with id ${nonExistentMessageId} not found`)
    );
  
    await expect(
      setup.usecases.message.getOne(ctx, nonExistentMessageId)
    ).rejects.toThrow(NotFoundError);
  
    // Verify the repository method was called with the correct ID
    expect(ctx.repositories.message.getById).toHaveBeenCalledWith(nonExistentMessageId);
  }, 100000);



  it('should validate message structure when retrieved', async () => {
    if (!setup) {
      throw new Error('Setup not initialized');
    }

    const ctx = setup.context({
      isAuthenticated: false,
    });

    // Créer un message de test unique
    const testMessage = fixtures.entities.message.message();

    // Mock the repository method to return the test message
    ctx.repositories.message.getById = jest.fn().mockResolvedValue(testMessage);

    const message = await setup.usecases.message.getOne(ctx, testMessage.id);

    // Vérifier la structure du message
    expect(message).toMatchObject({
      id: expect.any(String),
      sessionId: expect.any(String),
      source: expect.any(String),
      message: expect.any(String),
      sentAt: expect.any(Date),
    });
  }, 100000);
});