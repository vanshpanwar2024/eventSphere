/**
 * Single in-memory store for user-created events.
 * Lives in `src/lib` so API routes and RSC pages resolve the same module instance
 * (avoids duplicate empty arrays when `EventRepository` is bundled separately).
 */
import fs from "fs";
import path from "path";

export type HostedEventRecord = {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  category: string;
  maxParticipants: number;
};

const STORE_FILE = path.join(process.cwd(), "src/lib/hosted-events.json");

// Helper to read events (ensures we get latest from disk every time)
export function getHostedEventsFromDisk(): HostedEventRecord[] {
  try {
    if (!fs.existsSync(STORE_FILE)) return [];
    const data = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("[STORE] Failed to read disk store:", err);
    return [];
  }
}

// Helper to save events to disk
export function saveHostedEventToDisk(event: HostedEventRecord) {
  try {
    const list = getHostedEventsFromDisk();
    list.push(event);
    fs.writeFileSync(STORE_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("[STORE] Failed to write event to disk:", err);
  }
}

// Keep the export for compatibility, but its use will be legacy or read-once.
// Better to update repositories to use the helpers.
export const hostedEventsStore: HostedEventRecord[] = [];
