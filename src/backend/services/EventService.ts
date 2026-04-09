import { EventModel } from "../models/Event";
import { IEventRepository } from "../repositories/EventRepository";
import { ValidationError, NotFoundError } from "../core/errors/AppError";

export class EventService {
  private repository: IEventRepository;

  constructor(repository: IEventRepository) {
    this.repository = repository;
  }

  public async createEvent(data: Record<string, any>): Promise<any> {
    // Instantiate domain entity encapsulating validation logic
    const event = new EventModel(data as any);

    // Business rule validation
    const validationErrors = event.validate();
    if (validationErrors.length > 0) {
      throw new ValidationError(validationErrors.join(" | "));
    }

    // Persist via abstraction
    return this.repository.save(event);
  }

  public async getAllEvents(): Promise<any[]> {
    return this.repository.findAll();
  }

  public async getApprovedEvents(): Promise<any[]> {
    const allEvents = await this.repository.findAll();
    return allEvents.filter(event => event.status === 'approved');
  }

  public async changeEventStatus(id: string | number, status: 'approved' | 'declined' | 'pending'): Promise<any> {
    if (!['approved', 'declined', 'pending'].includes(status)) {
      throw new ValidationError("Invalid status provided.");
    }
    
    // Check if exists
    const existingEvent = await this.repository.findById(id);
    if (!existingEvent) {
      throw new NotFoundError(`Event with ID ${id} not found.`);
    }

    return this.repository.updateStatus(id, status);
  }
}

