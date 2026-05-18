/* =============================================
   SYNC.JS — localStorage ↔ Supabase sync
   Exposes window.Sync
   ============================================= */

(function () {
  const LS = {
    COMPLETED:   "py30_completed",
    XP:          "py30_xp",
    LEVEL:       "py30_level",
    STREAK:      "py30_streak",
    LAST_ACTIVE: "py30_last_active",
    BADGES:      "py30_badges",
    AI_DAYS:     "py30_ai_days",
    EXERCISES:   "py30_exercises",
    QUIZ:        "py30_quiz",
  };

  const DEBOUNCE_MS = 1500;

  function sb() { return window._supabase || null; }
  function uid() {
    try { return window.Auth && window.Auth.user() ? window.Auth.user().id : null; }
    catch (_) { return null; }
  }
  function loggedIn() { return !!uid(); }

  // ─── localStorage helpers ─────────────────
  function lsInt(key, fallback = 0) {
    const n = parseInt(localStorage.getItem(key), 10);
    return isNaN(n) ? fallback : n;
  }
  function lsArr(key) {
    try { const p = JSON.parse(localStorage.getItem(key)); return Array.isArray(p) ? p : []; }
    catch (_) { return []; }
  }
  function lsObj(key) {
    try { const p = JSON.parse(localStorage.getItem(key)); return p && typeof p === "object" && !Array.isArray(p) ? p : {}; }
    catch (_) { return {}; }
  }
  function lsStr(key) { return localStorage.getItem(key) || ""; }
  function union(a, b) { return [...new Set([...a, ...b])]; }
  function dateGte(a, b) { if (!a) return false; if (!b) return true; return a >= b; }

  // ─── Debounced push ───────────────────────
  let _timer = null;
  function schedulePush() {
    if (_timer) clearTimeout(_timer);
    _timer = setTimeout(() => { _timer = null; _pushNow(); }, DEBOUNCE_MS);
  }

  async function _pushNow() {
    if (!loggedIn()) return;
    const client = sb(); if (!client) return;
    const userId = uid();
    try {
      // Progress row
      await client.from("user_progress").upsert({
        user_id: userId,
        xp: lsInt(LS.XP),
        level: lsInt(LS.LEVEL, 1),
        streak: lsInt(LS.STREAK),
        last_active: lsStr(LS.LAST_ACTIVE) || null,
        completed_days: lsArr(LS.COMPLETED),
        ai_days: lsArr(LS.AI_DAYS),
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

      // Badges
      const badges = lsArr(LS.BADGES);
      if (badges.length) {
        await client.from("user_badges").upsert(
          badges.map(b => ({ user_id: userId, badge_id: b })),
          { onConflict: "user_id,badge_id", ignoreDuplicates: true }
        );
      }

      // Exercises
      const exercises = lsObj(LS.EXERCISES);
      const exKeys = Object.keys(exercises);
      if (exKeys.length) {
        await client.from("user_exercises").upsert(
          exKeys.map(k => ({
            user_id: userId,
            exercise_key: k,
            code: exercises[k].code || "",
            status: exercises[k].status || "incomplete",
            updated_at: new Date().toISOString(),
          })),
          { onConflict: "user_id,exercise_key" }
        );
      }

      // Quiz answers
      const quiz = lsObj(LS.QUIZ);
      const quizKeys = Object.keys(quiz);
      if (quizKeys.length) {
        await client.from("user_quiz_answers").upsert(
          quizKeys.map(k => ({
            user_id: userId,
            quiz_key: k,
            answer_idx: quiz[k].answer_idx,
            correct: quiz[k].correct,
          })),
          { onConflict: "user_id,quiz_key" }
        );
      }
    } catch (err) {
      console.warn("[Sync] push failed:", err && err.message);
    }
  }

  // ─── Pull & merge ─────────────────────────
  async function _pullNow() {
    if (!loggedIn()) return;
    const client = sb(); if (!client) return;
    const userId = uid();
    try {
      const [pR, bR, eR, qR] = await Promise.all([
        client.from("user_progress").select("xp,level,streak,last_active,completed_days,ai_days").eq("user_id", userId).maybeSingle(),
        client.from("user_badges").select("badge_id").eq("user_id", userId),
        client.from("user_exercises").select("exercise_key,code,status").eq("user_id", userId),
        client.from("user_quiz_answers").select("quiz_key,answer_idx,correct").eq("user_id", userId),
      ]);

      // Merge progress
      if (pR.data) {
        const c = pR.data;
        localStorage.setItem(LS.XP, String(Math.max(lsInt(LS.XP), c.xp || 0)));
        localStorage.setItem(LS.LEVEL, String(Math.max(lsInt(LS.LEVEL, 1), c.level || 1)));
        if (typeof c.streak === "number") localStorage.setItem(LS.STREAK, String(c.streak));
        if (dateGte(c.last_active || "", lsStr(LS.LAST_ACTIVE)))
          localStorage.setItem(LS.LAST_ACTIVE, c.last_active || "");
        localStorage.setItem(LS.COMPLETED, JSON.stringify(
          union(lsArr(LS.COMPLETED), Array.isArray(c.completed_days) ? c.completed_days : [])));
        localStorage.setItem(LS.AI_DAYS, JSON.stringify(
          union(lsArr(LS.AI_DAYS), Array.isArray(c.ai_days) ? c.ai_days : [])));
      }

      // Merge badges
      if (bR.data && bR.data.length) {
        localStorage.setItem(LS.BADGES, JSON.stringify(
          union(lsArr(LS.BADGES), bR.data.map(r => r.badge_id))));
      }

      // Cloud wins for exercises — prototype-safe, key allowlist enforced
      if (eR.data && eR.data.length) {
        const local = Object.create(null);
        const existing = lsObj(LS.EXERCISES);
        Object.assign(local, existing);
        for (const row of eR.data) {
          const k = String(row.exercise_key || "");
          if (!k || k === "__proto__" || k === "constructor" || k === "prototype") continue;
          local[k] = { code: row.code || "", status: row.status || "incomplete" };
        }
        localStorage.setItem(LS.EXERCISES, JSON.stringify(local));
      }

      // Cloud wins for quiz — prototype-safe
      if (qR.data && qR.data.length) {
        const local = Object.create(null);
        const existing = lsObj(LS.QUIZ);
        Object.assign(local, existing);
        for (const row of qR.data) {
          const k = String(row.quiz_key || "");
          if (!k || k === "__proto__" || k === "constructor" || k === "prototype") continue;
          local[k] = { answer_idx: row.answer_idx, correct: !!row.correct };
        }
        localStorage.setItem(LS.QUIZ, JSON.stringify(local));
      }

      // Tell app.js to re-render
      window.dispatchEvent(new Event("py30:synced"));
    } catch (err) {
      console.warn("[Sync] pull failed:", err && err.message);
    }
  }

  window.Sync = {
    push()  { if (loggedIn()) schedulePush(); },
    async pull() { if (loggedIn()) await _pullNow(); },
    onStateChange(_k, _v) { if (loggedIn()) schedulePush(); },
  };
})();
