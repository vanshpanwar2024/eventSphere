import { EventModel } from "../models/Event";
import { IEventRepository } from "../repositories/EventRepository";

export class EventService {
  private repository: IEventRepository;

  constructor(repository: IEventRepository) {
    this.repository = repository;
  }

  public async createEvent(data: any): Promise<any> {
    // Instantiate Model
    const event = new EventModel(data);

    // Validate
    const validationErrors = event.validate();
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(" | "));
    }

    // Save using Repository
    const savedEvent = await this.repository.save(event);
    return savedEvent;
  }
}
