export async function GET() {
  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer test_sk_7avCT3Auv8b1bFjizaJInckyMrB5290pyrQjxA9r`,
        "Content-Type": "application/json",
      },
      body: '{"amount":1000,"currency":"dzd","success_url":"https://chargily.vercel.app/success"}',
    };

    const response = await fetch(
      "https://pay.chargily.net/test/api/v2/checkouts",
      options
    );

    const data = await response.json();

    console.log("this is the checkout url yess");
    console.log(data?.checkout_url);

    return Response.json({ data });
  } catch (err) {
    console.log(err);
  }
}
