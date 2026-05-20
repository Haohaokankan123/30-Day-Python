// Vercel serverless function — Groq AI tutor backend
// GROQ_API_KEY and SUPABASE_URL/SUPABASE_SERVICE_KEY live in Vercel env vars only

const DAILY_LIMIT = 20;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, userId } = req.body || {};

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages required" });
  }

  // ── Usage check ────────────────────────────────────────────────
  if (userId) {
    const used = await getUsageCount(userId);
    if (used >= DAILY_LIMIT) {
      return res.status(429).json({
        error: "limit_reached",
        message: `You've used all ${DAILY_LIMIT} free messages for today. Come back tomorrow!`,
      });
    }
  }

  // ── Call Groq ──────────────────────────────────────────────────
  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are an expert Python tutor for the "30 Days of Python" beginner course. You help students learn Python from scratch.

You know everything about Python: variables, data types, operators, strings, lists, tuples, sets, dicts, conditionals, loops, functions, modules, list comprehension, higher-order functions, exception handling, file handling, OOP, and all standard library concepts.

Rules:
- Be clear and friendly for absolute beginners.
- Keep answers concise — under 200 words unless the student asks for more detail.
- Always show a short code example when explaining a concept.
- Format code with triple backticks and the python label.
- If the student shares their code, find bugs and explain the fix.
- If asked about something unrelated to Python, politely redirect.`,
        },
        ...messages,
      ],
    }),
  });

  if (!groqRes.ok) {
    const err = await groqRes.json().catch(() => ({}));
    return res.status(groqRes.status).json({ error: err.error?.message || "Groq error" });
  }

  // ── Increment usage counter (fire-and-forget) ──────────────────
  if (userId) incrementUsage(userId).catch(() => {});

  // ── Stream Groq SSE → client ───────────────────────────────────
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const reader = groqRes.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
  } finally {
    res.end();
  }
}

// ── Supabase helpers ───────────────────────────────────────────────
async function getUsageCount(userId) {
  const today = new Date().toISOString().slice(0, 10);
  const url = `${process.env.SUPABASE_URL}/rest/v1/ai_usage?user_id=eq.${userId}&select=message_count,reset_date`;
  const r = await fetch(url, { headers: supabaseHeaders() });
  if (!r.ok) return 0;
  const rows = await r.json();
  if (!rows.length) return 0;
  const row = rows[0];
  if (row.reset_date < today) return 0;
  return row.message_count || 0;
}

async function incrementUsage(userId) {
  const today = new Date().toISOString().slice(0, 10);
  const url = `${process.env.SUPABASE_URL}/rest/v1/rpc/increment_ai_usage`;
  await fetch(url, {
    method: "POST",
    headers: { ...supabaseHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ p_user_id: userId, p_today: today }),
  });
}

function supabaseHeaders() {
  return {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
  };
}
