/* =============================================
   30 DAYS OF PYTHON — APP LOGIC
   ============================================= */

const LEVELS = [
  { level: 1, name: "Beginner",   xp: 0 },
  { level: 2, name: "Apprentice", xp: 200 },
  { level: 3, name: "Coder",      xp: 500 },
  { level: 4, name: "Developer",  xp: 1000 },
  { level: 5, name: "Pythonista", xp: 2000 },
  { level: 6, name: "Master",     xp: 3500 },
  { level: 7, name: "Legend",     xp: 5000 },
];

const ACH_CATEGORIES = ["progress", "streaks", "xp", "mastery", "secret"];

const ACHIEVEMENTS = [
  // ── Progress (8) ──────────────────────────────────────────────────
  { id:"first_day",     cat:"progress", icon:"🐣", name:"First Step",       desc:"Finish Day 1.",
    check:c => c.completed.has(1) },
  { id:"three_days",    cat:"progress", icon:"🌱", name:"Getting Going",    desc:"Finish 3 lessons.",
    check:c => c.completedCount >= 3 },
  { id:"week_one",      cat:"progress", icon:"📅", name:"First Week Done",  desc:"Finish Days 1 through 7.",
    check:c => [1,2,3,4,5,6,7].every(d => c.completed.has(d)) },
  { id:"ten_days",      cat:"progress", icon:"🔟", name:"Double Digits",    desc:"Finish 10 lessons.",
    check:c => c.completedCount >= 10 },
  { id:"halfway",       cat:"progress", icon:"🏁", name:"Halfway There",    desc:"Finish 15 lessons.",
    check:c => c.completedCount >= 15 },
  { id:"twenty",        cat:"progress", icon:"🚀", name:"Home Stretch",     desc:"Finish 20 lessons.",
    check:c => c.completedCount >= 20 },
  { id:"twentyfive",    cat:"progress", icon:"🧗", name:"Almost There",     desc:"Finish 25 lessons.",
    check:c => c.completedCount >= 25 },
  { id:"all_done",      cat:"progress", icon:"🏆", name:"Python Conquered", desc:"Finish all 30 lessons.",
    check:c => c.completedCount >= 30 },

  // ── Streaks (6) ───────────────────────────────────────────────────
  { id:"streak_2",      cat:"streaks",  icon:"✌️",  name:"Back-to-Back",    desc:"Practice 2 days in a row.",
    check:c => c.streak >= 2 },
  { id:"streak_3",      cat:"streaks",  icon:"🔥", name:"On a Roll",        desc:"3-day streak.",
    check:c => c.streak >= 3 },
  { id:"streak_7",      cat:"streaks",  icon:"⚡", name:"Week Warrior",     desc:"7-day streak.",
    check:c => c.streak >= 7 },
  { id:"streak_14",     cat:"streaks",  icon:"🌟", name:"Two Weeks Strong", desc:"14-day streak.",
    check:c => c.streak >= 14 },
  { id:"streak_21",     cat:"streaks",  icon:"💫", name:"Habit Formed",     desc:"21-day streak.",
    check:c => c.streak >= 21 },
  { id:"streak_30",     cat:"streaks",  icon:"💎", name:"Unstoppable",      desc:"30-day streak.",
    check:c => c.streak >= 30 },

  // ── XP (7) ────────────────────────────────────────────────────────
  { id:"xp_100",        cat:"xp", icon:"⭐", name:"First Hundred",  desc:"Earn 100 XP.",
    check:c => c.xp >= 100 },
  { id:"xp_500",        cat:"xp", icon:"💪", name:"XP Grinder",     desc:"Earn 500 XP.",
    check:c => c.xp >= 500 },
  { id:"xp_1000",       cat:"xp", icon:"🎯", name:"Four Figures",   desc:"Earn 1000 XP.",
    check:c => c.xp >= 1000 },
  { id:"xp_2000",       cat:"xp", icon:"🤖", name:"XP Machine",     desc:"Earn 2000 XP.",
    check:c => c.xp >= 2000 },
  { id:"xp_3500",       cat:"xp", icon:"👑", name:"XP Royalty",     desc:"Earn 3500 XP.",
    check:c => c.xp >= 3500 },
  { id:"xp_5000",       cat:"xp", icon:"🦾", name:"Legend Tier",    desc:"Earn 5000 XP.",
    check:c => c.xp >= 5000 },
  { id:"level_max",     cat:"xp", icon:"🌈", name:"Maxed Out",      desc:"Reach the highest level.",
    check:c => state.level >= LEVELS.length },

  // ── Mastery (8) ───────────────────────────────────────────────────
  { id:"quiz_ace",      cat:"mastery", icon:"🧠", name:"Quiz Ace",        desc:"Answer 10 quiz questions correctly.",
    check:c => c.correctQuizzes >= 10 },
  { id:"quiz_scholar",  cat:"mastery", icon:"📚", name:"Quiz Scholar",    desc:"Answer 50 quiz questions correctly.",
    check:c => c.correctQuizzes >= 50 },
  { id:"perfect_1",     cat:"mastery", icon:"✅", name:"Flawless",        desc:"Finish a lesson with every quiz right and none wrong.",
    check:c => c.perfectDays.size >= 1 },
  { id:"perfect_5",     cat:"mastery", icon:"🎖️",  name:"Five Flawless",   desc:"Get 5 perfect lessons.",
    check:c => c.perfectDays.size >= 5 },
  { id:"exercises_all_1", cat:"mastery", icon:"📝", name:"Day 1 Expert",  desc:"Finish every Day 1 exercise.",
    check:c => allDayExercisesDone(1, c) },
  { id:"data_wrangler", cat:"mastery", icon:"🗃️",  name:"Data Wrangler",  desc:"Finish Days 5 through 8.",
    check:c => [5,6,7,8].every(d => c.completed.has(d)) },
  { id:"func_fluent",   cat:"mastery", icon:"⚙️",  name:"Function Fluent", desc:"Finish the functions lessons (Days 11, 13, 14).",
    check:c => [11,13,14].every(d => c.completed.has(d)) },
  { id:"web_ready",     cat:"mastery", icon:"🌐", name:"Web Ready",       desc:"Finish the web and API lessons (Days 26, 28, 29).",
    check:c => [26,28,29].every(d => c.completed.has(d)) },

  // ── Secret (8) — show as ??? until unlocked ───────────────────────
  { id:"night_owl",     cat:"secret", secret:true, icon:"🦉", name:"Night Owl",
    desc:"Finish a lesson after midnight.",        check:c => c.flags.nightOwl },
  { id:"early_bird",    cat:"secret", secret:true, icon:"🐦", name:"Early Bird",
    desc:"Finish a lesson before 6 in the morning.", check:c => c.flags.earlyBird },
  { id:"comeback",      cat:"secret", secret:true, icon:"🔄", name:"Welcome Back",
    desc:"Return after a 7+ day break.",           check:c => c.flags.comeback },
  { id:"no_ai_week",    cat:"secret", secret:true, icon:"🧗", name:"Self-Reliant",
    desc:"Finish 7 lessons without the AI tutor.", check:c => [...c.completed].filter(d => !c.aiUsedDays.has(d)).length >= 7 },
  { id:"weekend",       cat:"secret", secret:true, icon:"🛋️", name:"Weekend Coder",
    desc:"Practice on a Saturday or Sunday.",      check:c => c.flags.weekend },
  { id:"two_in_a_day",  cat:"secret", secret:true, icon:"⚡", name:"Two in a Sitting",
    desc:"Finish two lessons in the same day.",    check:c => c.flags.twoInADay },
  { id:"perfectionist", cat:"secret", secret:true, icon:"💯", name:"Perfectionist",
    desc:"Get 10 perfect lessons.",                check:c => c.perfectDays.size >= 10 },
  { id:"completionist", cat:"secret", secret:true, icon:"🌟", name:"Completionist",
    desc:"Unlock every other achievement.",        check:_c => {
      const total = ACHIEVEMENTS.filter(a => !a.secret && a.id !== "completionist").length;
      return ACHIEVEMENTS.filter(a => !a.secret && a.id !== "completionist" && state.achievements.has(a.id)).length >= total;
    } },
];

// Keep BADGES pointing at the same data for any code that still references it
const BADGES = ACHIEVEMENTS;

const state = {
  currentDay: 1,
  completed: new Set(),
  exercises: {},
  quizAnswers: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  badges: new Set(),        // legacy key; same Set as achievements for back-compat
  achievements: new Set(),  // canonical unlocked achievement ids
  perfectDays: new Set(),   // days where all quizzes answered correctly
  flags: {},                // sticky booleans: nightOwl, earlyBird, weekend, comeback, twoInADay
  aiUsedDays: new Set(),
  solutionUsed: {},
};

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  buildPreviewGrid();
  buildSidebar();
  initLandingAnimations();
  renderTopbarStats();
  initAiTutorHooks();
});

// When Pro state changes (login, refresh, after payment), re-render anything
// that shows lock badges or the lock screen.
window.addEventListener("pro:updated", () => {
  buildPreviewGrid();
  buildSidebar();
  // If the user is currently on a locked day's lock screen, re-load that day —
  // if they just paid, it will now render the real content.
  const appVisible = !document.getElementById("app")?.classList.contains("hidden");
  if (appVisible && state.currentDay >= 4) {
    loadDay(state.currentDay);
  }
});

