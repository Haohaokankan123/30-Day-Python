# PLAN — Truly-3D Hero Code Window (WebGL box + crisp HTML text layer)

> **How to use this file:** After compacting the conversation, paste this whole file
> (or its path) back to Claude and say: *"Follow this plan. Use ultracode."*
> Everything Claude needs to resume cold is in here — no prior context required.

---

## 0. ONE-LINE GOAL

Make the **hero code window** (`#heroCodeWindow`, the `day_10_loops.py` panel on the
right of the landing hero) look **truly 3D like the floating objects** beside it — you
can see its **thickness, side faces, and the back/edges** when it's tilted — while the
**code text stays perfectly crisp** (never blurry).

Charles's exact words: *"the thing is not truly 3D, I want it to be the same as like the
3D objects ... make all of them truly 3D so like you could see how thick it is and like
the other sides because it is tilted and 3D."* And his chosen technique: *"could text
just be a whole new property and just make it 3D but now soft?"* → resolved as: the box
is a real lit WebGL solid; the text is a SEPARATE crisp HTML layer locked onto its front
face. Scope for THIS plan: **hero code window ONLY** (perfect it here, then roll to the
AI-tutor card + code/quiz card in a follow-up).

---

## 1. WHY THE CURRENT VERSION ISN'T "TRULY 3D"

The current `.panel-3d-real` (in `panel-physics.js` + `style.css`) applies a CSS
`perspective(1100px) rotateX(6deg) rotateY(±9deg) translateZ(8px)` transform to a flat
`<div>`. A `<div>` is an **infinitely-thin single plane** — rotating it shows the front
face at an angle but NO thickness and NO side faces. It reads as "a flat card turned a
bit," not a solid block. To show thickness you need actual depth geometry (a box with 6
faces), which a single transformed div cannot provide.

---

## 2. THE CHOSEN TECHNIQUE (decided with Charles)

**Two layers, one shared camera, rendered every frame in lockstep:**

1. **WebGL layer (the BODY):** a real **Three.js lit box mesh** (`BoxGeometry`) — a solid
   slab with genuine thickness. Lit exactly like the hero's floating objects
   (`landing-3d.js` lighting), so you see shaded side/edge/back faces as it tilts. This is
   the "truly 3D like the objects" part. The front face is the dark editor surface.

2. **CSS3D layer (the TEXT):** the **real HTML** of the code window (`#heroCodePre`
   contents — crisp, selectable, syntax-highlighted) wrapped in a `CSS3DObject` and
   rendered by a `CSS3DRenderer` that **shares the SAME camera** as the WebGL renderer.
   Because it's native HTML (not a texture), the text stays razor-sharp at any angle. It
   sits exactly on the FRONT face of the WebGL box.

**The hard part = ALIGNMENT.** The WebGL box and the CSS3DObject must occupy the exact
same position/rotation/scale in 3D, share one `PerspectiveCamera`, and the two renderer
layers must overlap pixel-for-pixel. CSS3DRenderer uses CSS `matrix3d` so it matches the
WebGL projection IF the camera FOV/aspect/position are identical and the CSS3D object's
world units match the box's. **This is the thing that needs careful tuning + verification.**

> Reference already in the repo: `panel-physics.js` ALREADY imports `CSS3DRenderer,
> CSS3DObject` from `three/addons/renderers/CSS3DRenderer.js` and has a working WebGL
> `scene`/`camera`/`renderer`. The import map is already in `index.html`. So the ESM
> plumbing is proven — this plan extends it.

---

## 3. EXACT REPO ANCHORS (verified this session)

- **Hero window markup** — `index.html` ~line 164:
  ```html
  <div class="landing-hero-right hero-sub-fade">
      <div class="landing-code-window panel-3d-real" id="heroCodeWindow">
          <div class="landing-code-titlebar">
              <span class="lc-dot dot-red"></span><span class="lc-dot dot-yellow"></span><span class="lc-dot dot-green"></span>
              <span class="landing-code-filename">day_10_loops.py</span>
          </div>
          <pre class="landing-code-body" id="heroCodePre"></pre>
      </div>
  </div>
  ```
