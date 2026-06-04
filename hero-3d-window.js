/* =============================================================
   hero-3d-window.js — TRULY 3D hero code window (CSS extruded slab)
   Plain <script> (NOT an ES module). No Three.js, no import map.

   THE PROBLEM IT SOLVES
   ---------------------
   The right-hand hero panel (#heroCodeWindow, the day_10_loops.py editor) used
   to be a flat HTML card with a fake CSS perspective tilt. Next to it float real
   lit Three.js shapes with visible thickness and shaded side faces. The flat
   card looked pasted-on: no real depth, no side faces, no edge shading.

   THE TECHNIQUE (CSS extruded slab)
   ---------------------------------
   We turn the window into a REAL box built entirely from HTML/CSS in a single
   `transform-style: preserve-3d` context:

     • FRONT face  = the real #heroCodeWindow (titlebar + <pre> code). It's native
                     HTML, so the code text stays PERFECTLY CRISP and selectable.
                     Pushed forward by depth/2 along Z.
     • SIDE faces  = four thin divs (right / left / bottom / top), each rotated 90°
                     about the matching axis and positioned at the box edges, so
                     when the slab tilts you SEE its thickness and the side/edge
                     faces — shaded darker, with a violet→cyan edge sheen to echo
                     the lit floating cubes.

   Because the front face and the side faces are ONE DOM subtree under one
   preserve-3d wrapper, the text can NEVER drift off the box (there is no second
   renderer to keep in sync). Tilting the wrapper tilts text + thickness together.

   WHY NOT WebGL + CSS3DRenderer?
   ------------------------------
   The first attempt rendered a lit WebGL BoxGeometry behind a CSS3DRenderer text
   layer sharing one camera. The box looked great, but locking the CSS3D text
   object onto the tilting box front face proved too fragile (the text object's
   world matrix would not track per-frame), so the text mirrored / detached. The
   plan's documented fallback — this CSS slab — is far more robust and still shows
   genuine thickness and side faces. (See PLAN-true-3d-code-window.md §6.)

   COORDINATION WITH OTHER SYSTEMS
   -------------------------------
   - panel-physics.js applies its own CSS tilt to every `.panel-3d-real`.
     #heroCodeWindow matches that selector, so panel-physics MUST skip it (it
     filters it out by id) — otherwise two systems fight over one element.
   - app.js owns the typing animation and exposes window.heroTyper =
     { start, reset }. We drive typing on hover of the stage wrapper.
   - landing-fx.js boot()/shutdown() call window.HeroWindow3D.init()/destroy().

   Public API (for landing-fx.js):
     window.HeroWindow3D = { init, destroy, get running() }
   ============================================================= */

