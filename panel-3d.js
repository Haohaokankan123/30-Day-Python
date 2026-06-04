/* =============================================================
   panel-3d.js — Faint Three.js background scenes for panels
   Three independent, very-faint background canvases:
     1. editor scene  -> #editorFX3D  (drifting Python code lines)
     2. tutor scene   -> #tutorFX3D   (Q&A chat bubbles popping in/out)
     3. lesson scene  -> #lessonFX3D  (starfield + drifting code planes)

   Each canvas sits BEHIND crisp content at low CSS opacity (~0.15);
   materials stay readable (~0.5) so the faint host opacity is the
   only dimmer.

   Follows the EXACT lifecycle of landing-3d.js:
     - IIFE + "use strict"
     - prefersReduced + per-scene canRun() gate
     - WebGLRenderer({canvas, antialias:true, alpha:true})
     - DPR = Math.min(devicePixelRatio, 1.5)
     - delta-time rAF loop (dt capped at 0.05)
     - visibilitychange pause/resume
     - cleanup() disposes EVERY geometry + material + renderer,
       nulls scene/camera, removes resize listener

   Exposes:
     window.PanelFX = {
       editor: { start, stop, get running() },
       tutor:  { start, stop, get running() },
       lesson: { start, stop, get running() },
     };
   ============================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

  // ── Brand palette (CSS hex, for 2D canvas textures) ──
  const INDIGO = "#6366f1"; // indigo-500
  const INDIGO_LIGHT = "#818cf8"; // indigo-400
  const VIOLET = "#8b5cf6"; // violet-500
  const VIOLET_LIGHT = "#a78bfa"; // violet-400
  const CYAN = "#06b6d4"; // cyan-500

  // ── Shared WebGL support probe ──
  function hasWebGL() {
    try {
      const test = document.createElement("canvas");
      const gl =
        test.getContext("webgl") || test.getContext("experimental-webgl");
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  /* -------------------------------------------------------------
     makeBubbleTexture(kind) — tutor scene helper
     Draws a rounded-rect chat bubble. kind "q" => indigo tint,
     kind "a" => cyan/violet tint. Transparent background.
     ------------------------------------------------------------- */
  function makeBubbleTexture(THREE, kind) {
    const cw = 256;
    const ch = 160;
    const r = 34; // corner radius
    const m = 16; // margin so glow isn't clipped

    const cvs = document.createElement("canvas");
    cvs.width = cw;
    cvs.height = ch;
    const ctx = cvs.getContext("2d");

    const x = m;
    const y = m;
    const w = cw - m * 2;
    const h = ch - m * 2;

    // Rounded-rect path.
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();

    const isQ = kind === "q";
    const fill = isQ ? "rgba(99,102,241,0.42)" : "rgba(6,182,212,0.42)";
    const stroke = isQ ? INDIGO_LIGHT : VIOLET_LIGHT;

    ctx.shadowColor = isQ ? INDIGO : CYAN;
    ctx.shadowBlur = 22;
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = stroke;
    ctx.stroke();

    // A couple of faux "text" lines inside the bubble.
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    const lineX = x + 22;
    const lineW = w - 44;
    ctx.fillRect(lineX, y + h * 0.34, lineW, 8);
    ctx.fillRect(lineX, y + h * 0.56, lineW * 0.7, 8);

    const texture = new THREE.CanvasTexture(cvs);
    if (THREE.SRGBColorSpace !== undefined) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    return { texture, aspect: cw / ch };
  }

  // ── Size helper: renderer follows the canvas's PARENT element ──
  function parentSize(canvas) {
    const host = canvas.parentElement;
    const W = host && host.offsetWidth ? host.offsetWidth : window.innerWidth;
    const H = host && host.offsetHeight ? host.offsetHeight : window.innerHeight;
    return { W, H };
  }

  /* =============================================================
     SCENE FACTORY
     Each scene shares the same lifecycle skeleton (canRun/start/
     stop/running) and only differs in build() + step(). This keeps
     the dispose path identical and complete for all three.
     ============================================================= */
  function makeScene(canvasId, build) {
    let _running = false;
    let renderer = null;
    let scene = null;
    let camera = null;
    let animId = null;
    let cleanup = null;

    function canRun() {
      if (prefersReduced) return false;
      if (!window.THREE) return false;
      if (!document.getElementById(canvasId)) return false;
      if (!hasWebGL()) return false;
      return true;
    }

    function start() {
      if (_running) return;
      if (!canRun()) return;

      const THREE = window.THREE;
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      const { W, H } = parentSize(canvas);

      _running = true;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(DPR);
      renderer.setSize(W, H, false);
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
      camera.position.set(0, 0, 10);

      // build() returns { step(t,dt), disposables:[{geometry,material}|{...}] }
      const built = build(THREE, scene, camera, W, H);
      const step = built.step;
      const disposables = built.disposables || [];

      function onResize() {
        if (!renderer) return;
        const s = parentSize(canvas);
        camera.aspect = s.W / s.H;
        camera.updateProjectionMatrix();
        renderer.setSize(s.W, s.H, false);
        if (typeof built.onResize === "function") built.onResize(s.W, s.H);
      }
      window.addEventListener("resize", onResize);

      function onVisible() {
        if (document.hidden) {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        } else if (_running && !animId) {
          lastNow = performance.now();
          animId = requestAnimationFrame(loop);
        }
      }
      document.addEventListener("visibilitychange", onVisible);

      let t = 0;
      let lastNow = performance.now();

      function loop(now) {
        if (!_running) return;
        animId = requestAnimationFrame(loop);

        const dt = Math.min((now - lastNow) / 1000, 0.05);
        lastNow = now;
        t += dt;

        step(t, dt);
        renderer.render(scene, camera);
      }

      animId = requestAnimationFrame(loop);

      cleanup = () => {
        _running = false;
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisible);

        // Dispose EVERY geometry + material (+ any texture maps).
        disposables.forEach((d) => {
          if (!d) return;
          if (d.geometry && typeof d.geometry.dispose === "function") {
            d.geometry.dispose();
          }
          if (d.material) {
            const mats = Array.isArray(d.material) ? d.material : [d.material];
            mats.forEach((m) => {
              if (!m) return;
              if (m.map && typeof m.map.dispose === "function") m.map.dispose();
              if (typeof m.dispose === "function") m.dispose();
            });
          }
        });

        if (renderer) {
          renderer.dispose();
          renderer = null;
        }
        scene = null;
        camera = null;
      };
    }

    function stop() {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
      _running = false;
    }

    return {
      start,
      stop,
      get running() {
        return _running;
      },
    };
  }

  /* =============================================================
     NOTE: the editor scene was removed (Charles wanted no faint
     running-code behind the code editor). window.PanelFX.editor is a
     no-op stub below; buildEditor + EDITOR_LINES were deleted as dead code.
     ============================================================= */

  /* =============================================================
     2) TUTOR SCENE — Q&A chat bubbles popping in/out (#tutorFX3D)
     Always looping: each bubble scales in, holds, fades out, then
     respawns with the opposite kind (Q -> A rhythm) at a new spot.
     ============================================================= */
  function buildTutor(THREE, scene, camera, W, H) {
    camera.position.set(0, 0, 10);

    const count = 9; // ~8-10 bubbles
    const bubbleH = 1.5; // world height of a bubble plane

    // Pre-build one texture per kind and SHARE across bubbles so the
    // dispose list stays small and complete.
    const qTex = makeBubbleTexture(THREE, "q");
    const aTex = makeBubbleTexture(THREE, "a");

    // Template material — each bubble clones this for independent opacity.
    const baseMat = new THREE.MeshBasicMaterial({
      map: qTex.texture,
      transparent: true,
      opacity: 0,
      blending: THREE.NormalBlending,
      depthWrite: false,
      depthTest: false,
    });

    const qGeo = new THREE.PlaneGeometry(bubbleH * qTex.aspect, bubbleH);
    const aGeo = new THREE.PlaneGeometry(bubbleH * aTex.aspect, bubbleH);

    // Disposables: shared geometries + shared textures live in dedicated
    // entries; each bubble mesh entry (pushed below) disposes its own
    // CLONED material. Geometry is shared, so only dispose it once here.
    const disposables = [
      { geometry: qGeo, material: null },
      { geometry: aGeo, material: null },
      { geometry: null, material: { dispose: () => qTex.texture.dispose() } },
      { geometry: null, material: { dispose: () => aTex.texture.dispose() } },
      { geometry: null, material: baseMat },
    ];

    const bubbles = [];

    // Place/reset a bubble as a Q or A and roll fresh timing/motion.
    // Each bubble owns a CLONED material (independent opacity); we only
    // swap its .map + geometry to flip kind. Shared geometry is reused.
    function spawn(b, kind, t) {
      b.kind = kind;
      const isQ = kind === "q";
      b.mesh.geometry = isQ ? qGeo : aGeo;
      b.mesh.material.map = isQ ? qTex.texture : aTex.texture;
      b.mesh.material.needsUpdate = true;

      // Q bubbles lean left, A bubbles lean right — chat rhythm.
      const side = isQ ? -1 : 1;
      b.baseX = side * (1.0 + Math.random() * 2.4);
      b.baseY = (Math.random() - 0.5) * 5;
      b.mesh.position.set(b.baseX, b.baseY, (Math.random() - 0.5) * 3 - 1);

      b.born = t;
      b.life = 3.2 + Math.random() * 2.6; // pop-in, hold, fade-out window
      b.maxOpacity = 0.4 + Math.random() * 0.25;
      b.driftY = 0.12 + Math.random() * 0.18; // gentle upward drift
      b.swayAmp = 0.05 + Math.random() * 0.1;
      b.swaySpeed = 0.4 + Math.random() * 0.6;
      b.swayPhase = Math.random() * Math.PI * 2;
    }

    for (let i = 0; i < count; i++) {
      // Clone a base material so every bubble fades independently.
      const mat = baseMat.clone();
      const mesh = new THREE.Mesh(qGeo, mat);
      scene.add(mesh);

      const b = { mesh, kind: "q" };
      // Negative born => staggered births so they don't pulse together.
      spawn(b, i % 2 === 0 ? "q" : "a", -Math.random() * 4);
      bubbles.push(b);
      disposables.push(mesh); // disposes the cloned material (geometry shared)
    }

    function step(t, dt) {
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const age = t - b.born;
        const k = age / b.life; // 0..1 progress through life

        if (k >= 1) {
          // Recycle forever, alternating to the opposite kind.
          spawn(b, b.kind === "q" ? "a" : "q", t);
          continue;
        }

        // Envelope: scale-in (ease-out) for first 18%, hold, fade-out
        // over the last 35% of life.
        let env;
        if (k < 0.18) {
          const e = k / 0.18;
          env = 1 - Math.pow(1 - e, 3); // easeOutCubic
        } else if (k > 0.65) {
          env = 1 - (k - 0.65) / 0.35;
        } else {
          env = 1;
        }
        env = Math.max(0, Math.min(1, env));

        b.mesh.material.opacity = b.maxOpacity * env;

        // Scale pops from 0.8 -> 1.0 during the entrance.
        const s = 0.82 + 0.18 * (k < 0.18 ? env : 1);
        b.mesh.scale.set(s, s, 1);

        // Gentle drift + sway.
        b.mesh.position.y = b.baseY + age * b.driftY;
        b.mesh.position.x =
          b.baseX + Math.sin(t * b.swaySpeed + b.swayPhase) * b.swayAmp;
      }
    }

    return { step, disposables };
  }

  /* =============================================================
     3) LESSON SCENE — starfield + drifting code planes (#lessonFX3D)
     Spans the whole lesson #app area.
     ============================================================= */
  function buildLesson(THREE, scene, camera, W, H) {
    camera.position.set(0, 0, 12);

    const disposables = [];

    // ── Starfield (THREE.Points) ──
    const STAR_COUNT = 300; // ~200-400
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starSpeed = [];
    const starPhase = [];
    for (let s = 0; s < STAR_COUNT; s++) {
      starPos[s * 3] = (Math.random() - 0.5) * 24;
      starPos[s * 3 + 1] = (Math.random() - 0.5) * 16;
      starPos[s * 3 + 2] = (Math.random() - 0.5) * 8 - 3; // behind code planes
      starSpeed.push(0.1 + Math.random() * 0.35);
      starPhase.push(Math.random() * Math.PI * 2);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xa5b4fc, // indigo-300 / near-white
      size: 0.05,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    disposables.push(stars);

    // NOTE: the drifting Python code planes were removed here — Charles asked
    // for NO code snippets in the lesson background (stars/meteor only; the
    // meteor shower lives in lesson-sky.js on #lessonSky). Only the starfield
    // remains in this WebGL layer.

    function step(t, dt) {
      // Starfield: gentle upward drift + opacity twinkle.
      const pos = stars.geometry.attributes.position;
      for (let s = 0; s < STAR_COUNT; s++) {
        pos.array[s * 3 + 1] += starSpeed[s] * dt * 0.2;
        pos.array[s * 3] += Math.sin(t * starSpeed[s] + starPhase[s]) * 0.0015;
        if (pos.array[s * 3 + 1] > 8) pos.array[s * 3 + 1] = -8;
      }
      pos.needsUpdate = true;
      stars.material.opacity = 0.45 + Math.sin(t * 1.2) * 0.14; // twinkle
    }

    return { step, disposables };
  }

  // ── Public API ──
  // editor: intentionally a no-op stub. Charles asked to remove the faint
  // running-code 3D behind the code editor (it read as visual noise behind the
  // code). The {start,stop,running} shape is kept so app.js's
  // toggleFloatingPlayground() calls stay valid — they just do nothing now.
  const noopScene = { start() {}, stop() {}, get running() { return false; } };
  window.PanelFX = {
    editor: noopScene,
    tutor: makeScene("tutorFX3D", buildTutor),
    lesson: makeScene("lessonFX3D", buildLesson),
  };
})();
