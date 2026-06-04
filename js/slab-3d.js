/* =============================================================
   slab-3d.js — Generic CSS extruded slab for any card element.
   Mark any element with data-slab="depth" (px) to give it real
   visible side faces. Works exactly like hero-3d-window.js but
   handles N elements automatically.

   Plain <script> (NOT an ES module). No imports.

   Public API:
     window.Slab3D = { init, destroy, get running() }
   ============================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Default tunables — strong enough that side faces are obvious at rest
  const DEPTH_DEFAULT     = 24;
  const REST_YAW          = -8;
  const REST_PITCH        = 4;
  const HOVER_YAW_RANGE   = 6;   // gentle cursor sway — never swings the card hard
  const HOVER_PITCH_RANGE = 4;
  const EASE              = 0.10;
  const PERSPECTIVE       = 900;

  let _running = false;
  let slabs = [];
  let animId = null;
  let onVisibility = null;
  let retryTimer = null;

  function canRun() {
    if (prefersReduced) return false;
    if (window.matchMedia("(max-width: 720px)").matches) return false;
    return true;
  }

  function makeFace(kind) {
    const f = document.createElement("div");
    f.className = "slab3d-face slab3d-face--" + kind;
    f.setAttribute("aria-hidden", "true");
    return f;
  }

  function buildSlab(el) {
    const depth      = parseFloat(el.dataset.slab  || DEPTH_DEFAULT);
    const startYaw   = parseFloat(el.dataset.slabYaw   !== undefined ? el.dataset.slabYaw   : REST_YAW);
    const startPitch = parseFloat(el.dataset.slabPitch !== undefined ? el.dataset.slabPitch : REST_PITCH);

    // Outer wrapper: holds perspective (must be parent of the preserve-3d element).
    const outerEl = document.createElement("div");
    outerEl.className = "slab3d-outer";
    outerEl.style.perspective = PERSPECTIVE + "px";
    outerEl.style.perspectiveOrigin = "60% 40%";
    outerEl.style.overflow = "visible";

    // Inner preserve-3d box: receives the rotateX/Y tilt.
    const slabEl = document.createElement("div");
    slabEl.className = "slab3d";
    slabEl.style.setProperty("--slab3d-depth", depth + "px");

    el.parentNode.insertBefore(outerEl, el);
    outerEl.appendChild(slabEl);
    slabEl.appendChild(el);

    el.classList.add("slab3d-front");
    el.style.transform = "translateZ(" + (depth / 2).toFixed(1) + "px)";

    const faces = ["right", "left", "bottom", "top"].map(makeFace);
    faces.forEach(f => slabEl.appendChild(f));

    const state = {
      el, slabEl, outerEl, faces,
      curYaw: startYaw, curPitch: startPitch,
      targetYaw: startYaw, targetPitch: startPitch,
      restYaw: startYaw, restPitch: startPitch,
    };

    const onMove = (e) => {
      const rect = outerEl.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      const ny = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
      state.targetYaw   = startYaw   + nx * HOVER_YAW_RANGE;
      state.targetPitch = startPitch - ny * HOVER_PITCH_RANGE;
    };
    const onLeave = () => {
      state.targetYaw   = startYaw;
      state.targetPitch = startPitch;
    };

    outerEl.addEventListener("mousemove",  onMove);
    outerEl.addEventListener("mouseleave", onLeave);
    state.onMove  = onMove;
    state.onLeave = onLeave;

    applyTilt(state);
    return state;
  }

  function applyTilt(s) {
    s.slabEl.style.transform =
      "rotateX(" + s.curPitch.toFixed(2) + "deg) rotateY(" + s.curYaw.toFixed(2) + "deg)";
  }

  function loop() {
    animId = requestAnimationFrame(loop);
    for (let i = 0; i < slabs.length; i++) {
      const s = slabs[i];
      s.curYaw   += (s.targetYaw   - s.curYaw)   * EASE;
      s.curPitch += (s.targetPitch - s.curPitch) * EASE;
      applyTilt(s);
    }
  }

  function init() {
    if (_running) return;
    if (!canRun()) return;

    const targets = Array.from(document.querySelectorAll("[data-slab]"))
      .filter(el => el.id !== "heroCodeWindow");

    if (!targets.length) {
      if (!init._tries) init._tries = 0;
      if (init._tries < 10) { init._tries++; retryTimer = setTimeout(init, 200); }
      return;
    }
    init._tries = 0;
    _running = true;

    slabs = targets.map(buildSlab);

    onVisibility = () => {
      if (document.hidden) {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
      } else if (_running && !animId) {
        animId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    animId = requestAnimationFrame(loop);
  }

  function destroy() {
    if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
    if (!_running) return;
    _running = false;
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    if (onVisibility) { document.removeEventListener("visibilitychange", onVisibility); onVisibility = null; }

    slabs.forEach(s => {
      if (s.onMove)  s.outerEl.removeEventListener("mousemove",  s.onMove);
      if (s.onLeave) s.outerEl.removeEventListener("mouseleave", s.onLeave);
      s.faces.forEach(f => { if (f.parentNode) f.parentNode.removeChild(f); });
      s.el.classList.remove("slab3d-front");
      s.el.style.transform = "";
      // Restore el to original location, remove both wrappers
      if (s.outerEl.parentNode) {
        s.outerEl.parentNode.insertBefore(s.el, s.outerEl);
        s.outerEl.parentNode.removeChild(s.outerEl);
      }
    });
    slabs = [];
  }

  window.Slab3D = { init, destroy, get running() { return _running; } };
})();