// ─── PERSISTENCE ──────────────────────────────
function loadState() {
  try {
    const c = localStorage.getItem("py30_completed");
    if (c) {
      const parsed = JSON.parse(c);
      if (Array.isArray(parsed)) state.completed = new Set(parsed);
    }
    const e = localStorage.getItem("py30_exercises");
    if (e) state.exercises = JSON.parse(e);
    const q = localStorage.getItem("py30_quiz");
    if (q) state.quizAnswers = JSON.parse(q);
    const xp = localStorage.getItem("py30_xp");
    if (xp !== null) state.xp = parseInt(xp, 10) || 0;
    const lv = localStorage.getItem("py30_level");
    if (lv !== null) {
      const parsed = parseInt(lv, 10);
      state.level = (parsed >= 1 && parsed <= LEVELS.length) ? parsed : 1;
    }
    const sk = localStorage.getItem("py30_streak");
    if (sk !== null) state.streak = parseInt(sk, 10) || 0;
    const lad = localStorage.getItem("py30_last_active");
    if (lad) state.lastActiveDate = lad;
    // Load achievements; migrate from old py30_badges if no achievements key yet
    const ach = localStorage.getItem("py30_achievements");
    if (ach) {
      state.achievements = new Set(JSON.parse(ach));
    } else {
      // Migrate: old badge ids are valid achievement ids; bring them forward
      const bd = localStorage.getItem("py30_badges");
      if (bd) state.achievements = new Set(JSON.parse(bd));
    }
    state.badges = state.achievements; // keep alias in sync

    const pd = localStorage.getItem("py30_perfect_days");
    if (pd) state.perfectDays = new Set(JSON.parse(pd));
    const fl = localStorage.getItem("py30_flags");
    if (fl) state.flags = JSON.parse(fl);

    const ai = localStorage.getItem("py30_ai_days");
    if (ai) state.aiUsedDays = new Set(JSON.parse(ai));
  } catch (_) {}
}

function saveState() {
  localStorage.setItem("py30_completed", JSON.stringify([...state.completed]));
  localStorage.setItem("py30_exercises", JSON.stringify(state.exercises));
  localStorage.setItem("py30_quiz", JSON.stringify(state.quizAnswers));
  localStorage.setItem("py30_xp", state.xp);
  localStorage.setItem("py30_level", state.level);
  localStorage.setItem("py30_streak", state.streak);
  if (state.lastActiveDate) localStorage.setItem("py30_last_active", state.lastActiveDate);
  localStorage.setItem("py30_achievements", JSON.stringify([...state.achievements]));
  localStorage.setItem("py30_badges", JSON.stringify([...state.achievements])); // keep old key for back-compat
  localStorage.setItem("py30_perfect_days", JSON.stringify([...state.perfectDays]));
  localStorage.setItem("py30_flags", JSON.stringify(state.flags));
  localStorage.setItem("py30_ai_days", JSON.stringify([...state.aiUsedDays]));
}

// ─── GAMIFICATION ─────────────────────────────
function updateStreak() {
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (!state.lastActiveDate) {
    state.streak = 1;
  } else if (state.lastActiveDate === today) {
    return; // already active today, no change
  } else {
    const last = new Date(state.lastActiveDate);
    const now = new Date(today);
    const diffDays = Math.round((now - last) / 86400000);
    if (diffDays === 1) {
      state.streak += 1;
    } else {
      if (diffDays >= 7 && state.flags) state.flags.comeback = true;
      state.streak = 1;
    }
  }
  state.lastActiveDate = today;
}

function checkLevel() {
  let newLevel = 1;
  for (const lvl of LEVELS) {
    if (state.xp >= lvl.xp) newLevel = lvl.level;
  }
  if (newLevel > state.level) {
    state.level = newLevel;
    const lvlData = LEVELS.find(l => l.level === newLevel);
    showLevelUpBanner(lvlData);
  }
}

// ─── ACHIEVEMENT HELPERS ───────────────────────────────────────────────────

function allDayExercisesDone(dayNum, ctx) {
  const day = typeof DAYS !== "undefined" ? DAYS.find(d => d.day === dayNum) : null;
  if (!day) return false;
  const saved = ctx.exercises["day_" + dayNum] || {};
  const levels = ["level1", "level2", "level3"];
  const allIds = levels.flatMap(key =>
    (day.exercises[key] || []).map((_, i) => `${key}_${i}`)
  );
  return allIds.length > 0 && allIds.every(id => saved[id]);
}

function buildAchContext() {
  const correctTotal = Object.values(state.quizAnswers)
    .flatMap(day => Object.values(day))
    .filter(a => a.correct).length;
  return {
    completed:     state.completed,
    completedCount: state.completed.size,
    xp:            state.xp,
    streak:        state.streak,
    correctQuizzes: correctTotal,
    perfectDays:   state.perfectDays,
    flags:         state.flags,
    exercises:     state.exercises,
    aiUsedDays:    state.aiUsedDays,
  };
}

function checkAchievements() {
  const ctx = buildAchContext();
  const unlocked = [];
  for (const a of ACHIEVEMENTS) {
    if (state.achievements.has(a.id)) continue;
    try {
      if (a.check(ctx)) {
        state.achievements.add(a.id);
        state.badges = state.achievements; // keep alias
        unlocked.push(a);
      }
    } catch (_) {}
  }
  if (unlocked.length) {
    unlocked.forEach(a => enqueueAchievementPopup(a));
    renderTopbarStats();
    saveState();
    if (window.Sync) window.Sync.push();
  }
}

// Legacy alias so any outside callers don't break
function checkBadges() { checkAchievements(); }

function awardXP(amount) {
  if (amount < 0) {
    state.xp = Math.max(0, state.xp + amount);
    renderTopbarStats();
    saveState();
    return;
  }
  state.xp += amount;
  updateStreak();
  checkLevel();
  checkAchievements();
  renderTopbarStats();
  saveState();
}

function renderTopbarStats() {
  const lvlData = LEVELS.find(l => l.level === state.level) || LEVELS[0];
  const nextLvl = LEVELS.find(l => l.level === state.level + 1);
  const xpForThis = lvlData.xp;
  const xpForNext = nextLvl ? nextLvl.xp : lvlData.xp;
  const xpProgress = nextLvl ? Math.min(((state.xp - xpForThis) / (xpForNext - xpForThis)) * 100, 100) : 100;

  const elLevel = document.getElementById("statLevel");
  const elLevelName = document.getElementById("statLevelName");
  const elXpFill = document.getElementById("statXpFill");
  const elXpText = document.getElementById("statXpText");
  const elStreak = document.getElementById("statStreak");
  const elBadges = document.getElementById("topbarBadges");

  if (elLevel) elLevel.textContent = state.level;
  if (elLevelName) elLevelName.textContent = lvlData.name;
  if (elXpFill) elXpFill.style.width = xpProgress + "%";
  if (elXpText) elXpText.textContent = nextLvl ? `${state.xp - xpForThis} / ${xpForNext - xpForThis} XP` : "MAX";
  if (elStreak) elStreak.textContent = state.streak;
  if (elBadges) {
    const achCount = state.achievements ? state.achievements.size : state.badges.size;
    const countEl = elBadges.querySelector("#topbarBadgeCount");
    if (countEl) countEl.textContent = achCount;
    else elBadges.textContent = `${achCount} achievements`;
  }
}

// Build a toast safely. All inputs are inserted as text — no HTML injection.
// Pass `prefix` (plain text), an optional `strong` segment (rendered bold),
// and an optional `suffix` (plain text).
function showToast(prefix, strong, suffix) {
  const toast = document.createElement("div");
  toast.className = "gamification-toast";
  if (prefix) toast.appendChild(document.createTextNode(prefix));
  if (strong) {
    const s = document.createElement("strong");
    s.textContent = strong;
    toast.appendChild(s);
  }
  if (suffix) toast.appendChild(document.createTextNode(suffix));
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}



function flagAiUsed() {
  if (state.aiUsedDays.has(state.currentDay)) return;
  state.aiUsedDays.add(state.currentDay);
  saveState();
  // Update warning banner if visible
  const banner = document.getElementById("aiWarningBanner");
  if (banner) banner.classList.remove("hidden");
}

function initAiTutorHooks() {
  const origSend = window.sendTutorMessage;
  if (origSend) {
    window.sendTutorMessage = function() {
      flagAiUsed();
      return origSend.apply(this, arguments);
    };
  }
  const origToggle = window.toggleTutor;
  if (origToggle) {
    window.toggleTutor = function() {
      origToggle.apply(this, arguments);
      // Show warning banner when panel opens
      const panel = document.getElementById("tutorPanel");
      if (panel && panel.classList.contains("open")) {
        const banner = document.getElementById("aiWarningBanner");
        if (banner) {
          const used = state.aiUsedDays.has(state.currentDay);
          banner.classList.remove("hidden");
          banner.textContent = used
            ? "⚠️ AI help used; this day will give 50 XP on completion."
            : "⚠️ Asking the AI will reduce this day's XP to 50 when you complete it.";
        }
      }
    };
  }
}

// ─── LANDING PREVIEW GRID ─────────────────────
function buildPreviewGrid() {
  const grid = document.getElementById("previewGrid");
  grid.innerHTML = "";
  const locked = (i) => i >= 4 && window.Pro && !window.Pro.isPro();
  for (let i = 1; i <= 30; i++) {
    const day = DAYS[i - 1];
    const done = state.completed.has(i);
    const isLocked = locked(i);
    const d = document.createElement("div");
    d.className = "preview-day" + (done ? " done" : "") + (isLocked ? " locked" : "");
    d.title = day ? day.title : "";
    d.innerHTML = `
      <span class="preview-day-num">${done ? "✓ " : ""}${String(i).padStart(2, "0")}</span>
      <span class="preview-day-emoji">${day ? day.emoji : ""}</span>
      <span class="preview-day-name">${day ? day.title : ""}</span>
      ${isLocked ? '<span class="preview-day-lock">🔒</span>' : ""}
    `;
    d.style.animationDelay = `${i * 28}ms`;
    grid.appendChild(d);
  }
}

