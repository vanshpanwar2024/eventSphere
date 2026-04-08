import { EventModel } from "../models/Event";
import { getHostedEventsFromDisk, saveHostedEventToDisk } from "@/lib/hosted-events-store";

export interface IEventRepository {
  save(event: EventModel): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | undefined>;
}

export class EventRepository implements IEventRepository {
  public async save(event: EventModel): Promise<any> {
    const newEvent = { ...event.toJSON(), id: Date.now() };
    saveHostedEventToDisk(newEvent as any);
    return newEvent;
  }

  public async findAll(): Promise<any[]> {
    const events = getHostedEventsFromDisk();
    return [...events].sort((a, b) => b.id - a.id);
  }

  public async findById(id: number): Promise<any | undefined> {
    const events = getHostedEventsFromDisk();
    const sid = String(id);
    return events.find((e) => e.id === id || String(e.id) === sid);
  }
}
