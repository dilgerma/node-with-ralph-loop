// Core event type definition
export type Event<
  EventType extends string = string,
  EventData extends Record<string, unknown> = Record<string, unknown>,
  EventMetadata extends Record<string, unknown> = Record<string, unknown>
> = Readonly<{
  type: EventType;
  data: Readonly<EventData>;
  metadata: Readonly<EventMetadata>;
}>;

// Event creation helper
export function event<
  EventType extends string,
  EventData extends Record<string, unknown>,
  EventMetadata extends Record<string, unknown> = Record<string, unknown>
>(
  type: EventType,
  data: EventData,
  metadata?: EventMetadata
): Event<EventType, EventData, EventMetadata> {
  return {
    type,
    data,
    metadata: metadata ?? ({} as EventMetadata),
  };
}
