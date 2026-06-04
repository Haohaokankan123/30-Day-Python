/* =============================================================
   landing-3d.js — Three.js floating objects hero (Phase 7 v3)
   Smooth orbiting/floating 3D objects in the hero section.
   NO physics engine — pure sin/cos animation for 60fps stability.
   Canvas is absolute inside .landing-hero, not fixed.
   12 objects spread across right 2/3 of hero.
   Exposes window.Landing3D = { start, stop, running }
   ============================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches || "ontouchstart" in window;

  let _running = false;
  let renderer, scene, camera, animId;
  let objects = [];
  let particles = null;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let cleanup = null;

  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

  // Python / indigo brand palette — richer set
  const COLORS = [
    0x6366f1, // indigo-500
    0x8b5cf6, // violet-500
    0x06b6d4, // cyan-500
    0xa78bfa, // violet-400
    0x818cf8, // indigo-400
    0x38bdf8, // sky-400
    0x4f46e5, // indigo-600
    0x7c3aed, // violet-600
    0x0ea5e9, // sky-500
    0xc4b5fd, // violet-300
    0x60a5fa, // blue-400
    0x34d399, // emerald-400
  ];

  function canRun() {
    if (prefersReduced || isTouch) return false;
    if (!window.THREE) return false;
    const canvas = document.getElementById("hero3DCanvas");
    if (!canvas) return false;
    try {
      const test = document.createElement("canvas");
      const gl = test.getContext("webgl") || test.getContext("experimental-webgl");
      if (!gl) return false;
    } catch (e) { return false; }
    return true;
  }

  function start() {
    if (_running) return;

    if (!canRun()) {
      const fb = document.getElementById("hero3DFallback");
      if (fb) fb.style.display = "flex";
      return;
    }

    const THREE = window.THREE;
    const canvas = document.getElementById("hero3DCanvas");
    if (!canvas) return;

    const hero = canvas.closest(".landing-hero") || document.querySelector(".landing-hero");
    const W = hero ? hero.offsetWidth : window.innerWidth;
    const H = hero ? hero.offsetHeight : window.innerHeight;

    _running = true;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    if (THREE.ACESFilmicToneMapping !== undefined) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    // ── Lighting — richer, multi-color setup ──
    const ambient = new THREE.AmbientLight(0x0d0821, 3);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(5, 8, 6);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8b5cf6, 2);
    fill.position.set(-6, 2, -4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x06b6d4, 1.5);
    rim.position.set(2, -5, -5);
    scene.add(rim);

    const accent = new THREE.DirectionalLight(0x4f46e5, 1.2);
    accent.position.set(-3, 6, 2);
    scene.add(accent);

    // ── 12 floating shapes — varied geometry ──
    const shapeDefs = [
      { geo: new THREE.BoxGeometry(0.75, 0.75, 0.75),         scale: 1.0 },
      { geo: new THREE.OctahedronGeometry(0.52),              scale: 1.0 },
      { geo: new THREE.TetrahedronGeometry(0.58),             scale: 1.0 },
      { geo: new THREE.IcosahedronGeometry(0.48, 0),          scale: 1.0 },
      { geo: new THREE.BoxGeometry(0.45, 0.45, 0.45),         scale: 1.0 },
      { geo: new THREE.OctahedronGeometry(0.38),              scale: 1.0 },
      { geo: new THREE.BoxGeometry(0.85, 0.18, 0.55),         scale: 1.0 },
      { geo: new THREE.IcosahedronGeometry(0.32, 0),          scale: 1.0 },
      { geo: new THREE.TorusGeometry(0.3, 0.12, 12, 32),      scale: 1.0 },
      { geo: new THREE.OctahedronGeometry(0.6),               scale: 1.0 },
      { geo: new THREE.BoxGeometry(0.55, 0.55, 0.55),         scale: 1.0 },
      { geo: new THREE.IcosahedronGeometry(0.42, 1),          scale: 1.0 },
    ];

    objects = shapeDefs.map(({ geo }, i) => {
      const color = COLORS[i % COLORS.length];
      const isMetallic = i % 3 !== 1;
      const mat = (typeof THREE.MeshPhysicalMaterial === "function" && isMetallic)
        ? new THREE.MeshPhysicalMaterial({
            color,
            roughness: 0.1,
            metalness: 0.92,
            clearcoat: 0.8,
            clearcoatRoughness: 0.15,
            envMapIntensity: 1.4,
            emissive: color,
            emissiveIntensity: 0.06,
          })
        : new THREE.MeshStandardMaterial({
            color,
            roughness: isMetallic ? 0.12 : 0.55,
            metalness: isMetallic ? 0.9 : 0.06,
            envMapIntensity: 1.3,
            emissive: color,
            emissiveIntensity: 0.05,
          });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // Distribute in a wide cloud, biased toward CENTER-LEFT so the cluster
      // clears the code window on the right (Charles: no 3D under/near it).
      const col = i % 4;
      const row = Math.floor(i / 4);

      const baseX = -0.5 + col * 0.8 + (i % 2) * 0.15;
      const baseY = 1.8 - row * 1.5 + (i % 3) * 0.25;

      return {
        mesh,
        orbitRadius: 0.9 + (i % 4) * 0.35,
        orbitSpeed:  0.15 + i * 0.035,
        orbitPhase:  (i / shapeDefs.length) * Math.PI * 2,
        orbitTilt:   0.25 + (i % 5) * 0.18,
        floatAmp:    0.14 + (i % 4) * 0.07,
        floatSpeed:  0.5 + i * 0.065,
        floatPhase:  i * 0.85,
        rotSpeed: new THREE.Vector3(
          0.25 + i * 0.06,
          0.18 + i * 0.045,
          0.08 + i * 0.025
        ),
        baseX,
        baseY,
      };
    });

    // ── Particle cloud (small dots floating behind objects) ──
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds = [];
    const pPhases = [];
    for (let p = 0; p < particleCount; p++) {
      pPositions[p * 3]     = (Math.random() - 0.1) * 8 + 1; // bias right
      pPositions[p * 3 + 1] = (Math.random() - 0.5) * 6;
      pPositions[p * 3 + 2] = (Math.random() - 0.5) * 4 - 2; // behind objects
      pSpeeds.push(0.2 + Math.random() * 0.4);
      pPhases.push(Math.random() * Math.PI * 2);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Resize ──
    function onResize() {
      if (!renderer) return;
      const h2 = canvas.closest(".landing-hero") || document.querySelector(".landing-hero");
      const W2 = h2 ? h2.offsetWidth : window.innerWidth;
      const H2 = h2 ? h2.offsetHeight : window.innerHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    }
    window.addEventListener("resize", onResize);

    // ── Mouse parallax ──
    function onMouseMove(e) {
      targetMouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Visibility pause ──
    function onVisible() {
      if (document.hidden) {
        cancelAnimationFrame(animId);
        animId = null;
      } else if (_running) {
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

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Camera parallax — wider travel + subtle z lean for depth
      camera.position.x = mouseX * 0.45;
      camera.position.y = -mouseY * 0.32;
      camera.position.z = 8 - Math.abs(mouseX) * 0.3;
      camera.lookAt(0.8 + mouseX * 0.3, mouseY * 0.15, 0);

      // Animate objects
      objects.forEach((o) => {
        const { mesh, orbitRadius, orbitSpeed, orbitPhase, orbitTilt,
                floatAmp, floatSpeed, floatPhase, rotSpeed, baseX, baseY } = o;

        const a = t * orbitSpeed + orbitPhase;
        mesh.position.x = baseX + Math.cos(a) * orbitRadius * 0.45;
        mesh.position.y = baseY
                        + Math.sin(a) * orbitRadius * orbitTilt
                        + Math.sin(t * floatSpeed + floatPhase) * floatAmp;
        mesh.position.z = Math.sin(a) * orbitRadius * 0.2;

        mesh.rotation.x += rotSpeed.x * dt;
        mesh.rotation.y += rotSpeed.y * dt;
        mesh.rotation.z += rotSpeed.z * dt;
      });

      // Animate particle cloud — gentle drift upward + sway
      if (particles) {
        const pos = particles.geometry.attributes.position;
        for (let p = 0; p < particleCount; p++) {
          pos.array[p * 3 + 1] += pSpeeds[p] * dt * 0.15;
          pos.array[p * 3]     += Math.sin(t * pSpeeds[p] + pPhases[p]) * 0.002;
          // Wrap vertically
          if (pos.array[p * 3 + 1] > 3.5) pos.array[p * 3 + 1] = -3.5;
        }
        pos.needsUpdate = true;
        particles.rotation.y = mouseX * 0.05;
        particles.material.opacity = 0.5 + Math.sin(t * 1.5) * 0.12;  // gentle twinkle
      }

      renderer.render(scene, camera);
    }

    animId = requestAnimationFrame(loop);

    cleanup = () => {
      _running = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisible);
      objects.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      objects = [];
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
        particles = null;
      }
      if (renderer) { renderer.dispose(); renderer = null; }
      scene = null; camera = null;
    };
  }

  function stop() {
    if (cleanup) { cleanup(); cleanup = null; }
    _running = false;
  }

  window.Landing3D = {
    start, stop,
    get running() { return _running; },
  };
})();
