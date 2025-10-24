import { NextResponse } from "next/server";
import https from "https";

export async function GET() {
  try {
    const response = await fetch("https://pay.chargily.net/test/api/v2/checkouts", {
      method: "POST",
      headers: {
        "Authorization": "Bearer test_sk_7avCT3Auv8b1bFjizaJInckyMrB5290pyrQjxA9r",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1000,
        currency: "dzd",
        success_url: "http://localhost:3000/success",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
