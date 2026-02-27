-- Create available_books table
CREATE TABLE IF NOT EXISTS "public"."available_books"
(
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    restaurant_id uuid NOT NULL
);