- **Typing animation** — `app.js` `initCodeTyper()` ~line 2079. Fills `#heroCodePre`,
  EMPTY on load, types on `mouseenter` of `#heroCodeWindow`, resets on `mouseleave`.
  (Do NOT break this — the 3D box must host the SAME `#heroCodePre` so typing still works.)
- **Existing 3D module** — `panel-physics.js` (ES module, `?v=2` in index.html ~line
  1186). Imports three (ESM), CSS3DRenderer, cannon-es. Has `window.PanelPhysics =
  {init, destroy, running}`. WebGL renderer/scene/camera built in `initPhysics()`.
  Camera `PerspectiveCamera(50, W/H, 0.1, 100)` at z=14.
- **Floating-objects reference (match this look)** — `landing-3d.js` ~line 73-107:
  `WebGLRenderer({antialias, alpha})`, `ACESFilmicToneMapping` exposure 1.15,
  `PerspectiveCamera(52,...)` z=8, lights: ambient `0x0d0821` i3, key white i4 @ (5,8,6),
  fill violet `0x8b5cf6` i2 @ (-6,2,-4), rim cyan `0x06b6d4` i1.5 @ (2,-5,-5), accent
  indigo `0x4f46e5` i1.2 @ (-3,6,2). MeshPhysicalMaterial metalness ~0.9.
- **Import map** — already in `index.html` (~line 1175, before three.min.js):
  `"three"` → three.module.js, `"three/addons/"` → examples/jsm/, `"cannon-es"`.
- **Current `.panel-3d-real` CSS** — `style.css` ~line 9146 (resting tilt +
  nth-of-type even). For the hero window this CSS resting transform should be
  REMOVED/overridden so the WebGL+CSS3D system owns the hero window's 3D (avoid
  double-transform). Keep `.panel-3d-real` resting CSS for the OTHER panels until migrated.
- **Script load order** — `panel-physics.js` is `<script type="module">`; loads after
  `landing-tilt.js`, before `landing-fx.js` finishes booting. `landing-fx.js` `boot()`
  calls `window.PanelPhysics.init()` (with a retry loop since module loads async);
  `shutdown()` calls `window.PanelPhysics.destroy()`.
- **Cache-bust:** bump `?v=` in index.html for every edited file. Current versions:
  style.css?v=43, app.js?v=20, panel-physics.js?v=2, landing-fx.js?v=20,
  landing-tilt.js?v=2, landing-3d.js?v=9, days-data.js?v=3.
- **Branch/remote:** work is on `feat/space-ui-overhaul-lessons`, pushed to
  `github.com/Haohaokankan123/30-Day-Python`. Commit there.

---

## 4. BUILD — STEP BY STEP

> Recommend a NEW dedicated ES module `hero-3d-window.js` rather than overloading
> `panel-physics.js`, so the intricate sync logic is isolated and easy to tune/disable.
> It imports its own three (ESM) via the existing import map.

### Step A — Mount points (index.html)
Inside `.landing-hero-right`, add two stacked, perfectly-overlapping layers + keep the
real HTML window as the CSS3D source:
- `<canvas id="heroWindowGL">` — the WebGL box renderer target.
- A positioned wrapper `<div id="heroWindow3DStage">` that the CSS3DRenderer's runtime
  `<div>` mounts into, exactly overlapping `#heroWindowGL`.
- Keep `#heroCodeWindow` (with `#heroCodePre`) — it becomes the CSS3DObject's element
  (moved into the CSS3D layer at init). Typing still targets `#heroCodePre`.
- Both layers: `position:absolute; inset:0;` within the sized stage; `pointer-events`
  only on the CSS3D text layer (so hover-typing + selection work); WebGL canvas
  `pointer-events:none`.

