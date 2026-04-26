import { NextResponse } from "next/server";
import { eventsData } from "@/lib/data";
import { mapHostedRecordToDisplayEvent } from "@/lib/hosted-event-display";
import { eventController } from "@/backend/core/container";

export async function GET() {
  // Try to fetch hosted events from Supabase; gracefully degrade if DB is unavailable
  let hostedDisplay: ReturnType<typeof mapHostedRecordToDisplayEvent>[] = [];

  try {
    const approvedHostedRaw = await eventController.handleListApprovedEvents();

    hostedDisplay = approvedHostedRaw.map((row) =>
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
  } catch (err) {
    console.warn("Could not fetch hosted events from database (Supabase may not be configured):", err);
  }

  const merged = [...hostedDisplay, ...eventsData];
  return NextResponse.json(merged);
}
