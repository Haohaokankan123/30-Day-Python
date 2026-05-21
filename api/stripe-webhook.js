// Vercel serverless function — Stripe webhook.
// Called by Stripe when a Checkout Session completes. We verify the signature
// (so randoms on the internet can't fake events) and flip the pro_users flag.

import Stripe from "stripe";

// Vercel-specific: disable the default JSON body parser so we can verify the
// raw bytes Stripe signed. Without this, signature verification will fail.
export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    // Until env vars are set, just 200 so Stripe doesn't keep retrying during setup.
    return res.status(200).json({ ok: true, note: "webhook not configured yet" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).json({ error: `Webhook signature failed: ${e.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id;
    if (userId) {
      // Insert into pro_users via Supabase REST. Use ignore-duplicates so Stripe
      // retries on the same event don't blow up (the user_id is the PK).
      const url = `${process.env.SUPABASE_URL}/rest/v1/pro_users`;
      const r = await fetch(url, {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=minimal",
        },
        body: JSON.stringify({
          user_id: userId,
          stripe_session_id: session.id,
        }),
      });
      if (!r.ok) {
        const errText = await r.text().catch(() => "");
        console.error("pro_users insert failed:", r.status, errText);
        // Return 500 so Stripe retries the webhook (it will, automatically)
        return res.status(500).json({ error: "Database write failed" });
      }
    }
  }

  return res.status(200).json({ received: true });
}
