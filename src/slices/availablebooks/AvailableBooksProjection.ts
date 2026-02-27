import type { BookAdded } from '../../events/ContextEvents.js';

export type AvailableBooksReadModelItem = {
  id: string;
  title: string;
};

export type AvailableBooksReadModel = {
  data: AvailableBooksReadModelItem[];
};

export const tableName = 'available_books';

// Simple in-memory projection for bootstrapped project
// In production, use postgreSQLRawSQLProjection from @event-driven-io/emmett-postgresql
export const AvailableBooksProjection = {
  canHandle: ['BookAdded'] as const,

  // Evolve function that would generate SQL in a full implementation
  evolve: (event: BookAdded): AvailableBooksReadModelItem => {
    const { type, data } = event;

    switch (type) {
      case 'BookAdded':
        return {
          id: data.id,
          title: data.title,
        };
      default:
        throw new Error(`Unhandled event type: ${type}`);
    }
  },
};
