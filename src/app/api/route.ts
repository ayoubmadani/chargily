import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://pay.chargily.net/test/api/v2/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1000,
        currency: "dzd",
        success_url: `${process.env.BASE_URL}/success`,
        failure_url: `${process.env.BASE_URL}/failure`,
        webhook_url: `${process.env.BASE_URL}/api/webhook`,
      }),
    });

    // تحويل الرد إلى JSON
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Chargily checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
