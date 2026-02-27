# Available Books UI Prompt

## Query Endpoint

**Method:** GET
**Path:** `/api/query/available-books-collection`

## Database Table

Use table: `public.available_books`

### Table Definition

```sql
CREATE TABLE IF NOT EXISTS "public"."available_books"
(
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    restaurant_id uuid NOT NULL
);
```

## Payload Example

Query with optional ID filter:

```
GET /api/query/available-books-collection?_id=book-123
```

Response:

```json
[
  {
    "id": "book-123",
    "title": "The Great Gatsby",
    "restaurant_id": "550e8400-e29b-41d4-a716-446655440000"
  },
  {
    "id": "book-456",
    "title": "1984",
    "restaurant_id": "550e8400-e29b-41d4-a716-446655440000"
  }
]
```

## Implementation Notes

- This read model is populated by the `BookAdded` event
- Each book entry contains `id`, `title`, and `restaurant_id` fields
- Query without `_id` parameter returns all available books for the user's restaurant
- Query with `_id` parameter returns single book matching that ID
- Response is always an array (empty if no results)

## Field Descriptions

- `id`: Unique identifier for the book (TEXT)
- `title`: Title of the book (TEXT, required)
- `restaurant_id`: Restaurant/tenant identifier for multi-tenancy (UUID, required)
