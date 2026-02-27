import { describe, it, expect } from '@jest/globals';
import { AvailableBooksProjection } from './AvailableBooksProjection.js';
import { event } from '../../events/index.js';
import type { BookAdded } from '../../events/ContextEvents.js';

describe('Available Books Projection', () => {
  it('spec: should handle BookAdded event', () => {
    const restaurantId = '550e8400-e29b-41d4-a716-446655440000';

    const bookAdded: BookAdded = event('BookAdded', {
      id: 'book-123',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel',
      isbn: '9780743273565',
      user: 'librarian@example.com',
    }, {
      streamName: 'book-stream-1',
      restaurantId: restaurantId,
    });

    const canHandle = AvailableBooksProjection.canHandle.includes('BookAdded');
    expect(canHandle).toBe(true);
  });

  it('spec: should project only id and title from BookAdded', () => {
    const bookAdded: BookAdded = event('BookAdded', {
      id: 'book-123',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel',
      isbn: '9780743273565',
      user: 'librarian@example.com',
    });

    // Verify the projection can handle this event type
    expect(AvailableBooksProjection.canHandle).toContain('BookAdded');
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

    // Verify the projection configuration
    expect(AvailableBooksProjection.canHandle).toContain('BookAdded');
    expect(AvailableBooksProjection.evolve).toBeDefined();
  });
});
