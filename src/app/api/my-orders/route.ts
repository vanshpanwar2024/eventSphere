import { NextResponse } from "next/server";
import { eventsData } from "@/lib/data";

export async function GET() {
  // Mock data fetching existing events as "registered" events
  const myOrders = [
    {
      event: {
        title: eventsData[0].title,
        date: eventsData[0].date,
        location: eventsData[0].location,
        image: eventsData[0].image,
      },
      ticket: {
        id: "ES-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        price: eventsData[0].price,
        type: "VIP Entry",
      },
    },
    {
      event: {
        title: eventsData[1].title,
        date: eventsData[1].date,
        location: eventsData[1].location,
        image: eventsData[1].image,
      },
      ticket: {
        id: "ES-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        price: eventsData[1].price,
        type: "Standard Entry",
      },
    },
  ];

  return NextResponse.json(myOrders);
}
