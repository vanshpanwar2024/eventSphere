import { NextResponse } from "next/server";
import { EventService } from "../services/EventService";

export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  public async handleCreateEvent(req: Request): Promise<NextResponse> {
    try {
      const data = await req.json();
      
      const savedEvent = await this.eventService.createEvent(data);
      
      return NextResponse.json({
        success: true,
        message: "Event created successfully.",
        data: savedEvent,
      }, { status: 201 });
      
    } catch (error: any) {
      return NextResponse.json({
        success: false,
        error: error.message || "An unexpected error occurred.",
      }, { status: 400 });
    }
  }
}
