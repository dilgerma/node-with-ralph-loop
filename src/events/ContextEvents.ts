import type { Event } from './index.js';

// Book Added Event
export type BookAdded = Event<
  'BookAdded',
  {
    id: string;
    title: string;
    author: string;
    description: string;
    isbn: string;
    user: string;
  }
>;

// Union type of all context events
export type ContextEvents = BookAdded;
