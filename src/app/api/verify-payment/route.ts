import { NextResponse } from "next/server";
import crypto from "crypto";
import { orderStore } from "@/lib/order-store";

export async function POST(req: Request) {
  try {
    const bodyData = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      event,
      ticket
    } = bodyData;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment fields." },
        { status: 400 }
      );
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return NextResponse.json(
        { error: "Server misconfiguration: Razorpay secret missing." },
        { status: 500 }
      );
    }

    // Generate expected signature: HMAC-SHA256(order_id + "|" + payment_id, secret)
    const signatureBody = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(signatureBody)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed: signature mismatch." },
        { status: 400 }
      );
    }

    // Signature is valid — payment is authentic
    // Save the order to our local store
    if (event && ticket) {
      await orderStore.saveOrder({
        event,
        ticket: {
          ...ticket,
          id: "ES-" + Math.random().toString(36).substring(2, 9).toUpperCase()
        },
        razorpay_order_id,
        razorpay_payment_id,
        created_at: new Date().toISOString()
      });
    }

    return NextResponse.json({
      verified: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed." },
      { status: 500 }
    );
  }
}