// ─── SIDEBAR ──────────────────────────────────
function buildSidebar() {
  const nav = document.getElementById("dayNav");
  nav.innerHTML = "";
  DAYS.forEach((d) => {
    const item = document.createElement("div");
    const done = state.completed.has(d.day);
    const active = d.day === state.currentDay;
    const isLocked = d.day >= 4 && window.Pro && !window.Pro.isPro();
    item.className =
      "day-nav-item" +
      (done ? " done" : "") +
      (active ? " active" : "") +
      (isLocked ? " locked" : "");
    item.dataset.day = d.day;
    item.innerHTML = `
      <span class="day-nav-num">${String(d.day).padStart(2, "0")}</span>
      <span class="day-nav-emoji">${d.emoji}</span>
      <span class="day-nav-title">${d.title}</span>
      <span class="day-nav-check">${isLocked ? "🔒" : ""}</span>
    `;
    item.onclick = () => {
      loadDay(d.day);
      closeSidebarOnMobile();
    };
    nav.appendChild(item);
  });
  updateProgress();
}

function updateProgress() {
  const done = state.completed.size;
  const el = document.getElementById("progressText");
  if (el) el.textContent = done + " / 30 complete";
  const topbarEl = document.getElementById("topbarProgressText");
  if (topbarEl) topbarEl.textContent = done + " / 30 complete";
  const bar = document.getElementById("progressPopupBar");
  if (bar) bar.style.width = ((done / 30) * 100) + "%";
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("open");
  }
}

// ─── NAVIGATION ───────────────────────────────
function startLearning(dayNum = 1) {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  loadDay(dayNum);
}

function goHome() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("landing").classList.remove("hidden");
  buildPreviewGrid();
  // Re-trigger scroll reveals for sections now visible
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add("visible");
    });
  }, 50);
}

function navigate(dir) {
  const next = state.currentDay + dir;
  if (next >= 1 && next <= DAYS.length) loadDay(next);
}

function loadDay(n) {
  if (window.Playground) window.Playground.unmount();
  state.currentDay = n;
  const day = DAYS[n - 1];
  if (!day) return;

  // Paywall: Days 4–30 require Pro. Render the lock screen instead of the lesson.
  if (n >= 4 && window.Pro && !window.Pro.isPro()) {
    document.querySelectorAll(".day-nav-item").forEach((el) => {
      el.classList.toggle("active", +el.dataset.day === n);
    });
    const btn = document.getElementById("completeBtn");
    if (btn) { btn.className = "complete-btn"; btn.textContent = "Mark Complete ✓"; btn.disabled = true; }
    document.getElementById("prevBtn").disabled = n === 1;
    document.getElementById("nextBtn").disabled = n >= DAYS.length;
    document.getElementById("contentWrap").innerHTML = renderLockScreen();
    buildDayDots(n);
    document.getElementById("contentWrap").scrollTop = 0;
    return;
  }

  // topbarDay removed — progress shown in sidebar badge only
  const btn = document.getElementById("completeBtn");
  const done = state.completed.has(n);
  btn.className = "complete-btn" + (done ? " done" : "");
  btn.textContent = done ? "Completed ✓" : "Mark Complete ✓";
  btn.disabled = false;

  document.querySelectorAll(".day-nav-item").forEach((el) => {
    el.classList.toggle("active", +el.dataset.day === n);
  });

  document.getElementById("prevBtn").disabled = n === 1;
  document.getElementById("nextBtn").disabled = n >= DAYS.length;

  if (!day) {
    document.getElementById("contentWrap").innerHTML = `<div style="padding:60px;text-align:center;opacity:0.6"><h2>Coming Soon</h2><p>This lesson is still being written. Check back soon!</p></div>`;
    return;
  }
  document.getElementById("contentWrap").innerHTML = renderDay(day);

  setTimeout(() => {
    if (window.Prism) Prism.highlightAll();
  }, 60);
  setTimeout(initTabIndicator, 40);

  buildDayDots(n);
  document.getElementById("contentWrap").scrollTop = 0;
}

function buildDayDots(current) {
  const container = document.getElementById("dayDots");
  const start = Math.max(1, current - 2);
  const end = Math.min(30, start + 4);
  container.innerHTML = "";
  for (let i = start; i <= end; i++) {
    const dot = document.createElement("div");
    dot.className =
      "day-dot" +
      (i === current ? " active" : "") +
      (state.completed.has(i) ? " done" : "");
    dot.onclick = () => loadDay(i);
    container.appendChild(dot);
  }
}

// ─── RENDER ───────────────────────────────────
function renderLockScreen() {
  return `
    <div class="day-lock-screen">
      <div class="day-lock-card">
        <div class="day-lock-emoji">🔒</div>
        <h1 class="day-lock-title">Unlock the full 30 Days of Python</h1>
        <p class="day-lock-sub">Days 1–3 are free. Pay <strong>$15 once</strong> to unlock the remaining 27 days. Learn forever.</p>
        <ul class="day-lock-bullets">
          <li>✓ All 30 days of lessons</li>
          <li>✓ Exercises and quizzes</li>
          <li>✓ Unlimited access on any device</li>
        </ul>
        <button class="day-lock-cta" onclick="window.Pro && window.Pro.unlock()">Unlock for $15</button>
        <p class="day-lock-note">Includes Apple Pay, Google Pay, and all major cards.</p>
      </div>
    </div>
  `;
}

function renderDay(day) {
  let safeLesson;
  if (typeof DOMPurify !== "undefined") {
    safeLesson = DOMPurify.sanitize(day.lesson);
  } else {
    console.error("DOMPurify missing — refusing to render unsanitized lesson HTML.");
    safeLesson = "<p style='color:#fca5a5'>Lesson failed to load. Please refresh.</p>";
  }
  return `
    <div class="day-hero">
      <div class="day-tag">Day ${day.day} &middot; ${day.emoji}</div>
      <h1>${day.title}</h1>
      <p class="day-hero-subtitle">${day.subtitle}</p>
    </div>
    <div class="tabs-wrap" id="tabsWrap">
      <button class="tab-btn active" onclick="switchTab(this,'learn')">📖 Learn</button>
      <button class="tab-btn" onclick="switchTab(this,'examples')">💻 Examples</button>
      <button class="tab-btn" onclick="switchTab(this,'exercises')">✏️ Exercises</button>
      <button class="tab-btn" onclick="switchTab(this,'playground')">🎮 Playground</button>
      <div class="tab-indicator" id="tabIndicator"></div>
    </div>
    <div id="panel-learn" class="tab-panel active">${safeLesson}</div>
    <div id="panel-examples" class="tab-panel">${renderExamples(day.examples)}</div>
    <div id="panel-exercises" class="tab-panel">${renderExercisesTab(day)}</div>
    <div id="panel-playground" class="tab-panel">${renderPlayground(day)}</div>
  `;
}

function renderPlayground(day) {
  const starter = (day.examples && day.examples[0] && day.examples[0].code)
    ? day.examples[0].code
    : "# Try it out!\nprint('Hello, Python!')\n";
  return `
    <div class="playground-card">
      <div class="playground-header">
        <div class="example-dots">
          <div class="example-dot dot-red"></div>
          <div class="example-dot dot-yellow"></div>
          <div class="example-dot dot-green"></div>
        </div>
        <span class="playground-title">Day ${day.day} Playground</span>
        <span class="playground-status" id="playgroundStatus">Press Run to start Python.</span>
      </div>
      <div id="aceEditor" class="ace-editor-mount" data-starter="${escapeAttr(starter)}"></div>
      <div class="playground-actions">
        <button class="run-btn" onclick="window.Playground.run()">▶ Run</button>
        <button class="run-btn ghost" onclick="window.Playground.clearOutput()">Clear output</button>
        <button class="run-btn ghost" onclick="window.Playground.reset(DAYS[${day.day - 1}])">↺ Reset code</button>
      </div>
      <div class="playground-output-wrap">
        <div class="playground-output-label">Output</div>
        <pre class="playground-out" id="playgroundOut"></pre>
      </div>
    </div>
  `;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderExamples(examples) {
  if (!examples || !examples.length)
    return '<p style="color:var(--text-3);padding:40px">No examples for this day.</p>';
  return examples
    .map(
      (ex) => `
    <div class="example-card">
      <div class="example-header">
        <div class="example-dots">
          <div class="example-dot dot-red"></div>
          <div class="example-dot dot-yellow"></div>
          <div class="example-dot dot-green"></div>
        </div>
        <span class="example-title">${ex.title}</span>
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
      </div>
      ${ex.desc ? `<div class="example-desc">${ex.desc}</div>` : ""}
      <div class="example-code">
        <pre><code class="language-python">${escapeHtml(ex.code)}</code></pre>
      </div>
    </div>
  `,
    )
    .join("");
}

function renderExercisesTab(day) {
  const levels = [
    { key: "level1", label: "Level 1", sublabel: "Beginner", cls: "level-1" },
    {
      key: "level2",
      label: "Level 2",
      sublabel: "Intermediate",
      cls: "level-2",
    },
    { key: "level3", label: "Level 3", sublabel: "Advanced", cls: "level-3" },
  ];
  const exKey = `day_${day.day}`;
  const saved = state.exercises[exKey] || {};

  const exercisesHtml =
    `<div class="exercises-section">` +
    levels
      .map((level) => {
        const items = (day.exercises || {})[level.key] || [];
        if (!items.length) return "";
        return `
        <div class="level-section ${level.cls}">
          <div class="level-header">
            <span class="level-badge">${level.label}</span>
            <span class="level-title">${level.sublabel}</span>
          </div>
          ${items
            .map((ex, i) => {
              const id = `${level.key}_${i}`;
              const checked = !!saved[id];
              return `
              <div class="exercise-item${checked ? " checked" : ""}" onclick="toggleExercise(this,'${exKey}','${id}')">
                <div class="exercise-checkbox">${checked ? "✓" : ""}</div>
                <div style="flex:1">
                  <div class="exercise-num">${level.label.replace("Level ", "L")}.${i + 1}</div>
                  <div class="exercise-text">${ex}</div>
                  <button class="exercise-example-btn" onclick="event.stopPropagation(); toggleExerciseExample(this)">💡 Example</button>
                  <div class="exercise-example-box hidden">
                    <div class="exercise-example-content">
                      Try it step by step: read the task carefully, write your code in the editor above, then run it to see if it works. If you're stuck, look at today's lesson examples for hints.
                    </div>
                  </div>
                </div>
              </div>`;
            })
            .join("")}
        </div>`;
      })
      .join("") +
    `</div>`;

  const quizHtml =
    day.quiz && day.quiz.length ? renderQuiz(day.quiz, day.day) : "";
  return exercisesHtml + quizHtml;
}

function renderQuiz(questions, dayNum) {
  const qKey = `day_${dayNum}`;
  const saved = state.quizAnswers[qKey] || {};
  const answered = Object.keys(saved).length;
  const correct = Object.values(saved).filter((v) => v.correct).length;
  const pct =
    questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;

  const scoreBar =
    answered > 0
      ? `
    <div class="quiz-score-bar">
      <div>
        <div class="quiz-score-num">${correct}/${questions.length}</div>
        <div class="quiz-score-label">correct answers</div>
      </div>
      <div class="quiz-score-fill-wrap">
        <div class="quiz-score-fill" style="width:${pct}%"></div>
      </div>
      <div style="font-family:'Fira Code',monospace;font-size:16px;font-weight:800;color:var(--accent-bright)">${pct}%</div>
    </div>`
      : "";

  const questionsHtml = questions
    .map((q, qi) => {
      const prev = saved[qi];
      const letters = ["A", "B", "C", "D"];
      const opts = q.opts
        .map((opt, oi) => {
          let cls = "";
          if (prev !== undefined) {
            if (oi === q.answer) cls = "correct";
            else if (oi === prev.chosen) cls = "wrong";
          }
          return `
        <button class="quiz-opt ${cls}" ${prev !== undefined ? "disabled" : ""}
          onclick="answerQuiz(this, ${dayNum}, ${qi}, ${oi}, ${q.answer})">
          <span class="quiz-opt-letter">${letters[oi]}</span>
          ${opt}
        </button>`;
        })
        .join("");

      const feedback =
        prev !== undefined
          ? `
      <div class="quiz-feedback ${prev.correct ? "correct" : "wrong"} show">
        ${prev.correct ? "✓ Correct!" : `✗ Incorrect. The right answer is: <strong>${q.opts[q.answer]}</strong>`}
        ${q.explain ? `<br><span style="font-weight:400;opacity:0.85">${q.explain}</span>` : ""}
      </div>`
          : '<div class="quiz-feedback"></div>';

      const solutionBtn = prev === undefined
        ? `<button class="quiz-solution-btn" onclick="revealQuizSolution(this, ${dayNum}, ${qi}, ${q.answer})">📖 Show Solution <span class="xp-cost">-30 XP</span></button>`
        : "";
      return `
      <div class="quiz-card">
        <div class="quiz-question">
          <span>Q${qi + 1}</span>
          ${q.q}
        </div>
        <div class="quiz-options">${opts}</div>
        ${feedback}
        ${solutionBtn}
      </div>`;
    })
    .join("");

  return `
    <div class="quiz-section">
      <h3 class="quiz-header">Quick Quiz</h3>
      <p class="quiz-subtext">Test your understanding of Day ${dayNum}. Click an option to check your answer.</p>
      ${scoreBar}
      ${questionsHtml}
    </div>`;
}

// ─── TABS ─────────────────────────────────────
function switchTab(btn, panelId) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  const panel = document.getElementById("panel-" + panelId);
  if (panel) {
    panel.classList.add("active");
    if (panelId === "examples" && window.Prism)
      setTimeout(() => Prism.highlightAll(), 60);
    if (panelId === "playground" && window.Playground) {
      setTimeout(() => window.Playground.mount(DAYS[state.currentDay - 1]), 30);
    }
  }
  moveTabIndicator(btn);
}

