/* =============================================================
   panel-physics.js — TRUE 3D panel tilt + REAL cannon-es physics
   ES MODULE (import maps). Loaded via <script type="module">.

   Two independent features, one lifecycle:

   1) PANEL 3D TILT (crisp text)
      Targets every .panel-3d-real element. On mousemove we ease a
      perspective rotateX/rotateY toward the cursor (max ~14deg) plus a
      small translateZ lift on hover, springing back on leave. The CSS
      3D transform is applied DIRECTLY to the real HTML element so the
      browser rasterises native HTML => text stays perfectly crisp.
      (We do NOT render panels as WebGL/CSS3DRenderer textures — that
      would blur text. CSS3DRenderer is imported but only ever used for
      an optional decorative label; the panels use direct transforms.)

   2) PHYSICS FX (tumbling shapes)
      A full-bleed WebGL canvas (id "physicsFX") sits behind the feature
      section. THREE.WebGLRenderer(alpha) + a CANNON.World with gentle
      gravity (-4 y) for a dreamy slow fall. ~11 rigid bodies (boxes +
      a few other shapes) get matching THREE meshes (indigo/violet/cyan
      MeshStandardMaterial) and random initial angularVelocity so they
      TUMBLE and show all faces. A ground plane + side walls keep them
      contained and let them settle/bounce; we also recycle any body that
      slips past the bottom back to the top.

   Coexistence: this module imports its OWN three.module.js (ESM) via the
   import map. That is a SEPARATE instance from the global window.THREE
   (r152 UMD) used by landing-3d.js / panel-3d.js / lesson-sky.js. They do
   not interfere — each keeps its own THREE.

   Public API (exposed for the non-module landing-fx.js):
     window.PanelPhysics = { init, destroy, get running() }
   ============================================================= */

import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import * as CANNON from "cannon-es";

