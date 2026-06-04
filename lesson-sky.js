/* =============================================================
   lesson-sky.js — Calm 2D night-sky background for the LESSON page
   Minimal-distraction by design (Charles is a learner — must NOT
   pull focus from the lesson content).
   Contents:
     1. Faint static-ish STARFIELD with very subtle twinkle.
     2. Gentle METEOR SHOWER — occasional shooting stars streaking
        top-right -> bottom-left with a soft fading tail.
     3. One subtle MOON — soft glowing disc in the top-right corner.
   2D <canvas id="lessonSky"> (cheaper than WebGL, runs everywhere).
   The integrator paints the deep-space background behind it via CSS;
   this canvas stays transparent and only draws stars / meteors / moon.
   Lifecycle mirrors landing-3d.js (IIFE, prefersReduced gate, canRun,
   DPR-capped sizing to parent, delta-time rAF loop, visibility pause,
   resize listener, stop()/cleanup()).

   Exposes TWO independent instances of the same night-sky engine:
     window.LessonSky → draws into <canvas id="lessonSky"> (lesson page)
     window.EditorSky → draws into <canvas id="editorSky"> (built-in code
                        editor panel, so the editor matches the lesson theme)
   The engine is parameterised by canvas id via makeSky(canvasId); each
   instance owns its own state, rAF loop, and listeners.
   ============================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Factory: build one fully-independent night-sky bound to `canvasId`.
  function makeSky(canvasId) {

  // ── Brand-tinted palette (indigo / violet / cyan / white) ──
  // Meteors pick from these so glints stay on-brand and on-AA backgrounds.
  const METEOR_TINTS = [
    "255, 255, 255", // white
    "199, 210, 254", // indigo-200
    "129, 140, 248", // indigo-400
    "165, 180, 252", // indigo-300
    "103, 232, 249", // cyan-300
    "167, 139, 250", // violet-400
  ];

  // Perf: cap DPR at 1.25 (was 1.5). Stars/meteors are soft dots & gradients,
  // so slightly lower resolution is invisible but cuts fill cost — and TWO
  // instances now run (lesson #lessonSky + editor #editorSky).
  const DPR = Math.min(window.devicePixelRatio || 1, 1.25);

  // Perf: render the night sky at ~30fps. Twinkle + slow meteors look identical
  // at 30 vs 60fps but cost half as much; matters with two live instances.
  const SKY_FRAME_MS = 1000 / 30;

  // ── Tuning constants (minimal-distraction is the priority) ──
  const STAR_MIN = 120;
  const STAR_MAX = 180;
  const MAX_METEORS = 3;          // never busy — a few at most
  const METEOR_GAP_MIN = 2.0;     // seconds between spawns (min)
  const METEOR_GAP_MAX = 5.0;     // seconds between spawns (max)
  const MOON_RADIUS = 92;         // px (within 70–110 range)

  let _running = false;
  let canvas = null;
  let ctx = null;
  let animId = null;
  let cleanup = null;

  // Logical (CSS-pixel) canvas size; drawing is done in this space and
  // the context is pre-scaled by DPR so everything stays crisp.
  let W = 0;
  let H = 0;

  let stars = [];
  let meteors = [];
  let moon = null;

  let lastNow = 0;
  let lastDraw = 0; // perf: timestamp of last painted frame (for 30fps cap)
  let spawnTimer = 0;     // seconds accumulated toward next meteor
  let nextSpawn = 0;      // seconds until next meteor is allowed

  function canRun() {
    if (prefersReduced) return false;
    canvas = document.getElementById(canvasId);
    if (!canvas) return false;
    return true;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  // ── Size the canvas to its parent (#app), DPR-capped ──
  function sizeCanvas() {
    if (!canvas) return;
    const parent = canvas.parentElement || document.getElementById("app");
    W = parent ? parent.offsetWidth : window.innerWidth;
    H = parent ? parent.offsetHeight : window.innerHeight;

    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    ctx = canvas.getContext("2d");
    // Draw in CSS pixels; DPR handled once here.
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // ── Build the static-ish starfield (dim, subtle twinkle) ──
  function buildStars() {
    const count = Math.round(rand(STAR_MIN, STAR_MAX));
    stars = [];
    for (let i = 0; i < count; i++) {
      const base = rand(0.15, 0.5);
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: rand(0.4, 1.4),
        baseOpacity: base,
        twAmp: rand(0.04, 0.14),          // small opacity swing
        twSpeed: rand(0.25, 0.8),         // slow oscillation (rad/s)
        twPhase: Math.random() * Math.PI * 2,
        // A few brighter stars get an additive glint so they sparkle gently.
        glint: Math.random() < 0.18,
      });
    }
  }

  // ── Define the moon (fixed in the top-right corner) ──
  function buildMoon() {
    moon = {
      x: W - MOON_RADIUS * 1.3,
      y: MOON_RADIUS * 1.25,
      r: MOON_RADIUS,
      opacity: 0.34, // within 0.25–0.4, low brightness
    };
  }

  // ── Spawn a single meteor (top-right -> bottom-left) ──
  function spawnMeteor() {
    if (meteors.length >= MAX_METEORS) return;

    // Start somewhere along the top / upper-right, angled down-left.
    const startX = rand(W * 0.45, W * 1.05);
    const startY = rand(-H * 0.1, H * 0.35);

    // Diagonal travel: down and to the left.
    const angle = rand(Math.PI * 0.62, Math.PI * 0.78); // ~112°–140°
    const speed = rand(420, 680); // px/s — slow & elegant
    const life = rand(0.8, 1.4);  // seconds to fully fade

    meteors.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      tailLen: rand(80, 160),
      headR: rand(1.2, 2.0),
      life,
      age: 0,
      tint: METEOR_TINTS[(Math.random() * METEOR_TINTS.length) | 0],
    });
  }

  // ── Draw the moon: soft glow halo + softer disc (slightly blurred) ──
  function drawMoon() {
    if (!moon) return;
    const { x, y, r, opacity } = moon;

    // Outer halo — large, very soft, additive so it reads as glow.
    ctx.globalCompositeOperation = "lighter";
    const halo = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2.4);
    halo.addColorStop(0, "rgba(199, 210, 254, " + (opacity * 0.5).toFixed(3) + ")");
    halo.addColorStop(0.5, "rgba(129, 140, 248, " + (opacity * 0.18).toFixed(3) + ")");
    halo.addColorStop(1, "rgba(129, 140, 248, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
    ctx.fill();

    // The disc itself — soft edge via radial gradient (no hard rim).
    ctx.globalCompositeOperation = "source-over";
    const disc = ctx.createRadialGradient(
      x - r * 0.25, y - r * 0.25, r * 0.1,
      x, y, r
    );
    disc.addColorStop(0, "rgba(226, 232, 240, " + opacity.toFixed(3) + ")");
    disc.addColorStop(0.6, "rgba(199, 210, 254, " + (opacity * 0.8).toFixed(3) + ")");
    disc.addColorStop(1, "rgba(165, 180, 252, " + (opacity * 0.12).toFixed(3) + ")");
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── Draw all stars (twinkle handled in update via opacity) ──
  function drawStars(t) {
    ctx.globalCompositeOperation = "source-over";
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const op = Math.max(
        0,
        s.baseOpacity + Math.sin(t * s.twSpeed + s.twPhase) * s.twAmp
      );
      ctx.fillStyle = "rgba(226, 232, 240, " + op.toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Brighter stars get a tiny additive glint on top for a soft sparkle.
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      if (!s.glint) continue;
      const op = Math.max(
        0,
        (s.baseOpacity + Math.sin(t * s.twSpeed + s.twPhase) * s.twAmp) * 0.6
      );
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
      g.addColorStop(0, "rgba(199, 210, 254, " + op.toFixed(3) + ")");
      g.addColorStop(1, "rgba(199, 210, 254, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }

  // ── Draw a single meteor: gradient tail + bright additive head ──
  function drawMeteor(m) {
    // Fade in quickly, fade out over life (ease toward 0 at the end).
    const lifeFrac = m.age / m.life;          // 0 -> 1
    const fade = Math.sin(Math.min(lifeFrac, 1) * Math.PI); // 0 -> 1 -> 0

    // Tail points back along the velocity direction.
    const len = Math.hypot(m.vx, m.vy) || 1;
    const ux = m.vx / len;
    const uy = m.vy / len;
    const tailX = m.x - ux * m.tailLen;
    const tailY = m.y - uy * m.tailLen;

    // Tail — linear gradient from transparent (back) to bright (head).
    ctx.globalCompositeOperation = "lighter";
    const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
    grad.addColorStop(0, "rgba(" + m.tint + ", 0)");
    grad.addColorStop(1, "rgba(" + m.tint + ", " + (0.55 * fade).toFixed(3) + ")");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();

    // Head — small bright glow at the leading point.
    const headR = m.headR;
    const head = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, headR * 4);
    head.addColorStop(0, "rgba(255, 255, 255, " + (0.9 * fade).toFixed(3) + ")");
    head.addColorStop(0.4, "rgba(" + m.tint + ", " + (0.5 * fade).toFixed(3) + ")");
    head.addColorStop(1, "rgba(" + m.tint + ", 0)");
    ctx.fillStyle = head;
    ctx.beginPath();
    ctx.arc(m.x, m.y, headR * 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
  }

  // ── Per-frame update of meteor positions + lifetime + spawn timer ──
  function updateMeteors(dt) {
    // Advance spawn timer; spawn when due and under the concurrent cap.
    spawnTimer += dt;
    if (spawnTimer >= nextSpawn) {
      spawnTimer = 0;
      nextSpawn = rand(METEOR_GAP_MIN, METEOR_GAP_MAX);
      spawnMeteor();
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.age += dt;
      m.x += m.vx * dt;
      m.y += m.vy * dt;

      // Retire when its life is up or it has left the viewport.
      if (
        m.age >= m.life ||
        m.x < -m.tailLen - 20 ||
        m.y > H + m.tailLen + 20
      ) {
        meteors.splice(i, 1);
      }
    }
  }

  // ── Render a single static frame (used for reduced-motion) ──
  function drawStaticFrame() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    drawStars(0);
    drawMoon();
  }

  function loop(now) {
    if (!_running) return;
    animId = requestAnimationFrame(loop);

    // Perf: hold ~30fps — skip the frame if too soon since the last paint.
    if (now - lastDraw < SKY_FRAME_MS) return;
    lastDraw = now;

    const dt = Math.min((now - lastNow) / 1000, 0.05);
    lastNow = now;

    const t = now / 1000; // seconds for twinkle oscillation

    ctx.clearRect(0, 0, W, H);
    drawStars(t);
    drawMoon();
    updateMeteors(dt);
    for (let i = 0; i < meteors.length; i++) {
      drawMeteor(meteors[i]);
    }
  }

  // ── Resize: re-size canvas, rebuild positional state to new bounds ──
  function onResize() {
    if (!canvas) return;
    sizeCanvas();
    buildStars();
    buildMoon();
    // Meteors are transient; clear so none are stranded off the new bounds.
    meteors = [];
    if (prefersReduced || !_running) {
      drawStaticFrame();
    }
  }

  // ── Pause when tab hidden; resume cleanly without a dt spike ──
  function onVisible() {
    if (document.hidden) {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else if (_running && !prefersReduced) {
      lastNow = performance.now();
      animId = requestAnimationFrame(loop);
    }
  }

  function start() {
    if (_running) return;
    if (!canRun()) return;

    _running = true;

    sizeCanvas();
    buildStars();
    buildMoon();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisible);

    // Reduced-motion: one static frame (stars + moon), no animation.
    if (prefersReduced) {
      drawStaticFrame();
    } else {
      spawnTimer = 0;
      nextSpawn = rand(METEOR_GAP_MIN, METEOR_GAP_MAX);
      lastNow = performance.now();
      animId = requestAnimationFrame(loop);
    }

    cleanup = () => {
      _running = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisible);
      stars = [];
      meteors = [];
      moon = null;
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas ? canvas.width : 0, canvas ? canvas.height : 0);
      }
      ctx = null;
    };
  }

  function stop() {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    _running = false;
  }

    // Public API for THIS instance.
    return {
      start,
      stop,
      get running() {
        return _running;
      },
    };
  } // end makeSky

  // Two independent instances of the same engine, each bound to its canvas.
  window.LessonSky = makeSky("lessonSky"); // lesson page background
  window.EditorSky = makeSky("editorSky"); // built-in code editor background
})();
