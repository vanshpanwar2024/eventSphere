/**
 * Generic Base Repository showcasing Generics, Abstraction, and the Repository Pattern.
 * This delegates generic operations while allowing specific Repositories (like EventRepository) 
 * to inherit and extend.
 * 
 * When Supabase is configured, it uses the cloud database.
 * When Supabase is unavailable, it falls back to local JSON file storage.
 */
import { supabase } from "@/lib/supabase";
import { DatabaseError } from "../errors/AppError";
import fs from "fs";
import path from "path";

// Local JSON file storage path (project root)
const LOCAL_DB_DIR = path.join(process.cwd(), ".local-db");

function ensureLocalDbDir() {
  if (!fs.existsSync(LOCAL_DB_DIR)) {
    fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
  }
}

function getLocalFilePath(tableName: string): string {
  return path.join(LOCAL_DB_DIR, `${tableName}.json`);
}

function readLocalTable(tableName: string): any[] {
  ensureLocalDbDir();
  const filePath = getLocalFilePath(tableName);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocalTable(tableName: string, data: any[]): void {
  ensureLocalDbDir();
  const filePath = getLocalFilePath(tableName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function isSupabaseAvailable(): boolean {
  return supabase !== null;
}

export interface IBaseRepository<T> {
  save(entity: T): Promise<any>;
  findAll(tableName: string): Promise<any[]>;
  findById(tableName: string, id: number | string): Promise<any | null>;
  update(tableName: string, id: number | string, updates: Partial<T>): Promise<any>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  
  public async saveBase(tableName: string, data: Record<string, any>): Promise<any> {
    if (isSupabaseAvailable()) {
      const { data: result, error } = await supabase!
        .from(tableName)
        .insert([data])
        .select()
        .single();

      if (error) {
        throw new DatabaseError(`Insert Error in ${tableName}: ${error.message}`);
      }
      return result;
    }

    // Fallback: local JSON storage
    const records = readLocalTable(tableName);
    const newRecord = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    records.push(newRecord);
    writeLocalTable(tableName, records);
    return newRecord;
  }

  public async findAll(tableName: string): Promise<any[]> {
    if (isSupabaseAvailable()) {
      const { data, error } = await supabase!
        .from(tableName)
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error(`Select Error in ${tableName}:`, error);
        return [];
      }
      return data || [];
    }

    // Fallback: local JSON storage
    const records = readLocalTable(tableName);
    return records.sort((a: any, b: any) => (b.id || 0) - (a.id || 0));
  }

  public async findById(tableName: string, id: number | string): Promise<any | null> {
    if (isSupabaseAvailable()) {
      const { data, error } = await supabase!
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

    // Fallback: local JSON storage
    const records = readLocalTable(tableName);
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return records.find((r: any) => r.id === id || r.id === numericId) || null;
  }

  public async update(tableName: string, id: number | string, updates: Record<string, any>): Promise<any> {
    if (isSupabaseAvailable()) {
      const { data, error } = await supabase!
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

    // Fallback: local JSON storage
    const records = readLocalTable(tableName);
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const index = records.findIndex((r: any) => r.id === id || r.id === numericId);
    if (index === -1) {
      throw new DatabaseError(`Record with ID ${id} not found in ${tableName}.`);
    }
    records[index] = { ...records[index], ...updates, updated_at: new Date().toISOString() };
    writeLocalTable(tableName, records);
    return records[index];
  }

  abstract save(entity: T): Promise<any>;
}