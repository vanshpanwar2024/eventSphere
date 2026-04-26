import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    if (!supabase) {
      // If database is not configured, return a default state
      return NextResponse.json({ isVerified: false });
    }

    const { data, error } = await supabase
      .from("student_verifications")
      .select("is_verified")
      .eq("user_email", email)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return NextResponse.json({ isVerified: false });
      }
      throw error;
    }

    return NextResponse.json({ isVerified: data?.is_verified || false });
  } catch (error: any) {
    console.error("Error fetching student verification:", error);
    return NextResponse.json(
      { error: "Failed to fetch verification status", isVerified: false },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { email, enrollmentId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("student_verifications")
      .upsert(
        { 
          user_email: email, 
          enrollment_id: enrollmentId || null, 
          is_verified: true,
          verified_at: new Date().toISOString()
        },
        { onConflict: "user_email" }
      )
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error saving student verification:", error);
    return NextResponse.json(
      { error: "Failed to save verification status" },
      { status: 500 }
    );
  }
}
