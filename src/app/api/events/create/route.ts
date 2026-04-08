import { EventController } from "@/backend/controllers/EventController";
import { EventService } from "@/backend/services/EventService";
import { EventRepository } from "@/backend/repositories/EventRepository";

// Dependency Injection Assembly
const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

export async function POST(req: Request) {
  return eventController.handleCreateEvent(req);
}
