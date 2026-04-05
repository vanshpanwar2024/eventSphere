/**
 * Single in-memory store for user-created events.
 * Lives in `src/lib` so API routes and RSC pages resolve the same module instance
 * (avoids duplicate empty arrays when `EventRepository` is bundled separately).
 */
export type HostedEventRecord = {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  category: string;
  maxParticipants: number;
};

export const hostedEventsStore: HostedEventRecord[] = [];