### Step B — `hero-3d-window.js` (NEW ES module)
1. `import * as THREE from "three"; import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";`
2. `canRun()` gate: skip on `prefers-reduced-motion` or no WebGL → fall back to the
   current flat CSS panel. On touch/coarse pointer, static 3D or flat (decide by testing).
3. WebGL renderer (alpha, ACESFilmic to match the cubes), sized to stage, DPR cap 1.5.
4. `CSS3DRenderer` sized to the SAME stage; `domElement` overlays the canvas.
5. **One shared `PerspectiveCamera`** (e.g. FOV 40, positioned so the box fills the
   stage). BOTH renderers render with this same camera each frame.
6. **The box:** `BoxGeometry(w, h, depth)` where w/h match the window aspect ratio and
   `depth` ≈ 0.18–0.3 of height (visible thickness). Material: dark editor-surface front
   (`MeshStandardMaterial` color ~`#11131e`, low roughness, slight metalness) so
   side/edge faces shade under the lights like the cubes. Add the SAME lights as
   `landing-3d.js`. Optionally `RoundedBoxGeometry` from
   `three/addons/geometries/RoundedBoxGeometry.js` for soft edges — VERIFY the CDN URL
   returns 200 first; fall back to plain BoxGeometry if not.
7. **The text layer:** wrap `#heroCodeWindow` (real HTML, titlebar + `#heroCodePre`) in a
   `CSS3DObject`. Scale/position so it lands exactly on the box's FRONT face (z=+depth/2).
   CSS3DRenderer convention: pick a consistent `CSS3D_SCALE` mapping HTML px → world
   units so the object matches the box's world width/height. **This ratio is the crux —
   tune until the HTML text sits exactly on the front face at rest AND when tilted.**
8. **Resting tilt + interaction:** put the box in a `THREE.Group`; give the group a
   resting rotation (e.g. rotateY ~ -0.32rad, rotateX ~ 0.10rad) so it's clearly 3D at
   rest. On `mousemove` over the stage, ease the group rotation toward the cursor; spring
   back to resting on leave. Set the CSS3DObject's transform from the SAME group every
   frame so text + box never separate.
9. **Render loop:** delta-time rAF; `glRenderer.render(scene, camera);
   css3dRenderer.render(css3dScene, camera);` each frame. visibilitychange pause.
10. **Lifecycle:** `init()` / `destroy()` (dispose box geo/mat, renderer, remove CSS3D
    domElement, restore `#heroCodeWindow` to its original DOM spot). Expose
    `window.HeroWindow3D = {init, destroy, running}`.
11. **Wire into `landing-fx.js`** `boot()` (call `HeroWindow3D.init()` after a retry for
    module load) and `shutdown()` (`HeroWindow3D.destroy()`), mirroring `PanelPhysics`.
    Ensure it does NOT double-run with `PanelPhysics`'s tilt on the same element — remove
    `#heroCodeWindow` from `PanelPhysics`'s `.panel-3d-real` tilt set (skip it by id).

### Step C — CSS (style.css)
- `#heroWindow3DStage`, `#heroWindowGL` mount styles (absolute, overlapping, sized to the
  hero-right column).
- Remove the flat resting transform from `#heroCodeWindow` specifically (WebGL+CSS3D owns
  it now) — but KEEP `.panel-3d-real` resting CSS for the other panels.
- Keep `#heroCodePre` crisp: no filters.
- Reduced-motion: hide the GL canvas, show the plain flat `#heroCodeWindow`.
- Bump `style.css?v=`.

### Step D — Keep typing working
`initCodeTyper()` targets `#heroCodePre` + `#heroCodeWindow` mouseenter. After the
CSS3DObject wraps `#heroCodeWindow`, those elements still exist (relocated into the CSS3D
layer), so listeners keep working — BUT verify `mouseenter` still fires (CSS3D layer must
have `pointer-events:auto`). If hover breaks because the element is transformed, attach
the hover listener to `#heroWindow3DStage` instead and call the same start/reset typing
functions (may need to expose `window.heroTyper = {start, reset}` from app.js).