function moveTabIndicator(activeBtn) {
  const indicator = document.getElementById("tabIndicator");
  if (!indicator || !activeBtn) return;
  const wrap = activeBtn.closest(".tabs-wrap");
  if (!wrap) return;
  const wrapRect = wrap.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  indicator.style.left = btnRect.left - wrapRect.left + "px";
  indicator.style.width = btnRect.width + "px";
}

function initTabIndicator() {
  const activeTab = document.querySelector(".tab-btn.active");
  if (activeTab) setTimeout(() => moveTabIndicator(activeTab), 30);
}

// ─── COMPLETE ─────────────────────────────────
function allExercisesDone(dayNum) {
  const day = DAYS[dayNum - 1];
  if (!day || !day.exercises) return true; // no exercises = no gate
  const exKey = `day_${dayNum}`;
  const saved = state.exercises[exKey] || {};
  const levels = ["level1", "level2", "level3"];
  const allIds = levels.flatMap(key =>
    (day.exercises[key] || []).map((_, i) => `${key}_${i}`)
  );
  if (allIds.length === 0) return true;
  return allIds.every(id => !!saved[id]);
}

function showExerciseGateNotification() {
  const existing = document.getElementById("exerciseGateNotif");
  if (existing) return; // don't stack duplicates
  const notif = document.createElement("div");
  notif.id = "exerciseGateNotif";
  notif.className = "exercise-gate-notif";
  notif.innerHTML = `
    <span>📝 Complete all exercises first before marking this day done!</span>
    <button onclick="this.parentElement.remove()" class="gate-notif-close">✕</button>
  `;
  document.body.appendChild(notif);
  requestAnimationFrame(() => notif.classList.add("show"));
  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 400);
  }, 4000);
}

function toggleComplete() {
  const n = state.currentDay;
  if (state.completed.has(n)) {
    state.completed.delete(n);
  } else {
    if (!allExercisesDone(n)) {
      showExerciseGateNotification();
      return;
    }
    state.completed.add(n);

    // Track lightweight flags for secret achievements
    const _now = new Date();
    const _hour = _now.getHours();
    const _dow = _now.getDay(); // 0 = Sunday, 6 = Saturday
    if (_hour >= 0 && _hour < 5)  state.flags.nightOwl  = true;
    if (_hour >= 5 && _hour < 6)  state.flags.earlyBird = true;
    if (_dow === 0 || _dow === 6) state.flags.weekend   = true;

    // Two-in-a-day: second completion on the same calendar date
    const _today = `${_now.getFullYear()}-${String(_now.getMonth()+1).padStart(2,'0')}-${String(_now.getDate()).padStart(2,'0')}`;
    if (state.flags._lastCompletionDate === _today) {
      state.flags.twoInADay = true;
    }
    state.flags._lastCompletionDate = _today;

    // Perfect-day: all quizzes answered correctly for this day with zero wrong
    const _qKey = "day_" + n;
    const _dayAnswers = Object.values(state.quizAnswers[_qKey] || {});
    if (_dayAnswers.length > 0 && _dayAnswers.every(a => a.correct)) {
      state.perfectDays.add(n);
    }

    playCompletion(n);
    const xpForDay = state.aiUsedDays.has(n) ? 50 : 100;
    awardXP(xpForDay);
  }
  const done = state.completed.has(n);
  const btn = document.getElementById("completeBtn");
  btn.className = "complete-btn" + (done ? " done" : "");
  btn.textContent = done ? "✓ Completed" : "✓ Mark Complete";
  // topbarDay removed — progress shown in sidebar badge only

  const navItem = document.querySelector(`.day-nav-item[data-day="${n}"]`);
  if (navItem) {
    navItem.classList.toggle("done", done);
  }
  updateProgress();
  if (!done) saveState();
  buildDayDots(n);
}

// ─── COMPLETION ANIMATION ENGINE ──────────────────────────────────────

const DAY_CATEGORY = {
  1:"foundations",2:"foundations",3:"foundations",4:"foundations",
  5:"data",6:"data",7:"data",8:"data",
  9:"foundations",10:"foundations",
  11:"functions",12:"tools",13:"functions",14:"functions",
  15:"foundations",16:"tools",17:"foundations",
  19:"tools",20:"tools",21:"functions",
  22:"web",23:"tools",24:"data",25:"data",
  26:"web",27:"web",28:"web",29:"web",30:"foundations",
};

const CATEGORY_STYLE = {
  foundations: { colors: ["#FFD43B","#4B8BBE","#FFFFFF"], style: "burst" },
  data:        { colors: ["#3ECF8E","#4B8BBE","#FFD43B"], style: "fountain" },
  functions:   { colors: ["#A78BFA","#FFD43B","#FFFFFF"], style: "spiral" },
  tools:       { colors: ["#FFBD2E","#4B8BBE","#3ECF8E"], style: "sideCannons" },
  web:         { colors: ["#4B8BBE","#3ECF8E","#FFD43B","#FFFFFF"], style: "fireworks" },
};

const COMPLETION_MSGS = [
  "Day {n} done. Keep that momentum going.",
  "Solid work on Day {n}. You're making real progress.",
  "Day {n} in the books. Python is getting clearer.",
  "Finished Day {n}. Consistency is how you get good.",
  "Day {n} complete. You're writing real Python now.",
  "Great job on Day {n}. Every day builds on the last.",
];

function getDayCategory(n) {
  return DAY_CATEGORY[n] || "foundations";
}

function playCompletion(n) {
  const reduceMotion = document.documentElement.classList.contains("reduce-motion");
  const cat = getDayCategory(n);
  const { colors, style } = CATEGORY_STYLE[cat];
  const milestone = [1, 7, 15, 30].includes(n);
  const msg = COMPLETION_MSGS[(n - 1) % COMPLETION_MSGS.length].replace("{n}", n);
  showToast(msg, "", "");

  // Hide the old celebration modal if visible
  const cel = document.getElementById("celebration");
  if (cel) cel.classList.add("hidden");

  if (reduceMotion || typeof confetti !== "function") return;

  if (milestone) {
    runGrandFinale(colors);
  } else {
    runConfettiStyle(style, colors);
  }
}

