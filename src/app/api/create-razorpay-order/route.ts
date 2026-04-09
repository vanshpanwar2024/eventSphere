import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR" } = await req.json();

    // In a real app, use environment variables for keys:
    const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_YourTestKeyId";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "YourTestKeySecret";

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const payment_capture = 1;
    const amountToCharge = amount * 100; // Razorpay expects amount in paise (smallest currency unit)

    const options = {
      amount: amountToCharge.toString(),
      currency,
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      return NextResponse.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (razorpayError: any) {
      console.error("Razorpay error:", razorpayError);
      // Fallback for demo purposes if keys are invalid
      return NextResponse.json({
        id: `order_${Math.random().toString(36).substring(7)}`,
        currency,
        amount: amountToCharge,
        isDemo: true, // indicates keys were invalid, providing demo success
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}
