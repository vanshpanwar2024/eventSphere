import { NextResponse } from "next/server";
import { eventsData } from "@/lib/data";
import { mapHostedRecordToDisplayEvent } from "@/lib/hosted-event-display";
import { EventRepository } from "@/backend/repositories/EventRepository";

const eventRepository = new EventRepository();

export async function GET() {
  const hostedRaw = await eventRepository.findAll();
  
  // Only include approved events
  const approvedHostedRaw = hostedRaw.filter(row => row.status === 'approved');

  const hostedDisplay = approvedHostedRaw.map((row) =>
    mapHostedRecordToDisplayEvent({
      id: row.id,
      title: row.title,
      description: row.description,
      dateTime: row.dateTime,
      location: row.location,
      category: row.category,
      maxParticipants: row.maxParticipants,
      isPaid: row.isPaid,
      ticketPrice: row.ticketPrice,
      isCollegeSpecial: row.isCollegeSpecial,
      brochureUrl: row.brochureUrl,
      thumbnailUrl: row.thumbnailUrl,
    })
  );
  const merged = [...hostedDisplay, ...eventsData];
  return NextResponse.json(merged);
}