function runConfettiStyle(style, colors) {
  const opts = { colors, disableForReducedMotion: true };
  if (style === "burst") {
    confetti({ ...opts, particleCount: 90, spread: 80, origin: { y: 0.55 }, startVelocity: 38 });
  } else if (style === "fountain") {
    let count = 0;
    const interval = setInterval(() => {
      confetti({ ...opts, particleCount: 12, spread: 55, origin: { x: 0.5, y: 0.75 }, startVelocity: 45, angle: 90 });
      if (++count >= 7) clearInterval(interval);
    }, 120);
  } else if (style === "spiral") {
    let angle = 60;
    let count = 0;
    const interval = setInterval(() => {
      confetti({ ...opts, particleCount: 10, spread: 30, angle, origin: { x: 0.5, y: 0.6 }, startVelocity: 42 });
      angle = angle === 60 ? 120 : 60;
      if (++count >= 8) clearInterval(interval);
    }, 100);
  } else if (style === "sideCannons") {
    confetti({ ...opts, particleCount: 60, spread: 55, angle: 60,  origin: { x: 0.0, y: 0.6 } });
    confetti({ ...opts, particleCount: 60, spread: 55, angle: 120, origin: { x: 1.0, y: 0.6 } });
  } else if (style === "fireworks") {
    const positions = [{ x: 0.25, y: 0.35 }, { x: 0.75, y: 0.35 }, { x: 0.5, y: 0.25 }];
    positions.forEach((pos, i) => {
      setTimeout(() => {
        confetti({ ...opts, particleCount: 55, spread: 70, origin: pos, startVelocity: 50, decay: 0.91 });
      }, i * 200);
    });
  }
}

function runGrandFinale(colors) {
  // Intensive version for milestone days (1, 7, 15, 30)
  const gold = ["#FFD43B","#FFC300","#FFFFFF","#FFD43B"];
  const mixed = [...colors, ...gold];
  const opts = { colors: mixed, disableForReducedMotion: true, scalar: 1.1 };

  // Three-burst pattern
  setTimeout(() => confetti({ ...opts, particleCount: 120, spread: 100, origin: { y: 0.5 }, startVelocity: 50 }), 0);
  setTimeout(() => {
    confetti({ ...opts, particleCount: 80, spread: 60, angle: 55,  origin: { x: 0, y: 0.6 } });
    confetti({ ...opts, particleCount: 80, spread: 60, angle: 125, origin: { x: 1, y: 0.6 } });
  }, 300);
  setTimeout(() => confetti({ ...opts, particleCount: 100, spread: 120, origin: { x: 0.5, y: 0.6 }, startVelocity: 40 }), 700);
}

function hideCelebration() {
  const cel = document.getElementById("celebration");
  if (cel) cel.classList.add("hidden");
}

// ─── FULL-SCREEN ACHIEVEMENT POPUP SYSTEM ─────────────────────────────────

const _achQueue = [];
let _achPlaying = false;

function enqueueAchievementPopup(ach) {
  _achQueue.push(ach);
  if (!_achPlaying) _drainAchQueue();
}

function _drainAchQueue() {
  const ach = _achQueue.shift();
  if (!ach) { _achPlaying = false; return; }
  _achPlaying = true;
  _playAchPopup(ach, () => _drainAchQueue());
}

function _achPopupHtml(ach) {
  return `
    <div class="ach-popup-bg"></div>
    <div class="ach-popup-card">
      <div class="ach-popup-shockwave"></div>
      <div class="ach-popup-seal">${ach.icon}</div>
      <div class="ach-popup-tag">Achievement Unlocked</div>
      <div class="ach-popup-name">${ach.name}</div>
      <div class="ach-popup-desc">${ach.desc}</div>
      <div class="ach-popup-hint">Tap anywhere to continue</div>
    </div>`;
}

function _playAchPopup(ach, done) {
  const reduceMotion = document.documentElement.classList.contains("reduce-motion");
  if (reduceMotion) {
    showToast(ach.icon + " ", ach.name, " unlocked");
    setTimeout(done, 0);
    return;
  }
  const layer = document.getElementById("achPopupLayer");
  if (!layer) { done(); return; }

  layer.innerHTML = _achPopupHtml(ach);
  layer.classList.remove("hidden");

  // Small burst of confetti centered on the seal
  requestAnimationFrame(() => {
    layer.classList.add("playing");
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: 0.5, y: 0.45 },
        colors: ["#D4AF37","#FFD700","#FFFFFF","#F5F5DC"],
        startVelocity: 42,
        gravity: 0.85,
        disableForReducedMotion: true,
      });
    }
    playChime();
  });

  let dismissed = false;
  const finish = () => {
    if (dismissed) return;
    dismissed = true;
    layer.classList.remove("playing");
    setTimeout(() => {
      layer.classList.add("hidden");
      layer.innerHTML = "";
      done();
    }, 350);
  };

  const timer = setTimeout(finish, 3200);
  layer.addEventListener("click", () => { clearTimeout(timer); finish(); }, { once: true });
}

// ─── LEVEL-UP BANNER ──────────────────────────────────────────────────────

function showLevelUpBanner(lvlData) {
  const banner = document.getElementById("levelUpBanner");
  if (!banner) return;
  const reduceMotion = document.documentElement.classList.contains("reduce-motion");
  if (reduceMotion) {
    showToast("Level up! You're now a ", lvlData.name);
    return;
  }
  banner.innerHTML = `
    <span class="levelup-label">Level Up</span>
    <span class="levelup-level">Level ${lvlData.level}</span>
    <span class="levelup-name">${lvlData.name}</span>`;
  banner.classList.remove("hidden");
  requestAnimationFrame(() => banner.classList.add("show"));
  setTimeout(() => {
    banner.classList.remove("show");
    setTimeout(() => banner.classList.add("hidden"), 400);
  }, 2400);
}

// ─── AUDIO CHIME (Web Audio API) ──────────────────────────────────────────

let _audioCtx = null;

function playChime() {
  const soundOn = localStorage.getItem("py30_sound") === "true";
  if (!soundOn) return;
  try {
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _audioCtx;
    [[880, 0], [1100, 0.15], [1320, 0.30]].forEach(([freq, when]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0, ctx.currentTime + when);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + when + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + when + 0.22);
      osc.start(ctx.currentTime + when);
      osc.stop(ctx.currentTime + when + 0.25);
    });
  } catch (_) {}
}

// ─── ACHIEVEMENT BOOK (TWO-PAGE TOME) ─────────────────────────────────────────

