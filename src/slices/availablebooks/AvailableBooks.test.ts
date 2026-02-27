import { describe, it, expect } from '@jest/globals';
import { AvailableBooksProjection } from './AvailableBooksProjection.js';
import { event } from '../../events/index.js';
import type { BookAdded } from '../../events/ContextEvents.js';

describe('Available Books Projection', () => {
  it('spec: should project BookAdded event to available books read model', () => {
    const bookAdded: BookAdded = event('BookAdded', {
      id: 'book-123',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel',
      isbn: '9780743273565',
      user: 'librarian@example.com',
    });

    const result = AvailableBooksProjection.evolve(bookAdded);

    expect(result.id).toBe('book-123');
    expect(result.title).toBe('The Great Gatsby');
  });

  it('spec: should handle multiple BookAdded events', () => {
    const bookAdded1: BookAdded = event('BookAdded', {
      id: 'book-1',
      title: '1984',
      author: 'George Orwell',
      description: 'Dystopian novel',
      isbn: '9780451524935',
      user: 'librarian@example.com',
    });

    const bookAdded2: BookAdded = event('BookAdded', {
      id: 'book-2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'Classic literature',
      isbn: '9780061120084',
      user: 'librarian@example.com',
    });

    const result1 = AvailableBooksProjection.evolve(bookAdded1);
    const result2 = AvailableBooksProjection.evolve(bookAdded2);

    expect(result1.id).toBe('book-1');
    expect(result1.title).toBe('1984');
    expect(result2.id).toBe('book-2');
    expect(result2.title).toBe('To Kill a Mockingbird');
  });
});
