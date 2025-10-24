import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    key: process.env.CHARGILY_SECRET_KEY,
    base: process.env.BASE_URL,
  });
}
