import { eventController } from "@/backend/core/container";

export async function POST(req: Request) {
  return eventController.handleCreateEvent(req);
}