(function () {
  "use strict";

  // ── Environment gates ─────────────────────────────────────────
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Tunables ──────────────────────────────────────────────────
  // Slab depth in px (the visible thickness of the side faces).
  const DEPTH = 26;

  // Resting tilt (degrees). ~-9° yaw / ~+4° pitch: clearly 3D at rest, but the
  // front face stays square-on enough that the code reads easily. Matches the
  // other .panel-3d-real resting tilt so the whole hero feels consistent.
  const REST_YAW = -9;   // rotateY
  const REST_PITCH = 4;  // rotateX

  // Extra tilt added by the cursor, on TOP of the resting angle.
  const HOVER_YAW_RANGE = 8;   // deg added across the stage width
  const HOVER_PITCH_RANGE = 6; // deg added across the stage height

  // Spring easing toward the target tilt (per frame).
  const EASE = 0.10;

  // Perspective distance (px) on the stage. Smaller = stronger 3D.
  const PERSPECTIVE = 1300;

  // ── Module state ──────────────────────────────────────────────
  let _running = false;
  let stageEl = null;     // #heroWindow3DStage (perspective + hover)
  let glCanvas = null;    // #heroWindowGL (unused in CSS mode → hidden)
  let slabEl = null;      // the preserve-3d box wrapper we build
  let codeWindowEl = null;// #heroCodeWindow → becomes the FRONT face
  let originalParent = null, originalNextSibling = null, savedInlineCssText = "";
  let sideFaces = [];     // the four thickness divs we create
  let animId = null;
  let retryTimer = null;

  let curYaw = REST_YAW, curPitch = REST_PITCH;
  let targetYaw = REST_YAW, targetPitch = REST_PITCH;

  let onMove = null, onEnter = null, onLeave = null, onVisibility = null;

  // ── Gate ──────────────────────────────────────────────────────
  function canRun() {
    if (prefersReduced) return false;
    if (window.matchMedia("(max-width: 720px)").matches) return false; // flat on mobile
    return true;
  }

  // Build one thickness face. `kind` = right|left|bottom|top.
  function makeFace(kind) {
    const f = document.createElement("div");
    f.className = "hero-slab-face hero-slab-face--" + kind;
    f.setAttribute("aria-hidden", "true");
    return f;
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    if (_running) return;       // idempotent
    if (!canRun()) return;      // leave the flat fallback as-is

    stageEl = document.getElementById("heroWindow3DStage");
    glCanvas = document.getElementById("heroWindowGL");
    codeWindowEl = document.getElementById("heroCodeWindow");

    if (!stageEl || !codeWindowEl) {
      if (init._tries === undefined) init._tries = 0;
      if (init._tries < 10) {
        init._tries += 1;
        retryTimer = setTimeout(init, 150);
      }
      return;
    }
    init._tries = 0;
    _running = true;

    // The WebGL canvas isn't used in CSS-slab mode — hide it so it can't paint.
    if (glCanvas) glCanvas.style.display = "none";

    // Remember where the window lived so destroy() restores it exactly.
    originalParent = codeWindowEl.parentNode;
    originalNextSibling = codeWindowEl.nextSibling;
    savedInlineCssText = codeWindowEl.style.cssText;

    // ── Build the slab wrapper and move the window into it as the front face ──
    slabEl = document.createElement("div");
    slabEl.className = "hero-slab";
    slabEl.style.setProperty("--slab-depth", DEPTH + "px");

    // Insert the slab where the window was, then move the window inside it.
    originalParent.insertBefore(slabEl, codeWindowEl);
    slabEl.appendChild(codeWindowEl);

    // The window is now the FRONT face: neutralise the panel-physics resting tilt
    // (the slab owns the 3D) and push it forward by half the depth.
    codeWindowEl.classList.add("hero-slab-front");
    codeWindowEl.style.transform = "translateZ(calc(var(--slab-depth) / 2))";
    codeWindowEl.style.margin = "0";

    // ── Create the four thickness faces ──
    sideFaces = ["right", "left", "bottom", "top"].map(makeFace);
    sideFaces.forEach((f) => slabEl.appendChild(f));

    // ── Pointer interaction on the always-present stage ──
    onMove = (e) => {
      const rect = stageEl.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;  // -1..1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;  // -1..1
      targetYaw = REST_YAW + nx * HOVER_YAW_RANGE;
      targetPitch = REST_PITCH - ny * HOVER_PITCH_RANGE; // cursor down → tip down
    };
    onEnter = () => {
      if (window.heroTyper && typeof window.heroTyper.start === "function") {
        window.heroTyper.start();
      }
    };
    onLeave = () => {
      targetYaw = REST_YAW;
      targetPitch = REST_PITCH;
      if (window.heroTyper && typeof window.heroTyper.reset === "function") {
        window.heroTyper.reset();
      }
    };
    stageEl.addEventListener("mousemove", onMove);
    stageEl.addEventListener("mouseenter", onEnter);
    stageEl.addEventListener("mouseleave", onLeave);

    // Pause the spring loop when the tab is hidden.
    onVisibility = () => {
      if (document.hidden) {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
      } else if (_running && !animId) {
        animId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Apply the resting tilt immediately so it's 3D on the very first frame.
    applyTilt();
    animId = requestAnimationFrame(loop);
  }

  // Write the current tilt onto the slab.
  function applyTilt() {
    if (!slabEl) return;
    slabEl.style.transform =
      "rotateX(" + curPitch.toFixed(2) + "deg) rotateY(" + curYaw.toFixed(2) + "deg)";
  }

  // ── Spring loop ───────────────────────────────────────────────
  function loop() {
    animId = requestAnimationFrame(loop);
    curYaw += (targetYaw - curYaw) * EASE;
    curPitch += (targetPitch - curPitch) * EASE;
    applyTilt();
  }

  // ── Destroy ───────────────────────────────────────────────────
  function destroy() {
    if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
    if (!_running) return;
    _running = false;

    if (animId) { cancelAnimationFrame(animId); animId = null; }

    if (onMove) stageEl.removeEventListener("mousemove", onMove);
    if (onEnter) stageEl.removeEventListener("mouseenter", onEnter);
    if (onLeave) stageEl.removeEventListener("mouseleave", onLeave);
    if (onVisibility) document.removeEventListener("visibilitychange", onVisibility);
    onMove = onEnter = onLeave = onVisibility = null;

    // Remove the side faces.
    sideFaces.forEach((f) => { if (f.parentNode) f.parentNode.removeChild(f); });
    sideFaces = [];

    // Restore the window to its original DOM location + inline styles.
    if (codeWindowEl) {
      codeWindowEl.classList.remove("hero-slab-front");
      codeWindowEl.style.cssText = savedInlineCssText;
      if (originalParent) {
        originalParent.insertBefore(codeWindowEl, originalNextSibling || null);
      }
    }
    if (slabEl && slabEl.parentNode) slabEl.parentNode.removeChild(slabEl);
    slabEl = null;

    if (glCanvas) glCanvas.style.display = "";

    originalParent = originalNextSibling = null;
    codeWindowEl = stageEl = glCanvas = null;
    curYaw = targetYaw = REST_YAW;
    curPitch = targetPitch = REST_PITCH;
  }

  // ── Public API ────────────────────────────────────────────────
  window.HeroWindow3D = {
    init,
    destroy,
    get running() { return _running; },
  };
})();
