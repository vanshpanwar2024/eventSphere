import { NextResponse } from "next/server";
import { EventRepository } from "@/backend/repositories/EventRepository";

const eventRepository = new EventRepository();

export async function GET() {
  try {
    const hostedRaw = await eventRepository.findAll();
    return NextResponse.json({ success: true, data: hostedRaw });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}