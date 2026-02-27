import { event, type Event } from '../../events/index.js';
import type { BookAdded } from '../../events/ContextEvents.js';
import type { ContextEvents } from '../../events/ContextEvents.js';
import { v4 as uuid } from 'uuid';

// Command type
export type AddBook = {
  title: string;
  author: string;
  description: string;
  isbn: string;
  user: string;
};

// State type - for STATE_CHANGE slices that don't track state
type State = Record<string, never>;

// Initial state
const initialState = (): State => ({});

// Decision function - validates and creates events
export const decide = (state: State, command: AddBook): Event[] => {
  const bookAdded: BookAdded = event('BookAdded', {
    id: uuid(),
    title: command.title,
    author: command.author,
    description: command.description,
    isbn: command.isbn,
    user: command.user,
  });

  return [bookAdded];
};

// Evolve function - updates state based on events
export const evolve = (state: State, event: ContextEvents): State => {
  switch (event.type) {
    case 'BookAdded':
      return state;
    default:
      return state;
  }
};

export { initialState };
