import { supabase } from "./supabase";

export interface OrderData {
  event: {
    title: string;
    date: string;
    location: string;
    image: string;
  };
  ticket: {
    id: string;
    price: string;
    type: string;
  };
  razorpay_order_id: string;
  razorpay_payment_id: string;
  created_at: string;
}

const BUCKET_NAME = "local-db";
const FILE_NAME = "orders.json";

export const orderStore = {
  saveOrder: async (order: OrderData) => {
    try {
      if (!supabase) throw new Error("Supabase internal error");

      let orders: OrderData[] = [];
      const { data, error } = await supabase.storage.from(BUCKET_NAME).download(FILE_NAME);
      
      if (data && !error) {
        const text = await data.text();
        if (text) {
          orders = JSON.parse(text);
        }
      }

      orders.push(order);

      const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(FILE_NAME, JSON.stringify(orders, null, 2), {
        contentType: 'application/json',
        upsert: true
      });

      if (uploadError) {
        console.error("Supabase Storage Error: ", uploadError);
      }
      return order;
    } catch (e) {
      console.error("Error saving order remotely:", e);
      return order;
    }
  },

  getOrders: async (): Promise<OrderData[]> => {
    try {
      if (!supabase) return [];

      const { data, error } = await supabase.storage.from(BUCKET_NAME).download(FILE_NAME);
      
      if (error || !data) {
        return [];
      }
      
      const text = await data.text();
      return text ? JSON.parse(text) : [];
    } catch (e) {
      console.error("Error reading orders remotely:", e);
      return [];
    }
  }
};