(function () {
  "use strict";

  // ── Environment gates ─────────────────────────────────────────
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch =
    window.matchMedia("(hover: none), (pointer: coarse)").matches ||
    "ontouchstart" in window;

  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

  // Indigo / violet / cyan brand palette (deep-space friendly).
  const COLORS = [
    0x6366f1, // indigo-500
    0x7c3aed, // violet-600
    0x8b5cf6, // violet-500
    0x06b6d4, // cyan-500
    0x818cf8, // indigo-400
    0xa78bfa, // violet-400
    0x38bdf8, // sky-400
  ];

  // ── Module-level state ────────────────────────────────────────
  let _running = false;

  // Panel-tilt state
  let panels = []; // [{ el, rx, ry, tz, trx, try, ttz, onEnter, onLeave }]
  let tiltMoveHandler = null;
  let tiltActive = false;

  // Physics state
  let renderer, scene, camera, world;
  let bodies = []; // [{ body, mesh }]
  let staticBodies = []; // ground + walls (no mesh)
  let lights = [];
  let physicsCanvas = null;
  let onResize = null;
  let onVisible = null;
  let physicsActive = false;

  // Shared rAF
  let animId = null;
  let lastNow = 0;

  // Optional decorative CSS3D label (uses CSS3DRenderer — kept tiny)
  let css3dRenderer = null;
  let css3dScene = null;
  let css3dObject = null;

  // ── WebGL capability test ─────────────────────────────────────
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

  // Tilt may run unless reduced motion / touch. Physics needs WebGL too.
  function canTilt() {
    return !prefersReduced && !isTouch;
  }
  function canRunPhysics() {
    if (prefersReduced) return false;
    if (!hasWebGL()) return false;
    if (!document.getElementById("physicsFX")) return false;
    return true;
  }

  // =============================================================
  //  FEATURE 1 — direct CSS 3D tilt on real HTML panels (crisp text)
  // =============================================================
  const MAX_DEG = 14; // max rotateX / rotateY tilt added BY the cursor
  const LIFT_Z = 26; // translateZ lift on hover (px)
  const REST_TZ = 8; // small resting lift so panels float at rest
  const EASE = 0.12; // per-frame lerp toward target

  // Resting 3D angle so each panel looks 3D AT ALL TIMES (not just on hover).
  // Panels alternate a left/right lean by index so they don't look identical.
  // Charles: "I want it to look 3D at all times ... for all 7."
  function restAngleFor(i) {
    const side = i % 2 === 0 ? 1 : -1;
    return { rx: 6, ry: 9 * side }; // gentle pitch-down + alternating yaw
  }

  function initTilt() {
    if (!canTilt()) return;
    const els = Array.from(document.querySelectorAll(".panel-3d-real"));
    if (!els.length) return;

    tiltActive = true;

    panels = els.map((el, i) => {
      // Give the element a 3D context so rotateX/Y + translateZ have depth.
      // perspective lives on the element itself so its own children get depth.
      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform";
      if (!el.style.perspective) el.style.perspective = "1100px";

      const rest = restAngleFor(i);

      const state = {
        el,
        restRx: rest.rx,
        restRy: rest.ry,
        // start AT the resting angle so it's 3D from the first frame
        rx: rest.rx,
        ry: rest.ry,
        tz: REST_TZ,
        trx: rest.rx, // target rotateX (defaults to resting)
        try_: rest.ry, // target rotateY (defaults to resting)
        ttz: REST_TZ, // target translateZ (defaults to resting lift)
        hover: false,
      };

      const onEnter = () => {
        state.hover = true;
        state.ttz = LIFT_Z;
      };
      const onLeave = () => {
        state.hover = false;
        // Spring back to the RESTING 3D angle (not flat) so it stays 3D.
        state.trx = state.restRx;
        state.try_ = state.restRy;
        state.ttz = REST_TZ;
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      state.onEnter = onEnter;
      state.onLeave = onLeave;
      return state;
    });

    // One global mousemove computes each hovered panel's target tilt from the
    // cursor position relative to that panel's centre.
    tiltMoveHandler = (e) => {
      const mx = e.clientX;
      const my = e.clientY;
      for (let i = 0; i < panels.length; i++) {
        const p = panels[i];
        if (!p.hover) continue;
        const r = p.el.getBoundingClientRect();
        // -0.5 .. 0.5 across the panel
        const px = (mx - r.left) / r.width - 0.5;
        const py = (my - r.top) / r.height - 0.5;
        // Cursor tilt is ADDED on top of the resting 3D angle so the panel
        // always looks 3D and the hover just nudges it toward the cursor.
        p.try_ = p.restRy + px * MAX_DEG * 2; // rotateY follows horizontal
        p.trx = p.restRx - py * MAX_DEG * 2; // rotateX follows vertical (inverted)
      }
    };
    window.addEventListener("mousemove", tiltMoveHandler, { passive: true });
  }

  function updateTilt() {
    for (let i = 0; i < panels.length; i++) {
      const p = panels[i];
      p.rx += (p.trx - p.rx) * EASE;
      p.ry += (p.try_ - p.ry) * EASE;
      p.tz += (p.ttz - p.tz) * EASE;
      p.el.style.transform =
        "perspective(1100px) rotateX(" +
        p.rx.toFixed(3) +
        "deg) rotateY(" +
        p.ry.toFixed(3) +
        "deg) translateZ(" +
        p.tz.toFixed(2) +
        "px)";
    }
  }

  function destroyTilt() {
    if (tiltMoveHandler) {
      window.removeEventListener("mousemove", tiltMoveHandler);
      tiltMoveHandler = null;
    }
    panels.forEach((p) => {
      p.el.removeEventListener("mouseenter", p.onEnter);
      p.el.removeEventListener("mouseleave", p.onLeave);
      // Reset inline styles we added so the panel returns to its CSS default.
      p.el.style.transform = "";
      p.el.style.transformStyle = "";
      p.el.style.willChange = "";
      // Only clear perspective if we were the ones who set it.
      p.el.style.perspective = "";
    });
    panels = [];
    tiltActive = false;
  }

  // =============================================================
  //  FEATURE 2 — cannon-es physics on the physicsFX WebGL canvas
  // =============================================================

  // Tunables for the contained "snow globe" volume (world units).
  const HALF_W = 9; // half width of the box volume
  const HALF_H = 6; // half height
  const HALF_D = 3.5; // half depth
  const BODY_COUNT = 11;

  function sizeToSection() {
    // physicsFX is full-bleed behind the feature section; size to it.
    const host =
      physicsCanvas.closest(".landing-features-section") ||
      physicsCanvas.parentElement ||
      document.body;
    const W = host ? host.offsetWidth : window.innerWidth;
    const H = host ? host.offsetHeight : window.innerHeight;
    return { W: Math.max(1, W), H: Math.max(1, H) };
  }

  function buildStaticWalls() {
    // Floor + ceiling + 4 walls as CANNON.Plane bodies, oriented inward.
    const planeDefs = [
      { pos: [0, -HALF_H, 0], rot: [-Math.PI / 2, 0, 0] }, // floor (normal +y)
      { pos: [0, HALF_H, 0], rot: [Math.PI / 2, 0, 0] }, // ceiling (normal -y)
      { pos: [-HALF_W, 0, 0], rot: [0, Math.PI / 2, 0] }, // left wall (normal +x)
      { pos: [HALF_W, 0, 0], rot: [0, -Math.PI / 2, 0] }, // right wall (normal -x)
      { pos: [0, 0, -HALF_D], rot: [0, 0, 0] }, // back wall (normal +z)
      { pos: [0, 0, HALF_D], rot: [0, Math.PI, 0] }, // front wall (normal -z)
    ];
    planeDefs.forEach((d) => {
      const b = new CANNON.Body({ mass: 0, type: CANNON.Body.STATIC });
      b.addShape(new CANNON.Plane());
      b.position.set(d.pos[0], d.pos[1], d.pos[2]);
      b.quaternion.setFromEuler(d.rot[0], d.rot[1], d.rot[2]);
      world.addBody(b);
      staticBodies.push(b);
    });
  }

  function makeShape(i) {
    // Returns { cannonShape, threeGeometry, halfExtent } for variety.
    const kind = i % 4;
    if (kind === 0) {
      const s = 0.55 + Math.random() * 0.35;
      return {
        cannonShape: new CANNON.Box(new CANNON.Vec3(s, s, s)),
        threeGeometry: new THREE.BoxGeometry(s * 2, s * 2, s * 2),
        radius: s * 1.8,
      };
    }
    if (kind === 1) {
      const r = 0.5 + Math.random() * 0.3;
      return {
        cannonShape: new CANNON.Sphere(r),
        threeGeometry: new THREE.IcosahedronGeometry(r, 1),
        radius: r,
      };
    }
    if (kind === 2) {
      // Flat-ish slab (shows broad faces as it tumbles).
      const x = 0.7 + Math.random() * 0.3;
      const y = 0.18;
      const z = 0.45 + Math.random() * 0.25;
      return {
        cannonShape: new CANNON.Box(new CANNON.Vec3(x, y, z)),
        threeGeometry: new THREE.BoxGeometry(x * 2, y * 2, z * 2),
        radius: x * 1.8,
      };
    }
    // kind === 3 — octahedron approximated physically by a sphere.
    const r = 0.5 + Math.random() * 0.25;
    return {
      cannonShape: new CANNON.Sphere(r * 0.92),
      threeGeometry: new THREE.OctahedronGeometry(r, 0),
      radius: r,
    };
  }

  function spawnBody(i, atTop) {
    const { cannonShape, threeGeometry, radius } = makeShape(i);

    const x = (Math.random() - 0.5) * (HALF_W - 1.5) * 2;
    const y = atTop
      ? HALF_H - radius - Math.random() * 1.5
      : (Math.random() - 0.5) * (HALF_H - 1.5) * 2;
    const z = (Math.random() - 0.5) * (HALF_D - 1) * 2;

    const body = new CANNON.Body({
      mass: 1,
      shape: cannonShape,
      position: new CANNON.Vec3(x, y, z),
      linearDamping: 0.18,
      angularDamping: 0.08,
    });
    // Random spin so the shape TUMBLES and reveals all faces.
    body.angularVelocity.set(
      (Math.random() - 0.5) * 3.5,
      (Math.random() - 0.5) * 3.5,
      (Math.random() - 0.5) * 3.5
    );
    // Slight initial sideways drift.
    body.velocity.set(
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 1.2
    );
    world.addBody(body);

    const color = COLORS[i % COLORS.length];
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.32,
      metalness: 0.35,
      emissive: color,
      emissiveIntensity: 0.08,
    });
    const mesh = new THREE.Mesh(threeGeometry, mat);
    scene.add(mesh);

    return { body, mesh, radius };
  }

  function initPhysics() {
    if (!canRunPhysics()) return;

    physicsCanvas = document.getElementById("physicsFX");
    if (!physicsCanvas) return;

    physicsActive = true;

    const { W, H } = sizeToSection();

    // ── Renderer ──
    renderer = new THREE.WebGLRenderer({
      canvas: physicsCanvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H, false);
    renderer.setClearColor(0x05030f, 0); // deep space, fully transparent

    // ── Scene + camera ──
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 14);
    camera.lookAt(0, 0, 0);

    // ── Lighting (so every face shades as bodies tumble) ──
    const ambient = new THREE.AmbientLight(0x141033, 2.4);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(5, 8, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x8b5cf6, 1.4);
    fill.position.set(-6, 2, 4);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x06b6d4, 1.2);
    rim.position.set(2, -5, -4);
    scene.add(rim);
    lights = [ambient, key, fill, rim];

    // ── Physics world (gentle gravity for dreamy slow fall) ──
    world = new CANNON.World({ gravity: new CANNON.Vec3(0, -4, 0) });
    world.broadphase = new CANNON.NaiveBroadphase();
    world.allowSleep = false;

    // Bouncy-but-calm contact material.
    const defaultMat = world.defaultMaterial;
    const contact = new CANNON.ContactMaterial(defaultMat, defaultMat, {
      friction: 0.25,
      restitution: 0.45,
    });
    world.addContactMaterial(contact);

    buildStaticWalls();

    // ── Dynamic bodies + meshes ──
    bodies = [];
    for (let i = 0; i < BODY_COUNT; i++) {
      bodies.push(spawnBody(i, false));
    }

    // ── Resize ──
    onResize = () => {
      if (!renderer || !camera) return;
      const s = sizeToSection();
      camera.aspect = s.W / s.H;
      camera.updateProjectionMatrix();
      renderer.setSize(s.W, s.H, false);
      if (css3dRenderer) css3dRenderer.setSize(s.W, s.H);
    };
    window.addEventListener("resize", onResize);
  }

  function stepPhysics(dt) {
    if (!world) return;
    world.step(1 / 60, dt, 3);

    for (let i = 0; i < bodies.length; i++) {
      const { body, mesh, radius } = bodies[i];
      // Recycle anything that escaped below the floor back to the top.
      if (body.position.y < -HALF_H - 2) {
        body.position.set(
          (Math.random() - 0.5) * (HALF_W - 1.5) * 2,
          HALF_H - radius,
          (Math.random() - 0.5) * (HALF_D - 1) * 2
        );
        body.velocity.set(0, -0.5, 0);
        body.angularVelocity.set(
          (Math.random() - 0.5) * 3.5,
          (Math.random() - 0.5) * 3.5,
          (Math.random() - 0.5) * 3.5
        );
      }
      mesh.position.set(body.position.x, body.position.y, body.position.z);
      mesh.quaternion.set(
        body.quaternion.x,
        body.quaternion.y,
        body.quaternion.z,
        body.quaternion.w
      );
    }
  }

  // =============================================================
  //  SHARED ANIMATION LOOP
  // =============================================================
  function loop(now) {
    if (!_running) return;
    animId = requestAnimationFrame(loop);

    const dt = Math.min((now - lastNow) / 1000, 0.05);
    lastNow = now;

    if (tiltActive) updateTilt();

    if (physicsActive && renderer && scene && camera) {
      stepPhysics(dt);
      renderer.render(scene, camera);
      if (css3dRenderer && css3dScene) {
        css3dRenderer.render(css3dScene, camera);
      }
    }
  }

  function startLoop() {
    lastNow = performance.now();
    animId = requestAnimationFrame(loop);
  }

  // =============================================================
  //  PUBLIC LIFECYCLE
  // =============================================================
  function init() {
    if (_running) return; // idempotent: init twice = no double-run

    initTilt();
    initPhysics();

    // Nothing to animate at all (e.g. reduced motion + no canvas) → bail.
    if (!tiltActive && !physicsActive) {
      _running = false;
      return;
    }

    _running = true;

    // Pause/resume on tab visibility (saves CPU/GPU when hidden).
    onVisible = () => {
      if (document.hidden) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else if (_running && !animId) {
        lastNow = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    startLoop();
  }

  function destroy() {
    // Stop the loop first so nothing mutates state mid-teardown.
    _running = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }

    if (onVisible) {
      document.removeEventListener("visibilitychange", onVisible);
      onVisible = null;
    }

    // ── Tilt cleanup (removes its own listeners + resets transforms) ──
    destroyTilt();

    // ── Physics cleanup ──
    if (onResize) {
      window.removeEventListener("resize", onResize);
      onResize = null;
    }

    // Remove dynamic bodies + dispose their meshes.
    bodies.forEach(({ body, mesh }) => {
      if (world) world.removeBody(body);
      if (mesh) {
        scene && scene.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
      }
    });
    bodies = [];

    // Remove static walls.
    staticBodies.forEach((b) => {
      if (world) world.removeBody(b);
    });
    staticBodies = [];

    // Lights have no GPU resources to dispose, just drop refs.
    lights.forEach((l) => scene && scene.remove(l));
    lights = [];

    // Decorative CSS3D (only if it was ever created).
    if (css3dObject && css3dScene) css3dScene.remove(css3dObject);
    if (css3dRenderer && css3dRenderer.domElement && css3dRenderer.domElement.parentNode) {
      css3dRenderer.domElement.parentNode.removeChild(css3dRenderer.domElement);
    }
    css3dObject = null;
    css3dScene = null;
    css3dRenderer = null;

    // Dispose renderer + clear scene refs.
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss && renderer.forceContextLoss();
      renderer = null;
    }
    scene = null;
    camera = null;
    world = null;
    physicsCanvas = null;
    physicsActive = false;
  }

  // ── Expose on window for the non-module landing-fx.js ─────────
  window.PanelPhysics = {
    init,
    destroy,
    get running() {
      return _running;
    },
  };
})();
