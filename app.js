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

const BADGES = [
  { id: "first_day",      name: "First Step",      emoji: "🐣", desc: "Complete Day 1" },
  { id: "week_one",       name: "Week 1 Done",      emoji: "📅", desc: "Complete Days 1–7" },
  { id: "halfway",        name: "Halfway There",    emoji: "🏁", desc: "Complete 15 days" },
  { id: "all_done",       name: "Python Master",    emoji: "🏆", desc: "Complete all 30 days" },
  { id: "streak_3",       name: "On a Roll",        emoji: "🔥", desc: "3-day streak" },
  { id: "streak_7",       name: "Week Warrior",     emoji: "⚡", desc: "7-day streak" },
  { id: "streak_30",      name: "Unstoppable",      emoji: "💎", desc: "30-day streak" },
  { id: "xp_500",         name: "XP Grinder",       emoji: "💪", desc: "Earn 500 XP" },
  { id: "xp_2000",        name: "XP Machine",       emoji: "🤖", desc: "Earn 2000 XP" },
  { id: "exercises_all_1",name: "Day 1 Expert",     emoji: "⭐", desc: "All exercises in Day 1" },
  { id: "quiz_ace",       name: "Quiz Ace",          emoji: "🧠", desc: "Answer 10 quizzes correctly" },
];

const state = {
  currentDay: 1,
  completed: new Set(),
  exercises: {},
  quizAnswers: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  badges: new Set(),
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
    const bd = localStorage.getItem("py30_badges");
    if (bd) state.badges = new Set(JSON.parse(bd));
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
  localStorage.setItem("py30_badges", JSON.stringify([...state.badges]));
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
    showToast("🎉 Level up! You're now a ", lvlData.name);
  }
}

function checkBadges() {
  const newBadges = [];

  const completedCount = state.completed.size;
  if (!state.badges.has("first_day") && state.completed.has(1)) newBadges.push("first_day");
  if (!state.badges.has("week_one") && [1,2,3,4,5,6,7].every(d => state.completed.has(d))) newBadges.push("week_one");
  if (!state.badges.has("halfway") && completedCount >= 15) newBadges.push("halfway");
  if (!state.badges.has("all_done") && completedCount >= 30) newBadges.push("all_done");

  if (!state.badges.has("streak_3") && state.streak >= 3) newBadges.push("streak_3");
  if (!state.badges.has("streak_7") && state.streak >= 7) newBadges.push("streak_7");
  if (!state.badges.has("streak_30") && state.streak >= 30) newBadges.push("streak_30");

  if (!state.badges.has("xp_500") && state.xp >= 500) newBadges.push("xp_500");
  if (!state.badges.has("xp_2000") && state.xp >= 2000) newBadges.push("xp_2000");

  if (!state.badges.has("exercises_all_1")) {
    const day1 = DAYS[0];
    const saved = state.exercises["day_1"] || {};
    const levels = ["level1", "level2", "level3"];
    const allExercises = levels.flatMap(key =>
      (day1.exercises[key] || []).map((_, i) => `${key}_${i}`)
    );
    if (allExercises.length > 0 && allExercises.every(id => saved[id])) newBadges.push("exercises_all_1");
  }

  if (!state.badges.has("quiz_ace")) {
    const correctTotal = Object.values(state.quizAnswers)
      .flatMap(day => Object.values(day))
      .filter(a => a.correct).length;
    if (correctTotal >= 10) newBadges.push("quiz_ace");
  }

  for (const id of newBadges) {
    state.badges.add(id);
    const badge = BADGES.find(b => b.id === id);
    if (badge) showToast(`${badge.emoji} Badge unlocked: `, badge.name);
  }
}

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
  checkBadges();
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
    const countEl = elBadges.querySelector("#topbarBadgeCount");
    if (countEl) countEl.textContent = state.badges.size;
    else elBadges.textContent = `${state.badges.size} badges`;
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

function openBadgePopup() {
  const grid = document.getElementById("badgePopupGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const badge of BADGES) {
    const earned = state.badges.has(badge.id);
    const el = document.createElement("div");
    el.className = "badge-card" + (earned ? " earned" : " locked");
    el.innerHTML = `
      <span class="badge-emoji">${badge.emoji}</span>
      <span class="badge-name">${badge.name}</span>
      <span class="badge-desc">${earned ? "Unlocked!" : badge.desc}</span>
    `;
    grid.appendChild(el);
  }
  document.getElementById("badgePopup").classList.remove("hidden");
  document.getElementById("badgePopupOverlay").classList.remove("hidden");
}

function closeBadgePopup() {
  document.getElementById("badgePopup").classList.add("hidden");
  document.getElementById("badgePopupOverlay").classList.add("hidden");
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
            ? "⚠️ AI help used — this day will give 50 XP on completion."
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
        ${prev.correct ? "✓ Correct!" : `✗ Incorrect — The right answer is: <strong>${q.opts[q.answer]}</strong>`}
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
    showCelebration(n);
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

function showCelebration(n) {
  const msgs = [
    "You're building momentum. Keep going!",
    "Great work! Python is getting clearer every day.",
    "One more day conquered. You're unstoppable!",
    "Consistency is the key to mastery. Well done!",
    "You're writing real Python now. Be proud!",
    "Every day you code, you get better. Keep it up!",
  ];
  document.getElementById("celebrationMsg").textContent =
    `Day ${n} complete! ${msgs[n % msgs.length]}`;
  document.getElementById("celebration").classList.remove("hidden");
}

function hideCelebration() {
  document.getElementById("celebration").classList.add("hidden");
}

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
    ["# 30 Days of Python — Day 10: Loops", "lc-comment"],
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
    { role: "ai",   text: "Change <code>for score in scores</code> to <code>for score in scores:</code> — Python requires the colon to open a block.", delay: 3800 },
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
