import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // 1️⃣ جلب التوقيع من الرؤوس (headers)
    const signature = req.headers.get("signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature provided" }, { status: 400 });
    }

    // 2️⃣ قراءة النص الخام للطلب
    const payload = await req.text();

    // 3️⃣ حساب التوقيع المحلي للتحقق من صحة الطلب
    const computedSignature = crypto
      .createHmac("sha256", process.env.CHARGILY_SECRET_KEY || "")
      .update(payload)
      .digest("hex");

    if (computedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // 4️⃣ تحويل الـ payload إلى JSON
    const event = JSON.parse(payload);

    // 5️⃣ التعامل مع نوع الحدث (event.type)
    switch (event.type) {
      case "checkout.paid":
        const paidCheckout = event.data;
        console.log("✅ Payment successful:", paidCheckout);
        // 👉 هنا يمكنك تحديث قاعدة البيانات أو إرسال رسالة شكر للمستخدم
        break;

      case "checkout.failed":
        const failedCheckout = event.data;
        console.log("❌ Payment failed:", failedCheckout);
        // 👉 يمكنك تسجيل الفشل أو إعادة المحاولة
        break;

      default:
        console.log("⚠️ Unhandled event type:", event.type);
    }

    // 6️⃣ إرجاع رد ناجح إلى Chargily
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
