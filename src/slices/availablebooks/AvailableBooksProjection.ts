import type { BookAdded } from '../../events/ContextEvents.js';

export type AvailableBooksReadModelItem = {
  id: string;
  title: string;
  restaurant_id?: string;
};

export type AvailableBooksReadModel = {
  data: AvailableBooksReadModelItem[];
};

export const tableName = 'available_books';

// Projection configuration for state-view slice
// In production, this would use postgreSQLRawSQLProjection from @event-driven-io/emmett-postgresql
// This bootstrap version defines the projection structure for future implementation
export const AvailableBooksProjection = {
  canHandle: ['BookAdded'] as const,

  // Evolve function that would generate SQL in a full implementation
  // For now, it describes the transformation logic
  evolve: (event: BookAdded): AvailableBooksReadModelItem => {
    const { type, data, metadata } = event;

    switch (type) {
      case 'BookAdded':
        return {
          id: data.id,
          title: data.title,
          restaurant_id: metadata?.restaurantId as string | undefined,
        };
      default:
        throw new Error(`Unhandled event type: ${type}`);
    }
  },
};
