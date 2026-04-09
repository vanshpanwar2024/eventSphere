import { NextResponse } from "next/server";
import { EventService } from "../services/EventService";
import { AppError } from "../core/errors/AppError";

export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  /**
   * Helper format for standard success API response
   */
  private success(data: any, message?: string, status = 200): NextResponse {
    return NextResponse.json({ success: true, message, data }, { status });
  }

  /**
   * Helper format for centralized error handling
   */
  private error(error: any): NextResponse {
    console.error("API Error: ", error);
    const status = error instanceof AppError ? error.statusCode : 500;
    const message = error.message || "An unexpected error occurred.";
    return NextResponse.json({ success: false, error: message }, { status });
  }

  public async handleCreateEvent(req: Request): Promise<NextResponse> {
    try {
      const data = await req.json();
      const savedEvent = await this.eventService.createEvent(data);
      return this.success(savedEvent, "Event created successfully.", 201);
    } catch (err: any) {
      return this.error(err);
    }
  }

  public async handleListApprovedEvents(): Promise<any[]> {
    return this.eventService.getApprovedEvents();
  }

  public async handleListAllEvents(): Promise<NextResponse> {
    try {
      const events = await this.eventService.getAllEvents();
      return this.success(events);
    } catch (err: any) {
      return this.error(err);
    }
  }

  public async handleUpdateStatus(req: Request, id: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const updatedEvent = await this.eventService.changeEventStatus(id, body.status);
      return this.success(updatedEvent);
    } catch (err: any) {
      return this.error(err);
    }
  }
}
