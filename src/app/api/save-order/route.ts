import { NextResponse } from "next/server";
import { orderStore } from "@/lib/order-store";

export async function POST(req: Request) {
  try {
    const { event, ticket } = await req.json();

    if (!event || !ticket) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    // Save the order (free registration)
    await orderStore.saveOrder({
      event,
      ticket: {
        ...ticket,
        id: "FREE-" + Math.random().toString(36).substring(2, 9).toUpperCase()
      },
      razorpay_order_id: "free_reg",
      razorpay_payment_id: "free_reg",
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving free order:", error);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