const AchievementUI = (() => {
  const CAT_LABELS = {
    progress: "Progress",
    streaks:  "Streaks",
    xp:       "Experience",
    mastery:  "Mastery",
    secret:   "Secrets",
  };

  const CAT_ICONS = {
    progress: "🗺️",
    streaks:  "🔥",
    xp:       "⭐",
    mastery:  "🏅",
    secret:   "🔮",
  };

  // Pages: cover is a special spread; each category is its own spread
  // Spread 0 = cover (left: decorative, right: cover content)
  // Spreads 1–5 = one category each
  let _currentSpread = 0;
  const SPREADS = ["cover", ...ACH_CATEGORIES]; // 6 spreads total

  function _earned() {
    return state.achievements ? state.achievements.size : 0;
  }

  function _renderCoverLeft() {
    // Left page on cover spread: decorative title page
    return `<div class="ach-page-inner cover-inner">
      <div class="ach-cover-emblem">📜</div>
      <div class="ach-cover-title">Achievement<br>Compendium</div>
      <div class="ach-cover-sub">30 Days of Python</div>
      <div class="ach-cover-stats">
        <div class="ach-cover-count">${_earned()}</div>
        <div class="ach-cover-total">of ${ACHIEVEMENTS.filter(a => !a.secret).length} unlocked</div>
      </div>
      <div class="ach-cover-hint">Press › to explore</div>
    </div>`;
  }

  function _renderCoverRight() {
    // Right page on cover spread: index / table of contents
    const rows = ACH_CATEGORIES.map((cat, i) => {
      const achs = ACHIEVEMENTS.filter(a => a.cat === cat);
      const done = achs.filter(a => state.achievements && state.achievements.has(a.id)).length;
      return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(160,110,50,0.18);">
        <span style="font-size:18px;">${CAT_ICONS[cat]}</span>
        <span style="flex:1;font-size:13px;font-weight:700;color:var(--book-ink);font-family:'Georgia',serif;">${CAT_LABELS[cat]}</span>
        <span style="font-size:11px;color:var(--book-ink-2);opacity:0.7;">${done}/${achs.length}</span>
      </div>`;
    }).join("");
    return `<div class="ach-page-inner">
      <div class="ach-page-header" style="margin-bottom:18px;">
        <span class="ach-cat-icon">📖</span>
        <span class="ach-cat-label">Contents</span>
      </div>
      ${rows}
    </div>`;
  }

  function _renderCategoryPage(cat) {
    const achievements = ACHIEVEMENTS.filter(a => a.cat === cat);
    const earnedInCat  = achievements.filter(a => state.achievements && state.achievements.has(a.id)).length;
    const cards = achievements.map(a => {
      const unlocked = state.achievements && state.achievements.has(a.id);
      if (!unlocked && a.secret) {
        return `<div class="ach-card locked secret">
          <div class="ach-card-icon">❓</div>
          <div class="ach-card-name">???</div>
          <div class="ach-card-desc">Hidden achievement</div>
        </div>`;
      }
      return `<div class="ach-card ${unlocked ? "earned" : "locked"}">
        <div class="ach-card-icon">${a.icon}</div>
        <div class="ach-card-name">${a.name}</div>
        <div class="ach-card-desc">${a.desc}</div>
        ${unlocked ? '<div class="ach-card-check">✓</div>' : ''}
      </div>`;
    }).join("");
    return `<div class="ach-page-inner">
      <div class="ach-page-header">
        <span class="ach-cat-icon">${CAT_ICONS[cat]}</span>
        <span class="ach-cat-label">${CAT_LABELS[cat]}</span>
        <span class="ach-cat-progress">${earnedInCat} / ${achievements.length}</span>
      </div>
      <div class="ach-cards-grid">${cards}</div>
    </div>`;
  }

  function _getSpreadContent(spreadIdx) {
    // Returns [leftHTML, rightHTML] for this spread
    if (spreadIdx === 0) {
      return [_renderCoverLeft(), _renderCoverRight()];
    }
    const cat = SPREADS[spreadIdx]; // category name
    // Left page: category achievements
    // Right page: next category or blank if last
    const nextCat = SPREADS[spreadIdx + 1];
    const rightHTML = nextCat
      ? _renderCategoryPage(nextCat)
      : `<div class="ach-page-inner" style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.25;">
           <div style="text-align:center;font-family:'Georgia',serif;">
             <div style="font-size:32px;">🔒</div>
             <div style="font-size:12px;margin-top:8px;">End of record</div>
           </div>
         </div>`;
    return [_renderCategoryPage(cat), rightHTML];
  }

  function _setSpreadContent(leftHTML, rightHTML, animate) {
    const left  = document.getElementById("achPageLeft");
    const right = document.getElementById("achPageRight");
    if (!left || !right) return;

    if (!animate) {
      left.innerHTML  = leftHTML;
      right.innerHTML = rightHTML;
      return;
    }

    // Slide-out then slide-in
    left.classList.add("flipping-out");
    right.classList.add("flipping-out");
    setTimeout(() => {
      left.classList.remove("flipping-out");
      right.classList.remove("flipping-out");
      left.innerHTML  = leftHTML;
      right.innerHTML = rightHTML;
      left.classList.add("flipping-in");
      right.classList.add("flipping-in");
      setTimeout(() => {
        left.classList.remove("flipping-in");
        right.classList.remove("flipping-in");
      }, 250);
    }, 170);
  }

  function _updateNavButtons() {
    const prevBtn = document.getElementById("achPrev");
    const nextBtn = document.getElementById("achNext");
    if (prevBtn) prevBtn.disabled = _currentSpread === 0;
    // We show two cats per spread (except cover), so last spread = Math.ceil((SPREADS.length-1)/2)
    const lastSpread = Math.ceil((SPREADS.length - 1) / 2);
    if (nextBtn) nextBtn.disabled = _currentSpread >= lastSpread;
  }

  function _updateIndicator() {
    const el = document.getElementById("achPageIndicator");
    if (!el) return;
    const lastSpread = Math.ceil((SPREADS.length - 1) / 2);
    const total = lastSpread + 1; // including cover
    el.innerHTML = Array.from({ length: total }, (_, i) =>
      `<span class="ach-dot${i === _currentSpread ? " active" : ""}"></span>`
    ).join("");
  }

  function _render(animate) {
    // Compute which categories to show on this spread
    // Spread 0 = cover; Spread n = categories at index (2n-1) and (2n)
    let leftHTML, rightHTML;
    if (_currentSpread === 0) {
      [leftHTML, rightHTML] = [_renderCoverLeft(), _renderCoverRight()];
    } else {
      const leftCatIdx  = (_currentSpread - 1) * 2;
      const rightCatIdx = leftCatIdx + 1;
      const leftCat  = ACH_CATEGORIES[leftCatIdx];
      const rightCat = ACH_CATEGORIES[rightCatIdx];
      leftHTML  = leftCat  ? _renderCategoryPage(leftCat)  : "";
      rightHTML = rightCat ? _renderCategoryPage(rightCat) :
        `<div class="ach-page-inner" style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.22;">
           <div style="text-align:center;font-family:'Georgia',serif;color:var(--book-ink);">
             <div style="font-size:36px;">📜</div>
             <div style="font-size:12px;margin-top:10px;">End of Record</div>
           </div>
         </div>`;
    }
    _setSpreadContent(leftHTML, rightHTML, animate);
    _updateNavButtons();
    _updateIndicator();
  }

  function prev() {
    if (_currentSpread <= 0) return;
    _currentSpread--;
    _render(true);
  }

  function next() {
    const lastSpread = Math.ceil((ACH_CATEGORIES.length) / 2);
    if (_currentSpread >= lastSpread) return;
    _currentSpread++;
    _render(true);
  }

  function _openImmediate() {
    _currentSpread = 0;
    _render(false);
    const overlay = document.getElementById("achBookOverlay");
    const book    = document.getElementById("achievementBook");
    if (overlay) overlay.classList.remove("hidden");
    if (book) {
      book.classList.remove("hidden");
      requestAnimationFrame(() => book.classList.add("open"));
    }
  }

  // Keep open() as a public alias for direct callers
  function open() { _openImmediate(); }

  function close() {
    const book    = document.getElementById("achievementBook");
    const overlay = document.getElementById("achBookOverlay");
    if (book) {
      book.classList.remove("open");
      setTimeout(() => book.classList.add("hidden"), 400);
    }
    if (overlay) overlay.classList.add("hidden");
  }

  return { open, _openImmediate, close, prev, next, _impl: "tome2page" };
})();

// ── Cinematic book intro controller ───────────────────────
function playBookIntro(callback) {
  const intro  = document.getElementById("achBookIntro");
  const cover  = document.getElementById("achIntroCover");
  const clasp  = document.getElementById("achIntroClassp");
  const glow   = document.getElementById("achIntroGlow");

  if (!intro || !cover) {
    if (callback) callback();
    return;
  }

  // Timeline (all ms):
  // 0    — overlay in, book slams in (CSS: 0.35s appear)
  // 200  — ambient glow fades in
  // 300  — key descends (0.7s → lands+inserts at ~1000ms)
  // 1050 — key turns full 360° sinking into lock (0.7s), fades to 0 by end
  // 1500 — CLUNK midpoint: shake + glow burst (key still partially visible)
  // 1750 — key fully gone → cover explodes open
  // 2250 — crossfade into real book + callback
  // 2700 — cleanup

  const key = document.getElementById("achIntroKey");

  // Reset all state
  cover.classList.remove("shaking", "flipping");
  clasp.classList.remove("glowing");
  glow.classList.remove("visible", "burst");
  intro.classList.remove("fade-out");
  if (key) key.classList.remove("turning");

  // Force-reset the key animation: remove it, trigger reflow, re-add
  if (key) {
    key.style.animation = "none";
    key.style.opacity   = "0";
    key.style.transform = "rotate(90deg) translateX(220px) scale(1.1)";
    key.offsetHeight; // force reflow
    key.style.animation = "";
    key.style.transform = "";
  }

  // Also reset cover appear animation
  cover.style.animation = "none";
  cover.offsetHeight;
  cover.style.animation = "";

  intro.classList.add("active");

  // Ambient glow builds
  setTimeout(() => glow.classList.add("visible"), 200);

  // Key fully inserted — spin 360° sinking into the lock (fades to invisible by end)
  setTimeout(() => {
    if (key) key.classList.add("turning");
  }, 1050);

  // Midpoint of spin — CLUNK: shake + glow burst (key still partially visible)
  setTimeout(() => {
    cover.classList.add("shaking");
    clasp.classList.add("glowing");
    glow.classList.add("burst");
    setTimeout(() => cover.classList.remove("shaking"), 300);
  }, 1500);

  // Key fully gone → cover explodes open
  setTimeout(() => {
    cover.classList.add("flipping");
  }, 1750);

  // Crossfade into real book
  setTimeout(() => {
    intro.classList.add("fade-out");
    if (callback) callback();
  }, 2250);

  // Cleanup
  setTimeout(() => {
    intro.classList.remove("active", "fade-out");
    cover.classList.remove("flipping");
    clasp.classList.remove("glowing");
    glow.classList.remove("visible", "burst");
    if (key) key.classList.remove("turning");
  }, 2700);
}

function openAchievementBook() {
  playBookIntro(() => AchievementUI._openImmediate());
}
function closeAchievementBook() { AchievementUI.close(); }

// Remove old badge popup functions (replaced by book)
function openBadgePopup()  { playBookIntro(() => AchievementUI._openImmediate()); }
function closeBadgePopup() { AchievementUI.close(); }

// ─── EXERCISES ────────────────────────────────
function toggleExercise(el, dayKey, id) {
  const isChecked = el.classList.toggle("checked");
  el.querySelector(".exercise-checkbox").textContent = isChecked ? "✓" : "";
  if (!state.exercises[dayKey]) state.exercises[dayKey] = {};
  if (isChecked) {
    state.exercises[dayKey][id] = true;
    const xpMap = { level1: 10, level2: 20, level3: 30 };
    const levelKey = id.split("_")[0];
    awardXP(xpMap[levelKey] || 10);
  } else {
    delete state.exercises[dayKey][id];
    saveState();
  }
}

function toggleExerciseExample(btn) {
  const box = btn.nextElementSibling;
  if (!box) return;
  const isHidden = box.classList.contains("hidden");
  box.classList.toggle("hidden", !isHidden);
  btn.textContent = isHidden ? "💡 Hide Example" : "💡 Example";
}

// ─── QUIZ ─────────────────────────────────────
function answerQuiz(btn, dayNum, qi, chosen, correct) {
  const card = btn.closest(".quiz-card");
  const opts = card.querySelectorAll(".quiz-opt");
  opts.forEach((opt, i) => {
    opt.disabled = true;
    if (i === correct) opt.classList.add("correct");
    else if (i === chosen) opt.classList.add("wrong");
  });

  const isCorrect = chosen === correct;
  const fb = card.querySelector(".quiz-feedback");
  const day = DAYS[dayNum - 1];
  const q = day.quiz && day.quiz[qi];
  if (!q) return;
  fb.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"} show`;
  fb.innerHTML = isCorrect
    ? "✓ Correct!"
    : `✗ Incorrect — The right answer is: <strong>${escapeHtml(q.opts[correct])}</strong>${q.explain ? `<br><span style="font-weight:400;opacity:0.85">${escapeHtml(q.explain)}</span>` : ""}`;

  const qKey = `day_${dayNum}`;
  if (!state.quizAnswers[qKey]) state.quizAnswers[qKey] = {};
  const alreadyAnswered = !!state.quizAnswers[qKey][qi];
  state.quizAnswers[qKey][qi] = { chosen, correct: isCorrect };
  if (isCorrect && !alreadyAnswered) {
    awardXP(15);
  } else if (!isCorrect && !alreadyAnswered) {
    awardXP(-10);
    showToast("✗ Wrong answer: ", "-10 XP");
    saveState();
  } else {
    saveState();
  }

  // Update score bar
  updateQuizScore(dayNum, day.quiz.length);
}

function revealQuizSolution(btn, dayNum, qi, correctAnswer) {
  const key = `${dayNum}_${qi}`;
  const card = btn.closest(".quiz-card");

  // Apply -30 XP penalty once
  if (!state.solutionUsed[key]) {
    state.solutionUsed[key] = true;
    awardXP(-30);
    showToast("📖 Solution revealed: ", "-30 XP");
  }

  // Disable all options and highlight correct answer
  const optBtns = card.querySelectorAll(".quiz-opt");
  let correctText = "";
  optBtns.forEach((ob, i) => {
    ob.disabled = true;
    if (i === correctAnswer) {
      ob.classList.add("correct");
      correctText = ob.textContent.replace(/^[A-D]\s*/, "").trim();
    }
  });

  // Show feedback
  const fb = card.querySelector(".quiz-feedback");
  if (fb) {
    fb.className = "quiz-feedback correct show";
    fb.innerHTML = `📖 Solution: <strong>${correctText}</strong>`;
  }

  // Hide the solution button
  btn.style.display = "none";
}

function updateQuizScore(dayNum, total) {
  if (!total) return;
  const qKey = `day_${dayNum}`;
  const saved = state.quizAnswers[qKey] || {};
  const answered = Object.keys(saved).length;
  const correct = Object.values(saved).filter((v) => v.correct).length;
  const pct = Math.round((correct / total) * 100);

  let scoreBar = document.querySelector(".quiz-score-bar");
  if (!scoreBar) {
    scoreBar = document.createElement("div");
    scoreBar.className = "quiz-score-bar";
    const quizSection = document.querySelector(".quiz-section");
    const subtext = quizSection.querySelector(".quiz-subtext");
    subtext.after(scoreBar);
  }
  scoreBar.innerHTML = `
    <div>
      <div class="quiz-score-num">${correct}/${total}</div>
      <div class="quiz-score-label">correct answers</div>
    </div>
    <div class="quiz-score-fill-wrap">
      <div class="quiz-score-fill" style="width:${pct}%"></div>
    </div>
    <div style="font-family:'Fira Code',monospace;font-size:16px;font-weight:800;color:var(--accent-bright)">${pct}%</div>
  `;
}

// ─── SIDEBAR ──────────────────────────────────
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

function toggleSidebarCollapse() {
  const app = document.getElementById("app");
  const sidebar = document.getElementById("sidebar");
  const collapsed = app.classList.toggle("sidebar-collapsed");
  sidebar.classList.toggle("collapsed", collapsed);
  // Update the hide button inside the sidebar header
  const hideBtn = sidebar.querySelector(".sidebar-collapse-topbar-btn");
  if (hideBtn) hideBtn.textContent = collapsed ? "▶" : "◀";
}

// Called by the "▶ show" button that appears on the collapsed sidebar edge
function expandSidebar() {
  const app = document.getElementById("app");
  const sidebar = document.getElementById("sidebar");
  app.classList.remove("sidebar-collapsed");
  sidebar.classList.remove("collapsed");
  const hideBtn = sidebar.querySelector(".sidebar-collapse-topbar-btn");
  if (hideBtn) hideBtn.textContent = "◀";
}

function filterDays(q) {
  const query = q.toLowerCase();
  document.querySelectorAll(".day-nav-item").forEach((item) => {
    const title = item
      .querySelector(".day-nav-title")
      .textContent.toLowerCase();
    const num = item.querySelector(".day-nav-num").textContent;
    item.style.display =
      !query || title.includes(query) || num.includes(query) ? "" : "none";
  });
}

// ─── COPY ─────────────────────────────────────
function copyCode(btn) {
  const code = btn.closest(".example-card").querySelector("code").textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = "Copied!";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.classList.remove("copied");
    }, 2000);
  }).catch(() => {
    btn.textContent = "Failed";
    setTimeout(() => { btn.textContent = "Copy"; }, 2000);
  });
}

