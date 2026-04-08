import { EventModel } from "../models/Event";
import { supabase } from "@/lib/supabase";

export interface IEventRepository {
  save(event: EventModel): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number | string): Promise<any | undefined>;
  updateStatus(id: number | string, status: 'approved' | 'declined'): Promise<any>;
}

export class EventRepository implements IEventRepository {
  public async save(event: EventModel): Promise<any> {
    const newEvent = { ...event.toJSON() };
    
    // Default to an initial 0 or id generation from DB via insert
    const { data, error } = await supabase
      .from('events')
      .insert([newEvent])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(`Failed to save event to database: ${error.message}`);
    }
    
    return data;
  }

  public async findAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      return [];
    }
    return data || [];
  }

  public async findById(id: number | string): Promise<any | undefined> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Supabase select by id error:", error);
      return undefined;
    }
    return data;
  }

  public async updateStatus(id: number | string, status: 'approved' | 'declined'): Promise<any> {
    const { data, error } = await supabase
      .from('events')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Supabase update status error for id ${id}:`, error);
      throw new Error(`Failed to update event status: ${error.message}`);
    }
    return data;
  }
}
