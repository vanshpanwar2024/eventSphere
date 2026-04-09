import { NextResponse } from "next/server";
import { eventsData } from "@/lib/data";
import { mapHostedRecordToDisplayEvent } from "@/lib/hosted-event-display";
import { eventController } from "@/backend/core/container";

export async function GET() {
  // Defer business logic around filtering states up to Controller/Service layer implicitly
  const approvedHostedRaw = await eventController.handleListApprovedEvents();

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