// ─── UTIL ─────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── FLOATING PLAYGROUND ──────────────────────
function syncPanelPositions() {
  const playground = document.getElementById("floatingPlaygroundPanel");
  const tutor = document.getElementById("tutorPanel");
  if (!playground || !tutor) return;
  const bothOpen = playground.classList.contains("open") && tutor.classList.contains("open");
  playground.classList.toggle("both-open", bothOpen);
  // When both panels open, the playground sits to the left of the tutor —
  // keep its right offset in sync with the tutor's actual (possibly resized) width.
  if (bothOpen) {
    const tutorW = tutor.getBoundingClientRect().width;
    playground.style.right = tutorW + "px";
  } else {
    playground.style.right = "";
  }
}

// ─── PANEL DRAG-TO-RESIZE ─────────────────────
// Lets users drag the left edge of the AI Tutor or Code Editor panels to make
// them wider/narrower. Widths persist in localStorage.
(function setupPanelResize() {
  const MIN_WIDTH = 320;
  const STORAGE = { tutorPanel: "panelWidth.tutor", floatingPlaygroundPanel: "panelWidth.editor" };

  function maxWidth() { return Math.min(900, Math.round(window.innerWidth * 0.8)); }
  function clamp(w) { return Math.max(MIN_WIDTH, Math.min(maxWidth(), w)); }

  // Restore saved widths on load
  function applySavedWidth(panelId) {
    const el = document.getElementById(panelId);
    if (!el) return;
    const saved = parseInt(localStorage.getItem(STORAGE[panelId]) || "", 10);
    if (saved > 0) el.style.width = clamp(saved) + "px";
  }
  applySavedWidth("tutorPanel");
  applySavedWidth("floatingPlaygroundPanel");

  let dragging = null;

  function onPointerDown(e) {
    const handle = e.target.closest(".panel-resize-handle");
    if (!handle) return;
    const targetId = handle.getAttribute("data-resize-target");
    const panel = document.getElementById(targetId);
    if (!panel) return;
    e.preventDefault();
    dragging = { panel, handle, targetId };
    handle.classList.add("dragging");
    document.body.classList.add("panel-resizing");
    handle.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    // The panel is anchored to the right; dragging the left edge means width
    // grows as the cursor moves leftward.
    const newWidth = clamp(window.innerWidth - e.clientX);
    dragging.panel.style.width = newWidth + "px";
    syncPanelPositions();
    // Ace editor needs an explicit resize call when its container width changes
    if (dragging.targetId === "floatingPlaygroundPanel" && window.FloatingPlayground?.resize) {
      window.FloatingPlayground.resize();
    }
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging.handle.classList.remove("dragging");
    document.body.classList.remove("panel-resizing");
    // Persist final width
    const finalW = parseInt(dragging.panel.style.width, 10);
    if (finalW > 0) localStorage.setItem(STORAGE[dragging.targetId], String(finalW));
    dragging.handle.releasePointerCapture?.(e.pointerId);
    dragging = null;
  }

  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);

  // Re-clamp on window resize so a saved width never exceeds the new viewport
  window.addEventListener("resize", () => {
    for (const id of Object.keys(STORAGE)) {
      const el = document.getElementById(id);
      if (!el || !el.style.width) continue;
      const cur = parseInt(el.style.width, 10);
      const clamped = clamp(cur);
      if (clamped !== cur) el.style.width = clamped + "px";
    }
    syncPanelPositions();
  });
})();

function toggleFloatingPlayground() {
  const panel = document.getElementById("floatingPlaygroundPanel");
  const btn = document.getElementById("playgroundTopbarBtn");
  if (!panel) return;
  const isOpen = panel.classList.toggle("open");
  panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
  btn.classList.toggle("active", isOpen);
  if (isOpen) FloatingPlayground.mount();
  syncPanelPositions();
}

const FloatingPlayground = (() => {
  let editor = null;
  let pyodide = null;
  let pyodideLoading = null;

  function setStatus(text) {
    const el = document.getElementById("floatingPlaygroundStatus");
    if (el) el.textContent = text;
  }

  function appendOutput(text) {
    const out = document.getElementById("floatingPlaygroundOut");
    if (out) out.textContent += text;
  }

  async function ensurePyodide() {
    if (pyodide) return pyodide;
    if (pyodideLoading) return pyodideLoading;
    setStatus("Loading Python (one-time ~5MB)…");
    pyodideLoading = (async () => {
      pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
      setStatus("Python ready. Press ▶ Run.");
      return pyodide;
    })();
    return pyodideLoading;
  }

  function mount() {
    const mountEl = document.getElementById("floatingAceEditor");
    if (!mountEl || editor) return;
    editor = ace.edit(mountEl, {
      mode: "ace/mode/python",
      theme: "ace/theme/tomorrow_night",
      fontSize: 13,
      showPrintMargin: false,
      tabSize: 4,
      useSoftTabs: true,
      highlightActiveLine: true,
    });
    editor.session.setOption("useWorker", false);
    editor.setValue("# Type your Python here!\nprint('Hello, Python!')\n", -1);
    editor.clearSelection();
  }

  async function run() {
    const out = document.getElementById("floatingPlaygroundOut");
    if (out) out.textContent = "";
    let py;
    try {
      py = await ensurePyodide();
    } catch (e) {
      setStatus("Failed to load Python.");
      appendOutput("Error: " + e.message);
      return;
    }
    setStatus("Running…");
    py.setStdout({ batched: (s) => appendOutput(s + "\n") });
    py.setStderr({ batched: (s) => appendOutput(s + "\n") });
    try {
      await py.runPythonAsync(getCode());
      setStatus("Done.");
    } catch (e) {
      appendOutput((e && e.message) || String(e));
      setStatus("Error.");
    }
  }

  function getCode() {
    return editor ? editor.getValue() : "";
  }

  function clearOutput() {
    const out = document.getElementById("floatingPlaygroundOut");
    if (out) out.textContent = "";
  }

  function reset() {
    if (editor) {
      editor.setValue("# Type your Python here!\nprint('Hello, Python!')\n", -1);
      editor.clearSelection();
      clearOutput();
    }
  }

  function resize() {
    if (editor) editor.resize();
  }

  return { mount, run, getCode, clearOutput, reset, resize };
})();

