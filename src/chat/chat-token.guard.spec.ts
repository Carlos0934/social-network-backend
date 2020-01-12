import { ChatTokenGuard } from './chat-token.guard';

describe('ChatTokenGuard', () => {
  it('should be defined', () => {
    expect(new ChatTokenGuard()).toBeDefined();
  });
});