---

## 5. VERIFICATION (Playwright MCP — always Playwright, never Chrome ext)

Local server (`python3 -m http.server`), navigate, `browser_resize 1440x900`, then:
1. **0 console errors** — ESPECIALLY no module/import/CSS3DRenderer/RoundedBoxGeometry
   resolve errors. (favicon + focus-beats 404 + three.js r150 warning are expected.)
2. `window.HeroWindow3D.running === true`; `#heroWindowGL` canvas exists, non-zero size.
3. **Text crisp + real DOM:** `#heroCodePre` selectable HTML (not a texture); textContent
   updates when hovering (typing still works).
4. **Box truly 3D:** screenshot at rest — confirm visible THICKNESS / side faces (not a
   flat card). Compare to the floating cubes — same lit, solid look.
5. **Alignment:** the crisp HTML text sits ON the box front face at rest AND after a
   simulated tilt (dispatch mousemove over the stage). No visible drift/gap. KEY CHECK —
   screenshot tilted.
6. **Hover typing:** empty on load; hovering types the code; leaving resets.
7. **Leak test:** goHome()→startLearning() x2; canvas count stable; HeroWindow3D
   running=false after goHome, re-inits on return.
8. **Reduced-motion:** emulate → flat fallback window, text readable, no GL canvas.
9. Mobile `browser_resize 390x844`: acceptable fallback (flat or static).

**pass only if:** 0 module/console errors, box shows real thickness/sides, text crisp +
aligned to the front face at rest AND tilted, typing works, no leaks.

---

## 6. RISKS / KNOWN-HARD PARTS (be honest, budget iterations)

- **Text↔box alignment drift** is the #1 risk. The CSS3D scale↔world-unit ratio and the
  shared-camera FOV must match precisely. Expect to tune `CSS3D_SCALE`, camera FOV, and
  box dimensions iteratively. Verify at multiple tilt angles + viewport widths.
- **RoundedBoxGeometry addon** may not be on the pinned CDN path — verify
  `three@0.152.2/examples/jsm/geometries/RoundedBoxGeometry.js` returns 200 before relying
  on it; fall back to `BoxGeometry`.
- **Two renderers = perf** — keep DPR ≤1.5, pause on visibility hidden, one box only.
- **Don't break typing or `goHome/startLearning`** — `#heroCodeWindow` / `#heroCodePre`
  must survive being moved into the CSS3D layer; restore on destroy.
- **Don't double-transform** — remove `#heroCodeWindow` from `PanelPhysics` tilt.
- If alignment is too fragile after a couple passes, the agreed FALLBACK is the **CSS
  extruded-slab box** (real thickness via CSS face divs, crisp text, no renderer-sync) —
  still shows thickness/sides, far more robust. Tell Charles before switching.

---

## 7. ULTRACODE EXECUTION SHAPE (suggested)

- **Stage 1 (author):** `hero-3d-window.js` ES module (WebGL box + CSS3DRenderer text
  sync + lifecycle). One focused agent — the intricate core.
- **Stage 2 (integrate):** index.html mount points + script tag + cache bumps; style.css
  mounts + remove hero flat transform; app.js typing hookup; landing-fx boot/shutdown.
  One integrator agent (owns all shared files, no collisions).
- **Stage 3 (verify):** Playwright agent runs §5 — ESPECIALLY screenshot the box tilted
  and confirm text glued to the front face + crisp. Return structured pass/fail.
- Then Claude reviews screenshots itself, tunes alignment if needed, commits.

---

## 8. AFTER IT WORKS

- Commit on branch `feat/space-ui-overhaul-lessons` (pushed to
  `github.com/Haohaokankan123/30-Day-Python`).
- THEN roll the same technique to the AI-tutor card + code/quiz card (the other panels
  Charles wants "truly 3D"), reusing `hero-3d-window.js` generalized to any target.
- Update memory if a durable gotcha emerges (e.g. the exact working CSS3D_SCALE).
