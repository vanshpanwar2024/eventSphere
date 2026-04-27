import { eventController } from "@/backend/core/container";

export const dynamic = "force-dynamic";

export async function GET() {
  return eventController.handleListAllEvents();
}