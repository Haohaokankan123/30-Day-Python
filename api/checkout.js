// Vercel serverless function — create a Stripe Checkout Session for the $15 unlock.
// Verifies the caller's Supabase JWT so the unlocked userId can be trusted.

import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    return res.status(500).json({ error: "Stripe is not configured yet." });
  }

  // ── Verify the user via the Supabase JWT in the Authorization header ──
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Not signed in" });

  const userRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!userRes.ok) return res.status(401).json({ error: "Invalid session" });
  const user = await userRes.json();
  if (!user?.id) return res.status(401).json({ error: "Invalid session" });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const origin = req.headers.origin || `https://${req.headers.host || ""}`;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    client_reference_id: user.id,
    customer_email: user.email || undefined,
    // Cards + Apple Pay + Google Pay all show up automatically when enabled in the
    // Stripe dashboard. No payment_method_types override needed.
    success_url: `${origin}/?paid=1`,
    cancel_url: `${origin}/?canceled=1`,
    allow_promotion_codes: true,
  });

  return res.status(200).json({ url: session.url });
}
