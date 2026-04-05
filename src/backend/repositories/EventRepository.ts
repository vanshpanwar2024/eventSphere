import { EventModel } from "../models/Event";
import { hostedEventsStore as eventsDB } from "@/lib/hosted-events-store";

export interface IEventRepository {
  save(event: EventModel): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | undefined>;
}

export class EventRepository implements IEventRepository {
  public async save(event: EventModel): Promise<any> {
    // Simulate DB connection delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newEvent = { ...event.toJSON(), id: Date.now() };
    eventsDB.push(newEvent);
    return newEvent;
  }

  public async findAll(): Promise<any[]> {
    return [...eventsDB].sort((a, b) => b.id - a.id);
  }

  public async findById(id: number): Promise<any | undefined> {
    const sid = String(id);
    return eventsDB.find((e) => e.id === id || String(e.id) === sid);
  }
}
