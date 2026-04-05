import { NextResponse } from "next/server";
import { eventsData } from "@/lib/data";
import { mapHostedRecordToDisplayEvent } from "@/lib/hosted-event-display";
import { EventRepository } from "@/backend/repositories/EventRepository";

const eventRepository = new EventRepository();

export async function GET() {
  const hostedRaw = await eventRepository.findAll();
  const hostedDisplay = hostedRaw.map((row) =>
    mapHostedRecordToDisplayEvent({
      id: row.id,
      title: row.title,
      description: row.description,
      dateTime: row.dateTime,
      location: row.location,
      category: row.category,
      maxParticipants: row.maxParticipants,
    })
  );
  const merged = [...hostedDisplay, ...eventsData];
  return NextResponse.json(merged);
}
