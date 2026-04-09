/**
 * Generic Base Repository showcasing Generics, Abstraction, and the Repository Pattern.
 * This delegates generic operations while allowing specific Repositories (like EventRepository) 
 * to inherit and extend.
 */
import { supabase } from "@/lib/supabase";
import { DatabaseError } from "../errors/AppError";

export interface IBaseRepository<T> {
  save(entity: T): Promise<any>;
  findAll(tableName: string): Promise<any[]>;
  findById(tableName: string, id: number | string): Promise<any | null>;
  update(tableName: string, id: number | string, updates: Partial<T>): Promise<any>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  
  public async saveBase(tableName: string, data: Record<string, any>): Promise<any> {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert([data])
      .select()
      .single();

    if (error) {
      throw new DatabaseError(`Insert Error in ${tableName}: ${error.message}`);
    }
    return result;
  }

  public async findAll(tableName: string): Promise<any[]> {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error(`Select Error in ${tableName}:`, error);
      return [];
    }
    return data || [];
  }

  public async findById(tableName: string, id: number | string): Promise<any | null> {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Select by ID Error in ${tableName}:`, error);
      return null;
    }
    return data;
  }

  public async update(tableName: string, id: number | string, updates: Record<string, any>): Promise<any> {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new DatabaseError(`Update Error in ${tableName}: ${error.message}`);
    }
    return data;
  }

  abstract save(entity: T): Promise<any>;
}