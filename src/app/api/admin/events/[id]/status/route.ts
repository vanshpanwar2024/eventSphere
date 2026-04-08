import { NextResponse } from "next/server";
import { EventRepository } from "@/backend/repositories/EventRepository";

const eventRepository = new EventRepository();

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();
    const { status } = body;

    if (!status || !['approved', 'declined', 'pending'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const updatedEvent = await eventRepository.updateStatus(id, status);
    
    return NextResponse.json({ success: true, data: updatedEvent });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}