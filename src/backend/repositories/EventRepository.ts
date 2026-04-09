import { EventModel } from "../models/Event";
import { BaseRepository } from "../core/repositories/BaseRepository";

export interface IEventRepository {
  save(event: EventModel): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number | string): Promise<any | null>;
  updateStatus(id: number | string, status: 'approved' | 'declined' | 'pending'): Promise<any>;
}

export class EventRepository extends BaseRepository<EventModel> implements IEventRepository {
  private readonly tableName = 'events';

  public async save(event: EventModel): Promise<any> {
    const newEvent = { ...event.toJSON() };
    return this.saveBase(this.tableName, newEvent);
  }

  public async findAll(): Promise<any[]> {
    return super.findAll(this.tableName);
  }

  public async findById(id: number | string): Promise<any | null> {
    return super.findById(this.tableName, id);
  }

  public async updateStatus(id: number | string, status: 'approved' | 'declined' | 'pending'): Promise<any> {
    return super.update(this.tableName, id, { status });
  }
}
