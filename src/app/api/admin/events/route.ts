import { eventController } from "@/backend/core/container";

export async function GET() {
  return eventController.handleListAllEvents();
}