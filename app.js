/* =============================================
   30 DAYS OF PYTHON — APP LOGIC
   ============================================= */

const state = {
  currentDay: 1,
  completed: new Set(),
  exercises: {},
  quizAnswers: {},
};

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  buildStars();
  buildPreviewGrid();
  buildSidebar();
});

// ─── PERSISTENCE ──────────────────────────────
function loadState() {
  try {
    const c = localStorage.getItem("py30_completed");
    if (c) state.completed = new Set(JSON.parse(c));
    const e = localStorage.getItem("py30_exercises");
    if (e) state.exercises = JSON.parse(e);
    const q = localStorage.getItem("py30_quiz");
    if (q) state.quizAnswers = JSON.parse(q);
  } catch (_) {}
}

function saveState() {
  localStorage.setItem("py30_completed", JSON.stringify([...state.completed]));
  localStorage.setItem("py30_exercises", JSON.stringify(state.exercises));
  localStorage.setItem("py30_quiz", JSON.stringify(state.quizAnswers));
}

// ─── STARS ────────────────────────────────────
function buildStars() {
  const container = document.getElementById("stars");
  for (let i = 0; i < 130; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--dur:${(Math.random() * 4 + 2).toFixed(1)}s;--delay:${(Math.random() * 4).toFixed(1)}s;`;
    container.appendChild(star);
  }
}

// ─── LANDING PREVIEW GRID ─────────────────────
function buildPreviewGrid() {
  const grid = document.getElementById("previewGrid");
  grid.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const d = document.createElement("div");
    d.className = "preview-day" + (state.completed.has(i) ? " done" : "");
    d.textContent = i;
    d.title = DAYS[i - 1] ? DAYS[i - 1].title : "";
    d.onclick = () => startLearning(i);
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
    item.className =
      "day-nav-item" + (done ? " done" : "") + (active ? " active" : "");
    item.dataset.day = d.day;
    item.innerHTML = `
      <div class="day-nav-check">${done ? "✓" : ""}</div>
      <span class="day-nav-num">${String(d.day).padStart(2, "0")}</span>
      <span class="day-nav-emoji">${d.emoji}</span>
      <span class="day-nav-title">${d.title}</span>
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
  document.getElementById("progressText").textContent = `${done} / 30`;
  document.getElementById("progressBar").style.width = `${(done / 30) * 100}%`;
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
}

function navigate(dir) {
  const next = state.currentDay + dir;
  if (next >= 1 && next <= 30) loadDay(next);
}

function loadDay(n) {
  state.currentDay = n;
  const day = DAYS[n - 1];
  if (!day) return;

  document.getElementById("topbarDay").textContent = `Day ${n} — ${day.title}`;
  const btn = document.getElementById("completeBtn");
  const done = state.completed.has(n);
  btn.className = "complete-btn" + (done ? " done" : "");
  btn.textContent = done ? "Completed ✓" : "Mark Complete ✓";

  document.querySelectorAll(".day-nav-item").forEach((el) => {
    el.classList.toggle("active", +el.dataset.day === n);
  });

  document.getElementById("prevBtn").disabled = n === 1;
  document.getElementById("nextBtn").disabled = n === 30;

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
function renderDay(day) {
  return `
    <div class="day-hero">
      <div class="day-tag">Day ${day.day} &middot; ${day.emoji}</div>
      <h1>${day.title}</h1>
      <p class="day-hero-subtitle">${day.subtitle}</p>
      <div class="topic-pills">
        ${day.topics.map((t) => `<span class="topic-pill">${t}</span>`).join("")}
      </div>
    </div>
    <div class="tabs-wrap" id="tabsWrap">
      <button class="tab-btn active" onclick="switchTab(this,'learn')">📖 Learn</button>
      <button class="tab-btn" onclick="switchTab(this,'examples')">💻 Examples</button>
      <button class="tab-btn" onclick="switchTab(this,'exercises')">✏️ Exercises</button>
      <div class="tab-indicator" id="tabIndicator"></div>
    </div>
    <div id="panel-learn" class="tab-panel active">${day.lesson}</div>
    <div id="panel-examples" class="tab-panel">${renderExamples(day.examples)}</div>
    <div id="panel-exercises" class="tab-panel">${renderExercisesTab(day)}</div>
  `;
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

      return `
      <div class="quiz-card">
        <div class="quiz-question">
          <span>Q${qi + 1}</span>
          ${q.q}
        </div>
        <div class="quiz-options">${opts}</div>
        ${feedback}
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
function toggleComplete() {
  const n = state.currentDay;
  if (state.completed.has(n)) {
    state.completed.delete(n);
  } else {
    state.completed.add(n);
    showCelebration(n);
  }
  const done = state.completed.has(n);
  const btn = document.getElementById("completeBtn");
  btn.className = "complete-btn" + (done ? " done" : "");
  btn.textContent = done ? "Completed ✓" : "Mark Complete ✓";

  const navItem = document.querySelector(`.day-nav-item[data-day="${n}"]`);
  if (navItem) {
    navItem.classList.toggle("done", done);
    navItem.querySelector(".day-nav-check").textContent = done ? "✓" : "";
  }
  updateProgress();
  saveState();
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
  if (isChecked) state.exercises[dayKey][id] = true;
  else delete state.exercises[dayKey][id];
  saveState();
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
  const q = day.quiz[qi];
  fb.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"} show`;
  fb.innerHTML = isCorrect
    ? "✓ Correct!"
    : `✗ Incorrect — The right answer is: <strong>${q.opts[correct]}</strong>${q.explain ? `<br><span style="font-weight:400;opacity:0.85">${q.explain}</span>` : ""}`;

  const qKey = `day_${dayNum}`;
  if (!state.quizAnswers[qKey]) state.quizAnswers[qKey] = {};
  state.quizAnswers[qKey][qi] = { chosen, correct: isCorrect };
  saveState();

  // Update score bar
  updateQuizScore(dayNum, day.quiz.length);
}

function updateQuizScore(dayNum, total) {
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
  });
}

// ─── UTIL ─────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
