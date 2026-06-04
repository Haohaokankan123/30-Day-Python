/* =============================================================
   landing-tilt.js — 3D mouse-tilt + interactive showcases (LANDING)
   Two features, both vanilla (no React/Framer), both respect
   prefers-reduced-motion and clean up after themselves:

     1. tilt3D  — any element with class "tilt-3d" tilts in 3D toward
        the cursor (perspective rotateX/rotateY) with a soft spring,
        and flattens when the pointer leaves. Used by the hero code
        window and the AI-tutor showcase card.

     2. tutorDemo — the AI-tutor showcase card in the Features area:
        an auto Q&A typing loop (student question slides in, AI types
        a reply char-by-char with a typing indicator), pausing on
        hover so the user can read.

   Exposes window.LandingTilt = { initTilt, destroyTilt, initTutorDemo,
   destroyTutorDemo }. The hero code-window hover-typing lives in
   app.js (initCodeTyper) — this file only adds the 3D tilt to it.
   ============================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── cleanup registry (mirrors landing-fx.js pattern) ──
  let tiltCleanups = [];
  let demoCleanup = null;

  /* -------------------------------------------------------------
     1) 3D TILT — follow the cursor, spring back on leave
     ------------------------------------------------------------- */
  function initTilt() {
    if (prefersReduced) return;
    destroyTilt(); // idempotent across re-boots

    const els = document.querySelectorAll(".tilt-3d");
    els.forEach((el) => {
      // Per-element eased state so the tilt glides instead of snapping.
      const state = { rx: 0, ry: 0, trx: 0, try_: 0, hovering: false, raf: null };

      function onMove(e) {
        const r = el.getBoundingClientRect();
        // -0.5..0.5 from element center
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const MAX = 12; // degrees
        state.try_ = px * MAX * 2;   // rotateY follows horizontal
        state.trx = -py * MAX * 2;   // rotateX follows vertical (inverted)
      }
      function onEnter() {
        state.hovering = true;
        el.classList.add("tilt-active");
      }
      function onLeave() {
        state.hovering = false;
        el.classList.remove("tilt-active");
        state.trx = 0;
        state.try_ = 0;
      }

      function tick() {
        // ease toward target
        state.rx += (state.trx - state.rx) * 0.12;
        state.ry += (state.try_ - state.ry) * 0.12;
        const lift = state.hovering ? 18 : 0;
        el.style.transform =
          `perspective(1100px) rotateX(${state.rx.toFixed(2)}deg) ` +
          `rotateY(${state.ry.toFixed(2)}deg) translateZ(${lift}px)`;
        state.raf = requestAnimationFrame(tick);
      }

      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      state.raf = requestAnimationFrame(tick);

      tiltCleanups.push(() => {
        if (state.raf) cancelAnimationFrame(state.raf);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform = "";
        el.classList.remove("tilt-active");
      });
    });
  }

  function destroyTilt() {
    tiltCleanups.forEach((fn) => { try { fn(); } catch (_) {} });
    tiltCleanups = [];
  }

  /* -------------------------------------------------------------
     2) AI-TUTOR SHOWCASE — auto Q&A typing loop (pauses on hover)
     Drives #tutorDemoChat: appends a user bubble, then an AI bubble
     that types char-by-char (with a "•••" typing indicator first),
     waits, clears, and moves to the next pair. Forever.
     ------------------------------------------------------------- */
  const QA_PAIRS = [
    {
      q: "What does a for loop do?",
      a: "A for loop repeats code for each item in a sequence — like running the same step for every day in your list. 🔁",
    },
    {
      q: "Why use a function?",
      a: "Functions let you name a block of code and reuse it anywhere, so you write it once and call it many times. ✨",
    },
    {
      q: "What's a list in Python?",
      a: "A list holds many values in order, like [1, 2, 3]. You can add, remove, and loop over them. 📦",
    },
  ];

  function initTutorDemo() {
    if (prefersReduced) {
      // Static fallback: show the first pair, no animation.
      const chat = document.getElementById("tutorDemoChat");
      if (chat) {
        chat.innerHTML =
          bubbleHTML("user", QA_PAIRS[0].q) + bubbleHTML("ai", QA_PAIRS[0].a);
      }
      return;
    }
    destroyTutorDemo();

    const chat = document.getElementById("tutorDemoChat");
    if (!chat) return;

    let alive = true;
    let paused = false;
    const card = chat.closest(".tutor-demo-card") || chat;

    function onEnter() { paused = true; }
    function onLeave() { paused = false; }
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    // small promise-based sleep that bails if destroyed
    const sleep = (ms) =>
      new Promise((res) => {
        const id = setTimeout(res, ms);
        sleep._ids.push(id); // stored so cleanup can clear it
      });
    sleep._ids = [];

    async function waitWhilePaused() {
      while (paused && alive) await sleep(120);
    }

    async function typeInto(node, text) {
      for (let i = 0; i < text.length && alive; i++) {
        await waitWhilePaused();
        node.textContent = text.slice(0, i + 1);
        // vary speed a touch for a human feel
        await sleep(14 + (text[i] === " " ? 10 : 0));
      }
    }

    // Play the Q&A sequence ONCE (no infinite loop). Charles: it should only
    // replay when the user scrolls away and comes back — handled by the
    // IntersectionObserver below, not by looping here.
    let playing = false;
    async function playOnce() {
      if (playing || !alive) return;
      playing = true;
      for (let p = 0; p < QA_PAIRS.length && alive; p++) {
        const pair = QA_PAIRS[p];
        chat.innerHTML = "";
        await waitWhilePaused();

        // user question slides in
        const userB = makeBubble("user");
        chat.appendChild(userB);
        requestAnimationFrame(() => userB.classList.add("in"));
        await typeInto(userB.querySelector(".tutor-demo-text"), pair.q);
        await sleep(500);

        // AI typing indicator, then typed answer
        const aiB = makeBubble("ai");
        chat.appendChild(aiB);
        requestAnimationFrame(() => aiB.classList.add("in"));
        const aiText = aiB.querySelector(".tutor-demo-text");
        const dots = document.createElement("span");
        dots.className = "tutor-demo-dots";
        dots.innerHTML = "<i></i><i></i><i></i>";
        aiText.appendChild(dots);
        await sleep(700);
        aiText.textContent = "";
        await typeInto(aiText, pair.a);

        await sleep(1800); // let the user read
      }
      playing = false; // finished — sits settled until a re-entry replays it
    }

    // Replay only on scroll-away-and-back: when the card leaves the viewport
    // and later re-enters, run the one-shot again. Also plays on first appearance.
    let wasVisible = false;
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        const vis = entries[0] && entries[0].isIntersecting;
        if (vis && !wasVisible) {
          wasVisible = true;
          if (!playing) playOnce();
        } else if (!vis) {
          wasVisible = false; // left the viewport → arm the next re-entry replay
        }
      }, { threshold: 0.35 });
      io.observe(card);
    } else {
      playOnce(); // no IO support → just play once
    }

    demoCleanup = () => {
      alive = false;
      if (io) { io.disconnect(); io = null; }
      sleep._ids.forEach((id) => clearTimeout(id));
      sleep._ids = [];
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }

  function destroyTutorDemo() {
    if (demoCleanup) { try { demoCleanup(); } catch (_) {} demoCleanup = null; }
  }

  // ── bubble builders ──
  function makeBubble(kind) {
    const wrap = document.createElement("div");
    wrap.className = "tutor-demo-bubble " + kind;
    const txt = document.createElement("div");
    txt.className = "tutor-demo-text";
    wrap.appendChild(txt);
    return wrap;
  }
  function bubbleHTML(kind, text) {
    return (
      '<div class="tutor-demo-bubble ' + kind + ' in"><div class="tutor-demo-text">' +
      text.replace(/</g, "&lt;") +
      "</div></div>"
    );
  }

  window.LandingTilt = { initTilt, destroyTilt, initTutorDemo, destroyTutorDemo };
})();
