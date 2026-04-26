import { NextResponse } from "next/server";
import { orderStore } from "@/lib/order-store";

export async function GET() {
  try {
    const orders = await orderStore.getOrders();
    
    // Sort by newest first
    const sortedOrders = [...orders].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(sortedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json([], { status: 500 });
  }
}