window.FloatingPlayground = FloatingPlayground;

// =============================================
//   LANDING PAGE ANIMATIONS
// =============================================

function initLandingAnimations() {
  initScrollReveal();
  initTypewriter();
  initCodeTyper();
}

// ── Scroll Reveal ──────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const fades = document.querySelectorAll(".hero-sub-fade");

  // Show hero immediately
  const hero = document.querySelector(".landing-hero.reveal");
  if (hero) {
    setTimeout(() => { hero.classList.add("visible"); }, 100);
  }

  // Hero sub-fades on timer
  setTimeout(() => {
    fades.forEach((el, idx) => {
      setTimeout(() => { el.classList.add("visible"); }, idx * 120);
    });
  }, 1400);

  // Use IntersectionObserver where available, fallback to showing all
  if (typeof IntersectionObserver !== "undefined") {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));

    // Demo section: play on enter, reset on leave, replay on re-enter
    const demoSection = document.getElementById("landing-features");
    if (demoSection) {
      const demoObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          resetDemoSection();
          setTimeout(initDemoSequence, 400);
        } else {
          resetDemoSection();
        }
      }, { threshold: 0.2 });
      demoObserver.observe(demoSection);
    }
  } else {
    // Fallback: show everything and play demo once
    els.forEach((el) => el.classList.add("visible"));
    setTimeout(initDemoSequence, 1800);
  }

  // Hard fallback at 2.5s — guarantees nothing stays hidden
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => el.classList.add("visible"));
    document.querySelectorAll(".hero-sub-fade:not(.visible)").forEach((el) => el.classList.add("visible"));
  }, 2500);
}

// ── Typewriter: hero titles ────────────────────
function initTypewriter() {
  const line1El = document.getElementById("heroTitle");
  const line2El = document.getElementById("heroTitle2");
  if (!line1El || !line2El) return;

  const line1 = "Master Python.";
  const line2 = "30 days.";
  let i = 0;

  line1El.innerHTML = '<span class="typewriter-cursor"></span>';
  line2El.style.visibility = "hidden";

  function typeLine1() {
    if (i < line1.length) {
      const cur = line1El.querySelector(".typewriter-cursor");
      if (cur) line1El.insertBefore(document.createTextNode(line1[i]), cur);
      i++;
      setTimeout(typeLine1, 55);
    } else {
      const cur = line1El.querySelector(".typewriter-cursor");
      if (cur) cur.parentNode.removeChild(cur);
      setTimeout(startLine2, 180);
    }
  }

  function startLine2() {
    line2El.style.visibility = "visible";
    line2El.innerHTML = '<span class="typewriter-cursor accent-cur"></span>';
    let j = 0;
    function typeLine2() {
      if (j < line2.length) {
        const cur = line2El.querySelector(".typewriter-cursor");
        if (cur) line2El.insertBefore(document.createTextNode(line2[j]), cur);
        j++;
        setTimeout(typeLine2, 65);
      }
    }
    typeLine2();
  }

  setTimeout(typeLine1, 300);
}

// ── Code window typing animation ──────────────
// ── Code window typing animation ──────────────
function initCodeTyper() {
  const pre = document.getElementById("heroCodePre");
  if (!pre) return;

  pre.innerHTML = '<span class="demo-cursor"></span>';

  const segments = [
    ["# 30 Days of Python: Day 10 Loops", "lc-comment"],
    ["\n\n", null],
    ["days = list(range(1, 31))", null],
    ["\n", null],
    ["completed = []", null],
    ["\n", null],
    ["for", "lc-keyword"],
    [" day in days:\n", null],
    ["    if day <= 10:\n", null],
    ["        completed.append(day)\n", null],
    ["\n", null],
    ["print(\"Done: \" + str(len(completed)) + \"/30\")", null],
    ["\n", null],
    ["# Output: Done: 10/30", "lc-success"]
  ];

  let segIdx = 0, charIdx = 0;

  function typeNext() {
    const cursor = pre.querySelector(".demo-cursor");
    if (!cursor || segIdx >= segments.length) return;
    const seg = segments[segIdx];
    const text = seg[0];
    const cls = seg[1];
    if (charIdx < text.length) {
      const ch = text[charIdx];
      let node;
      if (cls) {
        node = document.createElement("span");
        node.className = cls;
        node.textContent = ch;
      } else {
        node = document.createTextNode(ch);
      }
      pre.insertBefore(node, cursor);
      charIdx++;
      setTimeout(typeNext, ch === "\n" ? 80 : 32);
    } else {
      segIdx++;
      charIdx = 0;
      setTimeout(typeNext, segIdx % 3 === 0 ? 120 : 20);
    }
  }

  setTimeout(typeNext, 800);
}

// ── Stagger curriculum grid entrance ──────────
function applyCurriculumStagger() {
  document.querySelectorAll(".preview-day").forEach((el, i) => {
    el.style.animationDelay = (i * 30) + "ms";
  });
}

// ── Demo section reset + auto-play ────────────
let _demoTimers = [];

function resetDemoSection() {
  _demoTimers.forEach((t) => clearTimeout(t));
  _demoTimers = [];
  const output = document.getElementById("demoOutput");
  const chatEl = document.getElementById("demoChat");
  if (output) { output.innerHTML = ""; output.style.opacity = "0"; }
  if (chatEl) chatEl.innerHTML = "";
}

function initDemoSequence() {
  const output = document.getElementById("demoOutput");
  const chatEl = document.getElementById("demoChat");
  if (!output || !chatEl) return;

  function after(ms, fn) {
    const t = setTimeout(fn, ms);
    _demoTimers.push(t);
  }

  // Show error first
  after(800, function() {
    var out = document.getElementById("demoOutput");
    if (!out) return;
    out.innerHTML = '<span class="lc-error">SyntaxError: invalid syntax (line 6)</span>';
    out.style.opacity = "1";
  });

  // Then AI chat messages
  const messages = [
    { role: "user", text: "Why is my code getting a SyntaxError?", delay: 1800 },
    { role: "ai",   text: "I can see the issue! On line 6, the <code>for</code> loop is missing a colon at the end.", delay: 2800 },
    { role: "ai",   text: "Change <code>for score in scores</code> to <code>for score in scores:</code>. Python requires the colon to open a block.", delay: 3800 },
    { role: "user", text: "Oh and what about line 9?", delay: 5000 },
    { role: "ai",   text: "Good catch! <code>len(scores</code> is missing the closing parenthesis. Fix it to <code>len(scores)</code> and you are good to go.", delay: 6200 }
  ];

  messages.forEach((msg) => {
    after(msg.delay, () => {
      const el = document.getElementById("demoChat");
      if (!el) return;
      const div = document.createElement("div");
      div.className = "demo-msg " + msg.role;
      div.innerHTML = msg.text;
      el.appendChild(div);
      el.scrollTop = el.scrollHeight;
    });
  });
}

// ── Feature card tab switcher ──────────────────
function lfSwitchTab(btn, panelId) {
  const card = btn.closest(".landing-feature-card");
  card.querySelectorAll(".lf-tab").forEach((b) => b.classList.remove("active"));
  card.querySelectorAll(".lf-panel").forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add("active");
}

function lfAnswer(btn, correct) {
  const opts = btn.closest(".lf-quiz-opts");
  opts.querySelectorAll(".lf-quiz-opt").forEach((b) => { b.disabled = true; });
  if (correct) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    opts.querySelectorAll(".lf-quiz-opt").forEach((b) => {
      if (b.textContent.indexOf("B.") === 0) b.classList.add("correct");
    });
  }
}

// ─── PROGRESS POPUP ───────────────────────────
function openProgressPopup() {
  const overlay = document.getElementById("progressPopupOverlay");
  const popup   = document.getElementById("progressPopup");
  if (!overlay || !popup) return;
  renderProgressPopup();
  overlay.classList.add("open");
  popup.classList.add("open");
}

function closeProgressPopup() {
  const overlay = document.getElementById("progressPopupOverlay");
  const popup   = document.getElementById("progressPopup");
  if (!overlay || !popup) return;
  overlay.classList.remove("open");
  popup.classList.remove("open");
}

function renderProgressPopup() {
  const done  = state.completed.size;
  const cur   = state.currentDay;

  // Progress bar
  document.getElementById("progressPopupBar").style.width = ((done / 30) * 100) + "%";
  document.getElementById("progressPopupLabel").textContent = done + " of 30 lessons complete";

  // Dot grid
  const grid = document.getElementById("progressPopupGrid");
  grid.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const dot = document.createElement("div");
    dot.className = "progress-popup-dot";
    if (state.completed.has(i)) dot.classList.add("done");
    if (i === cur)              dot.classList.add("current");
    dot.title = "Day " + i;
    dot.onclick = () => { closeProgressPopup(); loadDay(i); };
    grid.appendChild(dot);
  }

  // Prev / Next buttons
  const prevBtn = document.getElementById("progressPopupPrev");
  const nextBtn = document.getElementById("progressPopupNext");
  document.getElementById("progressPopupPrevNum").textContent = cur - 1;
  document.getElementById("progressPopupNextNum").textContent = cur + 1;
  prevBtn.disabled = cur <= 1;
  nextBtn.disabled = cur >= DAYS.length;
}

function progressPopupNavigate(dir) {
  const next = state.currentDay + dir;
  if (next < 1 || next > DAYS.length) return;
  closeProgressPopup();
  loadDay(next);
}

// Close popup with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProgressPopup();
});
