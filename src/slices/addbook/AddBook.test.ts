import { describe, it, expect } from '@jest/globals';
import { decide, evolve, initialState, type AddBook } from './CommandHandler.js';
import type { BookAdded } from '../../events/ContextEvents.js';

describe('Add Book', () => {
  it('should create BookAdded event when adding a book', () => {
    const command: AddBook = {
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      description: 'A magical adventure',
      isbn: '1234567890',
      user: 'john@example.com',
    };

    const state = initialState();
    const events = decide(state, command);

    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('BookAdded');

    const bookAdded = events[0] as BookAdded;
    expect(bookAdded.data.title).toBe('Harry Potter');
    expect(bookAdded.data.author).toBe('J.K. Rowling');
    expect(bookAdded.data.description).toBe('A magical adventure');
    expect(bookAdded.data.isbn).toBe('1234567890');
    expect(bookAdded.data.user).toBe('john@example.com');
    expect(bookAdded.data.id).toBeDefined();
  });
});
