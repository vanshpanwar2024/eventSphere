import { EventController } from "../controllers/EventController";
import { EventService } from "../services/EventService";
import { EventRepository } from "../repositories/EventRepository";

// Dependency Injection Assembly implementation
// This file serves as an IoC Container substitute pattern (Poor Man's DI)
class Container {
  public static getEventController(): EventController {
    // Inject dependencies from the ground upwards
    const repository = new EventRepository();
    const service = new EventService(repository);
    return new EventController(service);
  }
}

export const eventController = Container.getEventController();