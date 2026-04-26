import fs from "fs";
import path from "path";

const LOCAL_DB_DIR = path.join(process.cwd(), ".local-db");
const ORDERS_FILE = path.join(LOCAL_DB_DIR, "orders.json");

function ensureLocalDbDir() {
  if (!fs.existsSync(LOCAL_DB_DIR)) {
    fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
  }
}

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

export const orderStore = {
  saveOrder: async (order: OrderData) => {
    ensureLocalDbDir();
    let orders: OrderData[] = [];
    if (fs.existsSync(ORDERS_FILE)) {
      try {
        const data = fs.readFileSync(ORDERS_FILE, "utf-8");
        orders = JSON.parse(data);
      } catch (e) {
        console.error("Error reading orders file:", e);
        orders = [];
      }
    }
    orders.push(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    return order;
  },

  getOrders: async (): Promise<OrderData[]> => {
    if (!fs.existsSync(ORDERS_FILE)) {
      return [];
    }
    try {
      const data = fs.readFileSync(ORDERS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading orders file:", e);
      return [];
    }
  }
};
