export interface OrderTicket {
  id: string;
  price: string;
  type: string;
}

export interface OrderEvent {
  title: string;
  date: string;
  location: string;
  image: string;
}

export interface Order {
  event: OrderEvent;
  ticket: OrderTicket;
}

export class OrderService {
  async getMyOrders(): Promise<Order[]> {
    const response = await fetch("/api/my-orders", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure we always get fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders.");
    }

    return response.json();
  }
}

export const orderService = new OrderService();
