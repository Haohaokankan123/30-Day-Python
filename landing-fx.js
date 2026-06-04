/* =============================================================
   landing-fx.js — Lusion-class interactive effects (LANDING ONLY)
   Isolated module. Touches nothing in the lesson app.
   Phases 0+1: foundation, smooth scroll, reveals, parallax.
   All effects honor prefers-reduced-motion and disable on touch.
   ============================================================= */
(function () {
  "use strict";

  // ---- Environment guards -------------------------------------------------
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isTouch =
    window.matchMedia("(hover: none), (pointer: coarse)").matches ||
    "ontouchstart" in window;
  const hasGsap = typeof window.gsap !== "undefined";
  const hasLenis = typeof window.Lenis !== "undefined";

  // Teardown registry — every effect registers its cleanup here so leaving
  // the landing view (Get Started / goHome) disposes everything cleanly.
  const cleanups = [];
  function onCleanup(fn) {
    if (typeof fn === "function") cleanups.push(fn);
  }
  function teardownAll() {
    while (cleanups.length) {
      const fn = cleanups.pop();
      try {
        fn();
      } catch (e) {
        /* ignore teardown errors */
      }
    }
  }

  // Is the landing view currently visible? (lesson app hides #landing)
  function landingVisible() {
    const el = document.getElementById("landing");
    return el && !el.classList.contains("hidden");
  }

  // Register ScrollTrigger exactly once, before any trigger/scroll-sync code.
  let stRegistered = false;
  function ensureST() {
    if (!stRegistered && hasGsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      stRegistered = true;
    }
  }

  // ---- 1. Smooth scroll (Lenis) synced to GSAP ticker ---------------------
  // ONE render loop. autoRaf:false so the CDN build does NOT run its own rAF —
  // gsap.ticker is the single driver (otherwise Lenis double-drives → 2x speed).
  let lenis = null;
  function initSmoothScroll() {
    if (prefersReduced || isTouch || !hasLenis) return; // native scroll fallback
    ensureST();

    lenis = new window.Lenis({
      autoRaf: false, // CRITICAL: gsap.ticker is the only driver
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Native CSS smooth-scroll fights Lenis — disable it while Lenis is active.
    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";
    onCleanup(() => {
      htmlEl.style.scrollBehavior = prevScrollBehavior;
    });

    if (hasGsap && window.ScrollTrigger) {
      const onScroll = window.ScrollTrigger.update;
      lenis.on("scroll", onScroll);
      // gsap.ticker time is SECONDS; lenis.raf() wants MILLISECONDS → *1000
      const tick = (time) => {
        if (lenis) lenis.raf(time * 1000);
      };
      window.gsap.ticker.add(tick);
      window.gsap.ticker.lagSmoothing(0);
      onCleanup(() => {
        window.gsap.ticker.remove(tick);
        if (lenis) lenis.off("scroll", onScroll); // detach before destroy (no zombies)
      });
    } else {
      let rafId;
      const raf = (t) => {
        if (lenis) lenis.raf(t);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      onCleanup(() => cancelAnimationFrame(rafId));
    }

    onCleanup(() => {
      if (lenis) lenis.destroy();
      lenis = null;
    });
  }

  // ---- 2. Parallax on background / decorative layers ----------------------
  function initParallax() {
    if (prefersReduced || !hasGsap || !window.ScrollTrigger) return;
    ensureST();

    // Gentle parallax: hero code window drifts slower than scroll.
    const codeWin = document.querySelector(".landing-code-window");
    if (codeWin) {
      const tw = window.gsap.to(codeWin, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".landing-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      onCleanup(() => {
        if (tw.scrollTrigger) tw.scrollTrigger.kill();
        tw.kill();
        codeWin.removeAttribute("style"); // clear leftover transform on revisit
      });
    }
  }

  // ---- 3. GSAP-enhanced reveals (layered on existing .reveal system) ------
  // The existing app.js .reveal/.visible observer still runs and is the
  // source of truth for visibility. We ADD a richer motion pass on top for
  // feature cards and stats, without removing or disabling anything.
  function initRichReveals() {
    if (prefersReduced || !hasGsap || !window.ScrollTrigger) return;

    const groups = [
      { sel: ".landing-feat-card", stagger: 0.08, y: 28 },
      { sel: ".landing-stat", stagger: 0.1, y: 18 },
    ];

    groups.forEach((g) => {
      // Idempotency: skip any already-revealed item so a re-boot can't re-play.
      const items = window.gsap.utils
        .toArray(g.sel)
        .filter((el) => !el.classList.contains("visible"));
      if (!items.length) return;
      // Claim ownership: app.js's .reveal observer skips [data-gsap-managed],
      // so GSAP is the SOLE animator of these elements — no double-fire / jank.
      items.forEach((el) => el.setAttribute("data-gsap-managed", ""));
      const tw = window.gsap.from(items, {
        opacity: 0,
        y: g.y,
        duration: 0.6,
        ease: "power3.out",
        stagger: g.stagger,
        clearProps: "transform,opacity", // land at natural CSS position, no residual inline transform
        scrollTrigger: {
          trigger: items[0].parentElement || items[0],
          start: "top 85%",
          once: true,
        },
      });
      onCleanup(() => {
        if (tw.scrollTrigger) tw.scrollTrigger.kill();
        tw.kill();
        // restore inline styles GSAP set, so nothing stays hidden
        items.forEach((el) => el.removeAttribute("style"));
      });
    });
  }

  // ---- 4. WebGL shader hero background ------------------------------------
  // Slow-drifting brand-color gradient mesh behind the hero. Raw WebGL (no
  // Three.js). Shares gsap.ticker, caps DPR, pauses offscreen, full dispose.
  // Falls back to a static CSS gradient on reduced-motion / touch / no-WebGL.
  const VERT_SRC =
    "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";
  const FRAG_SRC = [
    "precision highp float;",
    "uniform vec2 u_res;",
    "uniform float u_time;",
    "uniform vec2 u_mouse;",
    // hash + value noise
    "float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }",
    "float noise(vec2 p){",
    "  vec2 i=floor(p), f=fract(p);",
    "  float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));",
    "  vec2 u=f*f*(3.0-2.0*f);",
    "  return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;",
    "}",
    // 6-octave fbm for smoother, softer gradients
    "float fbm(vec2 p){",
    "  float v=0.0, amp=0.5;",
    "  for(int i=0;i<6;i++){ v+=amp*noise(p); p*=1.9; amp*=0.55; }",
    "  return v;",
    "}",
    "void main(){",
    "  vec2 uv = gl_FragCoord.xy / u_res.xy;",
    "  vec2 asp = vec2(u_res.x/u_res.y, 1.0);",
    "  vec2 q = uv*asp;",
    // very slow drift — 0.018 instead of 0.04 = no abrupt jumps
    "  float t = u_time*0.018;",
    // smooth mouse warp
    "  vec2 m = (u_mouse - 0.5)*asp;",
    "  float md = length(q - (m + 0.5*asp));",
    "  float warp = 0.12/(md+0.8);",
    // layered fbm — each layer moves at a slightly different speed
    "  float n1 = fbm(q*1.8 + vec2(t*1.0, t*0.65) + warp);",
    "  float n2 = fbm(q*1.2 - vec2(t*0.55, t*0.85) + n1*0.8);",
    "  float n3 = fbm(q*0.9 + vec2(t*0.4, t*0.5) + n2*0.6);",
    // brand palette — wider smoothstep ranges = much softer transitions
    "  vec3 base   = vec3(0.020, 0.020, 0.045);",   // very dark navy
    "  vec3 indigo = vec3(0.300, 0.300, 0.780);",   // softer indigo
    "  vec3 violet = vec3(0.420, 0.240, 0.720);",   // deep violet
    "  vec3 cyan   = vec3(0.012, 0.500, 0.650);",   // muted cyan
    "  vec3 col = base;",
    // use smooth wide transitions — NO abrupt steps
    "  col = mix(col, indigo, smoothstep(0.10,0.70,n1)*0.75);",
    "  col = mix(col, violet, smoothstep(0.20,0.75,n2)*0.60);",
    "  col = mix(col, cyan,   smoothstep(0.30,0.80,n3)*0.35);",
    // very gentle vignette
    "  float vig = smoothstep(1.4, 0.0, length((uv-0.5)*vec2(1.0,1.3)));",
    "  col *= 0.65 + 0.35*vig;",
    // gamma-ish tone: lift shadows very slightly for smooth look
    "  col = pow(max(col, vec3(0.0)), vec3(0.92));",
    "  gl_FragColor = vec4(col, 1.0);",
    "}",
  ].join("\n");

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  // GL program is built ONCE and cached. View-switches stop/restart the render
  // loop but keep the context alive — re-acquiring a force-lost context fails,
  // so we never loseContext() on a normal teardown.
  let shaderGL = null; // { gl, prog, buf, uRes, uTime, uMouse }
  let shaderRunning = false;
  let shaderUnavailable = false; // WebGL genuinely not supported → fallback for good

  function buildShaderGL() {
    if (shaderGL) return shaderGL;
    const canvas = document.getElementById("heroShaderCanvas");
    if (!canvas) return null;
    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false, depth: false }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) return null;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]), // fullscreen triangle
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    shaderGL = {
      canvas,
      gl,
      prog,
      buf,
      uRes: gl.getUniformLocation(prog, "u_res"),
      uTime: gl.getUniformLocation(prog, "u_time"),
      uMouse: gl.getUniformLocation(prog, "u_mouse"),
    };
    return shaderGL;
  }

  function initShaderHero() {
    const page = document.getElementById("landing");
    if (!page) return;

    // Reduced-motion / touch / known-unsupported → static CSS fallback.
    if (prefersReduced || isTouch || shaderUnavailable) {
      page.classList.add("shader-fallback");
      return;
    }

    const S = buildShaderGL();
    if (!S || S.gl.isContextLost()) {
      shaderUnavailable = true;
      page.classList.add("shader-fallback");
      return;
    }
    const { gl, canvas, uRes, uTime, uMouse } = S;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR
    function resize() {
      const w = Math.floor(window.innerWidth * DPR);
      const h = Math.floor(window.innerHeight * DPR);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    let resizeT = null;
    const onResize = () => {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    // Gentle mouse target, eased toward each frame.
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    function onMove(e) {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1.0 - e.clientY / window.innerHeight;
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    // Pause when hero is scrolled offscreen (save GPU).
    let onScreen = true;
    let io = null;
    const hero = document.querySelector(".landing-hero");
    if (hero && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0].isIntersecting;
        },
        { threshold: 0 }
      );
      io.observe(hero);
    }

    shaderRunning = true;
    page.classList.add("shader-on");

    let startT = null;
    let rafId = null;
    function frame(timeSec) {
      if (!shaderRunning) return;
      if (startT === null) startT = timeSec;
      if (onScreen) {
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, timeSec - startT);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    }
    let tickerFn = null;
    if (window.gsap) {
      tickerFn = (t) => frame(t); // gsap.ticker passes seconds (shared loop)
      window.gsap.ticker.add(tickerFn);
    } else {
      const loop = (ms) => {
        frame(ms / 1000);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    onCleanup(() => {
      // Stop rendering + detach listeners, but KEEP the GL context for reuse.
      shaderRunning = false;
      page.classList.remove("shader-on");
      if (tickerFn && window.gsap) window.gsap.ticker.remove(tickerFn);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeT) clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      if (io) io.disconnect();
    });
  }

  // ---- 5. Custom cursor (dot + trailing ring) --------------------------------
  // Desktop-pointer only. Completely disabled on touch and reduced-motion.
  // dot  tracks the raw mouse position immediately (no lerp).
  // ring lerps toward the dot each rAF frame (~0.12 ease).
  // JS adds .cursor-active to <body> (hides native cursor, makes our visible).
  // A .cursor-hover class on <body> expands the ring on interactive elements.
  // Everything is cleaned up on shutdown — native cursor is fully restored.

  let cursorActive = false; // prevent double-init across view switches

  function initCursor() {
    if (prefersReduced || isTouch) return;

    const dot  = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    // Positions: tx/ty = raw target. dx/dy = eased dot (glides). rx/ry = ring (trails).
    const pos = { tx: -200, ty: -200, dx: -200, dy: -200, rx: -200, ry: -200 };
    let entered = false;
    let rafId   = null;

    function moveDot(x, y) {
      pos.tx = x;
      pos.ty = y;
    }

    function tick() {
      // Eased dot glides toward the raw pointer (0.35 → quick but silky, not teleporting)
      pos.dx += (pos.tx - pos.dx) * 0.35;
      pos.dy += (pos.ty - pos.dy) * 0.35;
      // Ring trails the eased dot (0.10 → smooth, flowing tail)
      pos.rx += (pos.dx - pos.rx) * 0.10;
      pos.ry += (pos.dy - pos.ry) * 0.10;

      dot.style.transform  = `translate(calc(${pos.dx}px - 50%), calc(${pos.dy}px - 50%))`;
      ring.style.transform = `translate(calc(${pos.rx}px - 50%), calc(${pos.ry}px - 50%))`;

      rafId = requestAnimationFrame(tick);
    }

    function onMove(e) {
      moveDot(e.clientX, e.clientY);
      if (!entered) {
        entered = true;
        document.body.classList.add("cursor-entered");
      }
    }

    // Detect hover on interactive elements → expand ring.
    const HOVER_SEL = 'a, button, [role="button"], label, input, select, textarea, .landing-feat-card, .landing-btn-primary, .landing-btn-secondary';
    function onOver(e) {
      if (e.target.closest(HOVER_SEL)) {
        document.body.classList.add("cursor-hover");
      }
    }
    function onOut(e) {
      if (e.target.closest(HOVER_SEL)) {
        document.body.classList.remove("cursor-hover");
      }
    }

    document.body.classList.add("cursor-active");
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout",  onOut,  { passive: true });

    rafId = requestAnimationFrame(tick);
    cursorActive = true;

    onCleanup(() => {
      cursorActive = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      document.body.classList.remove("cursor-active", "cursor-entered", "cursor-hover");
      // Park cursors offscreen so they don't flash on re-enter
      dot.style.transform  = "translate(-200px, -200px)";
      ring.style.transform = "translate(-200px, -200px)";
    });
  }

  // ---- 6. Magnetic buttons ---------------------------------------------------
  // Each CTA eases toward the cursor when it's within MAGNET_RADIUS px.
  // Uses gsap.quickTo for ultra-smooth spring-feel on x and y.
  // On mouseleave the button springs back to origin (quickTo(0)).
  // Only runs on desktop-pointer, never on touch/reduced-motion.

  const MAGNET_RADIUS  = 80;  // px — distance at which pull activates
  const MAGNET_POWER   = 0.45; // 0-1: fraction of cursor offset to apply

  function initMagneticButtons() {
    if (prefersReduced || isTouch || !hasGsap) return;

    // Only apply to the hero CTA buttons (not every button on the page).
    const btns = document.querySelectorAll(
      ".landing-hero .landing-btn-primary, .landing-hero .landing-btn-secondary"
    );
    if (!btns.length) return;

    const cleaners = [];

    btns.forEach((btn) => {
      const xTo = window.gsap.quickTo(btn, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = window.gsap.quickTo(btn, "y", { duration: 0.55, ease: "power3.out" });

      function onMove(e) {
        const rect   = btn.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = e.clientX - cx;
        const dy     = e.clientY - cy;
        const dist   = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNET_RADIUS) {
          // Pull toward cursor proportionally within the radius
          const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_POWER;
          xTo(dx * pull * (MAGNET_RADIUS / Math.max(dist, 1)));
          yTo(dy * pull * (MAGNET_RADIUS / Math.max(dist, 1)));
        } else {
          xTo(0);
          yTo(0);
        }
      }

      function onLeave() {
        xTo(0);
        yTo(0);
      }

      // Listen on the window so pull begins before cursor is directly over btn.
      window.addEventListener("mousemove", onMove, { passive: true });
      btn.addEventListener("mouseleave", onLeave);

      cleaners.push(() => {
        window.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
        window.gsap.set(btn, { x: 0, y: 0 }); // snap back instantly on teardown
      });
    });

    onCleanup(() => cleaners.forEach((fn) => fn()));
  }

  // ---- Phase 6: Adaptive quality + a11y hardening ---------------------------
  // FPS sampler: if the page sustains <50fps for 2 seconds, add .perf-low to
  // #landing so CSS and JS can degrade gracefully (shader DPR halved, parallax
  // disabled). Runs only while landing is visible; stops on shutdown.
  let fpsSamplerRunning = false;
  let perfLow = false;

  function initFPSSampler() {
    if (fpsSamplerRunning || prefersReduced || isTouch) return;
    fpsSamplerRunning = true;

    const page = document.getElementById("landing");
    let frames = 0;
    let lastCheck = performance.now();
    let rafId = null;

    function sample() {
      if (!fpsSamplerRunning) return;
      frames++;
      const now = performance.now();
      const elapsed = now - lastCheck;

      if (elapsed >= 2000) {
        const fps = (frames / elapsed) * 1000;
        frames = 0;
        lastCheck = now;

        if (!perfLow && fps < 50) {
          perfLow = true;
          if (page) page.classList.add("perf-low");
          // Halve the shader's effective DPR by shrinking the canvas CSS size.
          // The GL viewport stays the same — browser scales up (blurrier but fast).
          const canvas = document.getElementById("heroShaderCanvas");
          if (canvas) canvas.style.imageRendering = "pixelated";
        } else if (perfLow && fps >= 55) {
          // Hysteresis: only recover if FPS rebounds clearly above threshold.
          perfLow = false;
          if (page) page.classList.remove("perf-low");
          const canvas = document.getElementById("heroShaderCanvas");
          if (canvas) canvas.style.imageRendering = "";
        }
      }

      rafId = requestAnimationFrame(sample);
    }

    rafId = requestAnimationFrame(sample);

    onCleanup(() => {
      fpsSamplerRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      const page = document.getElementById("landing");
      if (page) page.classList.remove("perf-low");
    });
  }

  // Respond to runtime changes of prefers-reduced-motion (user can toggle it
  // in system settings while the page is open). Re-teardown + re-boot so every
  // effect re-evaluates its guard at the new preference.
  function watchReducedMotion() {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      // Full teardown + re-boot re-reads prefersReduced at the top of each init.
      // We can't update the const, so we piggyback on shutdown/boot cycling.
      if (booted) {
        shutdown();
        requestAnimationFrame(() => requestAnimationFrame(boot));
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
    } else {
      mq.addListener(onChange); // Safari <14 fallback
    }
    // No onCleanup needed — this listener should persist across view-switches
    // since it controls the entire boot cycle.
  }

  // ---- 7. Marquee band (scroll-velocity skew) --------------------------------
  // Infinite looping text band. Track is duplicated so the seamless wrap
  // always shows text. Driven by gsap.ticker (same loop, no extra rAF).
  // Pauses on hidden tab + when band is offscreen.
  function initMarquee() {
    const wrap = document.querySelector(".lf-marquee");
    if (!wrap || !hasGsap) return;

    const track = wrap.querySelector(".lf-marquee-track");
    if (!track) return;

    // Reduced-motion: no movement, just display the text statically.
    if (prefersReduced) {
      wrap.classList.add("lf-marquee-static");
      return;
    }

    // Duplicate track for seamless loop.
    const clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    wrap.appendChild(clone);

    const speed = 0.4; // px per tick at 60fps → ~24px/s
    let x = 0;
    let skewX = 0;

    // Width of ONE track (half of total scrollable content).
    function trackW() {
      return track.offsetWidth;
    }

    let offscreen = false;
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        offscreen = !entries[0].isIntersecting;
      }, { threshold: 0 });
      io.observe(wrap);
    }

    // Lenis velocity → skew the track for that Lusion belt-drive feel.
    let lastX = 0;
    function tick() {
      if (offscreen || document.hidden) return;

      // Get scroll velocity from Lenis if available.
      let vel = 0;
      if (lenis && typeof lenis.velocity !== "undefined") {
        vel = lenis.velocity;
      }

      x -= speed;
      const w = trackW();
      if (w > 0 && Math.abs(x) >= w) x = 0; // seamless reset

      // Ease skew toward velocity-driven target (capped at ±8deg).
      const targetSkew = Math.max(-8, Math.min(8, vel * -0.04));
      skewX += (targetSkew - skewX) * 0.1;

      wrap.style.transform = `skewX(${skewX.toFixed(2)}deg)`;
      track.style.transform = `translateX(${x.toFixed(2)}px)`;
      clone.style.transform = `translateX(${x.toFixed(2)}px)`;
    }

    window.gsap.ticker.add(tick);

    onCleanup(() => {
      window.gsap.ticker.remove(tick);
      if (io) io.disconnect();
      wrap.style.transform = "";
      track.style.transform = "";
    });
  }

  // ---- 8. Animated counters --------------------------------------------------
  // Fires once when a [data-count] element enters the viewport.
  // Uses tabular-nums for stable layout during count-up.
  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length) return;

    els.forEach((el) => {
      const raw = el.getAttribute("data-count");
      // Support "300+" or "100%" — extract numeric part + suffix.
      const match = raw.match(/^([\d.]+)(.*)$/);
      if (!match) return;
      const target = parseFloat(match[1]);
      const suffix = match[2] || "";
      const isInt  = Number.isInteger(target);

      // Reduced-motion: show final value immediately.
      if (prefersReduced) {
        el.textContent = raw;
        return;
      }

      // Set initial display.
      el.textContent = "0" + suffix;
      el.style.fontVariantNumeric = "tabular-nums";

      let triggered = false;

      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting || triggered) return;
          triggered = true;
          io.disconnect();

          const duration = 1.6; // seconds
          const startTime = performance.now();

          function step(now) {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(1, elapsed / duration);
            // Ease-out cubic.
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        },
        { threshold: 0.3 }
      );
      io.observe(el);

      onCleanup(() => io.disconnect());
    });
  }

  // ---- 9. Preloader ----------------------------------------------------------
  // Covers the page on first visit (sessionStorage-gated so it only runs once
  // per session). Shows brand mark + thin progress bar, then wipes upward to
  // reveal the hero. Never blocks input (pointer-events removed after exit).
  function initPreloader() {
    const el = document.getElementById("lf-preloader");
    if (!el) return;

    const KEY = "py30_preloader_shown";
    if (sessionStorage.getItem(KEY)) {
      el.style.display = "none";
      return;
    }
    sessionStorage.setItem(KEY, "1");

    if (prefersReduced) {
      el.style.display = "none";
      return;
    }

    // Build rich Lusion-style preloader DOM
    el.innerHTML = "";
    el.style.display = "flex";
    el.setAttribute("aria-busy", "true");

    // Background lines (horizontal parallax lines like Lusion)
    const linesWrap = document.createElement("div");
    linesWrap.className = "lf-pl-lines";
    for (let i = 0; i < 8; i++) {
      const line = document.createElement("div");
      line.className = "lf-pl-line";
      linesWrap.appendChild(line);
    }
    el.appendChild(linesWrap);

    // Counter (00 → 100)
    const counter = document.createElement("div");
    counter.className = "lf-pl-counter";
    counter.textContent = "0";
    el.appendChild(counter);

    // Brand mark
    const mark = document.createElement("div");
    mark.className = "lf-pl-mark";
    mark.textContent = "30 Days of Python";
    el.appendChild(mark);

    // Loading label
    const label = document.createElement("div");
    label.className = "lf-pl-label";
    label.textContent = "Loading experience";
    el.appendChild(label);

    // Thin progress bar at bottom
    const barWrap = document.createElement("div");
    barWrap.className = "lf-pl-bar";
    const barFill = document.createElement("div");
    barFill.className = "lf-pl-bar-fill";
    barWrap.appendChild(barFill);
    el.appendChild(barWrap);

    if (!hasGsap) {
      setTimeout(() => { el.style.display = "none"; }, 2000);
      return;
    }

    const gsap = window.gsap;
    const tl = gsap.timeline();

    // 1. Lines slide in from left
    tl.fromTo(".lf-pl-line",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.6, stagger: 0.06, ease: "power2.inOut" },
      0
    );

    // 2. Counter counts 0→100 over 2s
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate() {
        counter.textContent = String(Math.round(counterObj.val)).padStart(2, "0");
        barFill.style.transform = `scaleX(${counterObj.val / 100})`;
      },
    }, 0.2);

    // 3. Mark and label fade in
    tl.fromTo(mark,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.3
    );
    tl.fromTo(label,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.6, ease: "none" },
      0.6
    );

    // 4. Lines scramble/spread out before exit
    tl.to(".lf-pl-line", {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.5,
      stagger: 0.04,
      ease: "power2.in",
    }, 2.3);

    // 5. Counter + mark fly up, screen splits & wipes off
    tl.to([counter, mark, label], {
      y: -40,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
    }, 2.4);

    // 6. Full panel wipes upward to reveal page
    tl.to(el, {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: () => {
        el.style.display = "none";
        el.removeAttribute("aria-busy");
        el.style.transform = "";
      },
    }, 2.7);
  }

  // ---- Boot / re-boot on view changes -------------------------------------
  let booted = false;
  // ---- 5b. Tubelight glass-pill nav indicator -------------------------------
  // A single glow capsule (.nav-tubelight) lives inside .landing-nav-links and
  // slides to whichever link is hovered, falling back to the active link.
  // Vanilla JS port of the React "tubelight-navbar". Honors reduced-motion via
  // the CSS (transition disabled there); the JS positioning itself is unchanged.
  let navTubelightInit = false;
  function initNavTubelight() {
    if (navTubelightInit) return;
    const nav = document.querySelector(".landing-nav-links");
    if (!nav) return;
    const links = Array.prototype.slice.call(nav.querySelectorAll("a"));
    if (!links.length) return;
    navTubelightInit = true;

    // Build the indicator once: capsule + bright top bar (the tubelight glow).
    const indicator = document.createElement("div");
    indicator.className = "nav-tubelight";
    const bar = document.createElement("div");
    bar.className = "nav-tubelight-bar";
    indicator.appendChild(bar);
    nav.insertBefore(indicator, nav.firstChild);

    // Move the glow to a given link (or hide it if null).
    function moveTo(link) {
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.left = link.offsetLeft + "px";
      indicator.style.width = link.offsetWidth + "px";
      indicator.style.opacity = "1";
    }

    // Active link defaults to the first; click sets active. Hover overrides.
    let activeLink = links[0];
    activeLink.classList.add("tube-active");
    moveTo(activeLink);

    function onEnter(e) { moveTo(e.currentTarget); }
    function onLeave() { moveTo(activeLink); }
    function onClick(e) {
      links.forEach((l) => l.classList.remove("tube-active"));
      activeLink = e.currentTarget;
      activeLink.classList.add("tube-active");
      moveTo(activeLink); // don't preventDefault — keep existing smooth-scroll onclick
    }

    links.forEach((link) => {
      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      link.addEventListener("click", onClick);
    });

    // Reposition on resize (link offsets change with layout/fonts).
    let rt = null;
    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(() => moveTo(activeLink), 120);
    }
    window.addEventListener("resize", onResize);
    // Re-measure once fonts settle (widths shift after webfont swap).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => moveTo(activeLink));
    }

    onCleanup(() => {
      navTubelightInit = false;
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
        link.removeEventListener("click", onClick);
        link.classList.remove("tube-active");
      });
      if (indicator.parentNode) indicator.parentNode.removeChild(indicator);
    });
  }

  function boot() {
    if (booted || !landingVisible()) return;
    booted = true;
    // Reset shader state classes so each boot re-decides cleanly.
    const page = document.getElementById("landing");
    if (page) page.classList.remove("shader-on", "shader-fallback");
    initSmoothScroll();
    initParallax();
    initRichReveals();
    initShaderHero();
    initCursor();
    initNavTubelight();
    initMagneticButtons();
    initMarquee();
    initCounters();
    initFPSSampler();
    init3DHero();
    initLetterRoll();
    initScrollScene();
    initMaskReveals();
    initImageRevealCards();
    initLusionScrollFX();
    initConnectorLine();
    initZoomSection();
    if (hasGsap && window.ScrollTrigger) {
      // Recalc trigger start/end once layout settles. Fonts change heights;
      // the code-typer also calls ScrollTrigger.refresh() when it finishes.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => window.ScrollTrigger.refresh());
      } else {
        setTimeout(() => window.ScrollTrigger.refresh(), 300);
      }
    }
  }
  function shutdown() {
    if (!booted) return;
    booted = false;
    // Cancel app.js typewriter/code-typer timers so they don't mutate hidden DOM.
    if (typeof window.cancelLandingTimers === "function") {
      window.cancelLandingTimers();
    }
    // Reset the demo section so it doesn't resume half-filled on return.
    if (typeof window.resetDemoSection === "function") {
      window.resetDemoSection();
    }
    teardownAll();
  }

  // ---- Phase 7: 3D hero wrapper -----------------------------------------------
  // Thin wrapper so Landing3D follows the teardown lifecycle.
  function init3DHero() {
    if (!window.Landing3D) return;
    if (prefersReduced || isTouch) {
      // Show static fallback symbols
      const fallback = document.getElementById("hero3DFallback");
      if (fallback) fallback.style.display = "flex";
      return;
    }
    window.Landing3D.start();
    onCleanup(() => {
      if (window.Landing3D) window.Landing3D.stop();
      const fallback = document.getElementById("hero3DFallback");
      if (fallback) fallback.style.display = "none";
    });
  }

  // ---- Phase 8: Letter-roll hover text ----------------------------------------
  // Each [data-letterroll] element's text is split into per-letter column spans.
  // Two copies of the letter are stacked vertically; on hover the column
  // translates up by 50% (CSS handles the transition) to "roll" to the copy.
  // Idempotent: skips already-split elements. Reduced-motion → plain text.
  function initLetterRoll() {
    const els = document.querySelectorAll("[data-letterroll]");
    if (!els.length) return;

    els.forEach((el) => {
      if (el.dataset.lrSplit) return; // already split
      el.dataset.lrSplit = "1";

      const original = el.textContent.trim();

      // Reduced-motion: leave plain, just mark processed.
      if (prefersReduced) return;

      el.textContent = "";
      el.style.display = "inline-flex";
      el.style.overflow = "hidden";

      [...original].forEach((ch) => {
        const col = document.createElement("span");
        col.className = "lr-col";
        col.setAttribute("aria-hidden", "true");

        const inner = document.createElement("span");
        inner.className = "lr-inner";

        const top = document.createElement("span");
        top.className = "lr-char";
        top.textContent = ch === " " ? " " : ch;

        const bot = document.createElement("span");
        bot.className = "lr-char";
        bot.textContent = ch === " " ? " " : ch;

        inner.appendChild(top);
        inner.appendChild(bot);
        col.appendChild(inner);
        el.appendChild(col);
      });

      // Accessible label preserved
      el.setAttribute("aria-label", original);
    });

    // No cleanup needed — the DOM change is cosmetic and stable.
  }

  // ---- Phase 9: Scroll scene (dark→light→dark bg) ----------------------------
  // A fixed color overlay fades from transparent to semi-white and back
  // as the user scrolls through the page. Pure opacity change — no reflow.
  function initScrollScene() {
    if (!hasGsap || !window.ScrollTrigger) return;
    ensureST();

    const landing = document.getElementById("landing");
    if (!landing) return;

    // Scroll progress bar
    const prog = document.getElementById("lf-scroll-progress-fill");
    if (prog) {
      const tw = window.gsap.to(prog, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: landing,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
      onCleanup(() => {
        if (tw.scrollTrigger) tw.scrollTrigger.kill();
        tw.kill();
        if (prog) prog.style.transform = "";
      });
    }

    // Reduced-motion: skip bg color shift
    if (prefersReduced) return;

    // bg color layer
    const layer = document.getElementById("lf-bg-color-layer");
    if (!layer) return;

    const sections = document.querySelectorAll(
      ".landing-about, .landing-features-section, .landing-feature, .landing-curriculum"
    );

    sections.forEach((sec, i) => {
      // Fade in to light on enter, fade out to dark on leave
      const tIn = window.gsap.to(layer, {
        opacity: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      });
      const tOut = window.gsap.to(layer, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "bottom 60%",
          end: "bottom 20%",
          scrub: true,
        },
      });
      onCleanup(() => {
        tIn.scrollTrigger?.kill(); tIn.kill();
        tOut.scrollTrigger?.kill(); tOut.kill();
      });
    });
  }

  // ---- Phase 9: Mask-reveal headings -----------------------------------------
  // [data-mask-reveal] headings slide up from a clip-path mask on scroll entry.
  function initMaskReveals() {
    if (prefersReduced || !hasGsap || !window.ScrollTrigger) return;
    ensureST();

    const els = document.querySelectorAll("[data-mask-reveal]");
    els.forEach((el) => {
      el.style.overflow = "hidden";
      const tw = window.gsap.from(el, {
        y: "110%",
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
      onCleanup(() => {
        tw.scrollTrigger?.kill(); tw.kill();
        el.style.overflow = "";
        el.removeAttribute("style");
      });
    });
  }

  // ---- Phase 9: Image-reveal feature cards -----------------------------------
  // Cards scale+lift on scroll entry. Arrow slides in.
  // Mouse-tracking radial glow on ::after pseudo (CSS var --mx/--my).
  function initImageRevealCards() {
    if (prefersReduced || !hasGsap || !window.ScrollTrigger) return;
    ensureST();

    const cards = document.querySelectorAll(".landing-feat-card");
    const cardCleaners = [];

    cards.forEach((card, i) => {
      if (card.classList.contains("visible")) return;

      // Add an arrow element
      if (!card.querySelector(".lf-card-arrow")) {
        const arrow = document.createElement("span");
        arrow.className = "lf-card-arrow";
        arrow.textContent = "↗";
        arrow.setAttribute("aria-hidden", "true");
        card.appendChild(arrow);
      }

      const arrow = card.querySelector(".lf-card-arrow");

      window.gsap.set(card, { y: 40, opacity: 0, scale: 0.96 });
      if (arrow) window.gsap.set(arrow, { opacity: 0, x: -8, y: 8 });

      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
      });

      tl.to(card, { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out", delay: i * 0.08 });
      if (arrow) tl.to(arrow, { opacity: 1, x: 0, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");

      // Mouse-track radial glow for ::after pseudo
      function onCardMouseMove(e) {
        const rect = card.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + "%";
        const my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
        card.style.setProperty("--mx", mx);
        card.style.setProperty("--my", my);
      }
      card.addEventListener("mousemove", onCardMouseMove, { passive: true });
      cardCleaners.push(() => {
        card.removeEventListener("mousemove", onCardMouseMove);
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
      });

      onCleanup(() => {
        tl.scrollTrigger?.kill(); tl.kill();
        card.removeAttribute("style");
        if (arrow) arrow.remove();
      });
    });

    onCleanup(() => cardCleaners.forEach(fn => fn()));
  }

  // ---- Lusion-style scroll FX: moving lines, zoom reveals, dramatic entrances ----
  // Injects animated elements and scroll-driven effects inspired by lusion.co:
  //   • Horizontal accent lines that slide across on scroll
  //   • Feature card images that scale from 0.85→1 as they enter
  //   • Section titles that zoom up with oversized scale
  //   • Code window that slides in from bottom with perspective tilt
  function initLusionScrollFX() {
    if (prefersReduced || !hasGsap || !window.ScrollTrigger) return;
    ensureST();
    const gsap = window.gsap;
    const ST = window.ScrollTrigger;

    // ── 1. Horizontal running lines on section transitions ──
    // Inject a lf-scroll-line bar into each major section boundary
    const sectionBoundaries = document.querySelectorAll(
      ".landing-stats-bar, .landing-about, .landing-features-section, .landing-feature, .landing-curriculum"
    );
    const lineEls = [];
    sectionBoundaries.forEach((sec) => {
      if (sec.querySelector(".lf-scroll-line")) return;
      const line = document.createElement("div");
      line.className = "lf-scroll-line";
      line.setAttribute("aria-hidden", "true");
      sec.insertBefore(line, sec.firstChild);
      lineEls.push(line);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: "top 85%", once: true },
      });
      tl.fromTo(line,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.1, ease: "power3.out" }
      );
      tl.to(line, {
        x: "105%",
        duration: 0.7,
        ease: "power2.in",
        delay: 0.1,
      });

      onCleanup(() => {
        tl.scrollTrigger?.kill(); tl.kill();
        line.remove();
      });
    });

    // ── 2. Feature cards: zoom-in from scale(0.82) + clip-path reveal ──
    const featureCards = document.querySelectorAll(".landing-feature-card");
    featureCards.forEach((card, i) => {
      gsap.set(card, { scale: 0.84, opacity: 0, y: 30 });
      const tw = gsap.to(card, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 82%", once: true },
        delay: i * 0.05,
      });
      onCleanup(() => {
        tw.scrollTrigger?.kill(); tw.kill();
        card.removeAttribute("style");
      });
    });

    // ── 3. Big feature titles: zoom up from below with scale ──
    const featureTitles = document.querySelectorAll(".landing-feature-title, .landing-about-title");
    featureTitles.forEach((el) => {
      gsap.set(el, { y: 60, opacity: 0, scale: 0.92 });
      const tw = gsap.to(el, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      onCleanup(() => {
        tw.scrollTrigger?.kill(); tw.kill();
        el.removeAttribute("style");
      });
    });

    // ── 4. Code window: slides up with 3D perspective tilt ──
    const codeWin = document.querySelector(".landing-code-window");
    if (codeWin) {
      gsap.set(codeWin, { y: 80, opacity: 0, rotateX: 8, transformPerspective: 1000 });
      const tw = gsap.to(codeWin, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: codeWin, start: "top 88%", once: true },
      });
      onCleanup(() => {
        tw.scrollTrigger?.kill(); tw.kill();
        codeWin.removeAttribute("style");
      });
    }

    // ── 5. CTA / footer "Start for free" — zoom in from small scale ──
    const ctaHeading = document.querySelector(".landing-cta-title, .landing-footer-cta h2");
    if (ctaHeading) {
      gsap.set(ctaHeading, { scale: 0.9, opacity: 0 });
      const tw = gsap.to(ctaHeading, {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ctaHeading, start: "top 88%", once: true },
      });
      onCleanup(() => {
        tw.scrollTrigger?.kill(); tw.kill();
        ctaHeading.removeAttribute("style");
      });
    }

    // ── 6. Stat bar: slide up + fade in as a unit, then punch each number ──
    const statsBar = document.querySelector(".landing-stats-bar");
    if (statsBar) {
      gsap.set(statsBar, { y: 30, opacity: 0 });
      const barTw = gsap.to(statsBar, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: statsBar, start: "top 88%", once: true },
        onComplete() {
          // After bar is visible, punch each stat number
          const statNums = statsBar.querySelectorAll(".landing-stat-num");
          statNums.forEach((el, i) => {
            gsap.fromTo(el,
              { scale: 0.7, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.8)", delay: i * 0.08 }
            );
          });
        },
      });
      onCleanup(() => {
        barTw.scrollTrigger?.kill(); barTw.kill();
        statsBar.removeAttribute("style");
        statsBar.querySelectorAll(".landing-stat-num").forEach(el => el.removeAttribute("style"));
      });
    }

    // ── 7. Curriculum grid: staggered zoom-in ──
    const dayCards = document.querySelectorAll(".day-card, .curriculum-item");
    if (dayCards.length) {
      gsap.set(dayCards, { scale: 0.88, opacity: 0, y: 20 });
      const tw = gsap.to(dayCards, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.025, from: "start" },
        scrollTrigger: { trigger: dayCards[0], start: "top 88%", once: true },
      });
      onCleanup(() => {
        tw.scrollTrigger?.kill(); tw.kill();
        dayCards.forEach(c => c.removeAttribute("style"));
      });
    }
  }

  // ---- Curved SVG Connector Line (scroll-drawn, Lusion style) ----------------
  // The SVG path stroke-dashoffset is driven by ScrollTrigger scrub.
  // Three orbit dots travel along the path via motion path (or manual lerp).
  // Labels pop in at 33%, 60%, 85% scroll progress.

  function initConnectorLine() {
    if (prefersReduced || !hasGsap || !window.ScrollTrigger) return;
    ensureST();
    const gsap = window.gsap;
    const ST = window.ScrollTrigger;

    const wrap = document.querySelector(".lf-connector-wrap");
    const mainPath = document.querySelector(".lf-connector-path");
    const glowPath = document.querySelector(".lf-connector-path-glow");
    if (!wrap || !mainPath) return;

    // Measure path length and set CSS vars
    const len = mainPath.getTotalLength();
    mainPath.style.setProperty("--conn-len", len);
    mainPath.style.strokeDasharray = len;
    mainPath.style.strokeDashoffset = len;
    if (glowPath) {
      glowPath.style.strokeDasharray = len;
      glowPath.style.strokeDashoffset = len;
    }

    // Labels pop in when the line draws past their position (tied to scroll progress)
    const labelDefs = [
      { el: document.querySelector(".lf-conn-label-1"), progress: 0.30 },
      { el: document.querySelector(".lf-conn-label-2"), progress: 0.58 },
      { el: document.querySelector(".lf-conn-label-3"), progress: 0.82 },
    ];
    const triggered = new Set();

    // Scrub stroke-dashoffset from len → 0 as user scrolls through the section
    // onUpdate fires on every scrub tick — use it to pop in labels at the right moment
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.2,
        onUpdate(self) {
          const p = self.progress;
          labelDefs.forEach(({ el, progress }) => {
            if (!el || triggered.has(el)) return;
            if (p >= progress) {
              triggered.add(el);
              el.classList.add("visible");
            }
          });
          // Also hide labels if user scrolls back up past their threshold
          labelDefs.forEach(({ el, progress }) => {
            if (!el) return;
            if (p < progress - 0.02 && triggered.has(el)) {
              triggered.delete(el);
              el.classList.remove("visible");
            }
          });
        },
      },
    });
    tl.to(mainPath, { strokeDashoffset: 0, ease: "none" }, 0);
    if (glowPath) tl.to(glowPath, { strokeDashoffset: 0, ease: "none" }, 0);

    onCleanup(() => {
      tl.scrollTrigger?.kill(); tl.kill();
      if (mainPath) { mainPath.style.strokeDashoffset = ""; mainPath.style.strokeDasharray = ""; }
      if (glowPath) { glowPath.style.strokeDashoffset = ""; glowPath.style.strokeDasharray = ""; }
      labelDefs.forEach(({ el }) => el?.classList.remove("visible"));
    });
  }

  // ---- Fullscreen Pinned Zoom (Three.js abstract scene) ----------------------
  // Section is pinned for 3× its viewport height of scroll.
  // The inner container scales from scale(0.18) + borderRadius to scale(1) full.
  // A Three.js abstract crystal sphere animates inside.
  // Text overlays fade in at ~60% progress, corners at ~40%.

  let zoomRenderer = null;
  let zoomRunning = false;

  function initZoomScene(canvas) {
    if (!window.THREE || !canvas) return null;
    const THREE = window.THREE;

    const W = canvas.offsetWidth || window.innerWidth;
    const H = canvas.offsetHeight || window.innerHeight;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    // Let Three.js create its own WebGL context — no pre-claim to avoid type conflict
    // (Three.js r152 prefers webgl2; pre-claiming webgl would cause "existing context of different type")
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (e) {
      return null; // WebGL unavailable
    }
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0); // transparent — CSS gradient shows through
    if (THREE.ACESFilmicToneMapping !== undefined) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Bright white lighting so crystal is clearly visible against the dark gradient
    scene.add(new THREE.AmbientLight(0xffffff, 3));

    const key = new THREE.DirectionalLight(0xffffff, 12);
    key.position.set(3, 5, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xc4b5fd, 8);
    fill.position.set(-4, 2, 2);
    scene.add(fill);

    const cyan = new THREE.PointLight(0x38bdf8, 16, 20);
    cyan.position.set(2, -3, 2);
    scene.add(cyan);

    const rim = new THREE.PointLight(0xffffff, 10, 15);
    rim.position.set(0, 0, 6);
    scene.add(rim);

    // Central crystal — physical material w/ clearcoat + iridescence for a jewel look
    const geo = new THREE.IcosahedronGeometry(1.1, 1);
    const usePhysical = typeof THREE.MeshPhysicalMaterial === "function";
    const mat = usePhysical
      ? new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          emissive: 0x4f46e5,
          emissiveIntensity: 0.35,
          roughness: 0.06,
          metalness: 0.7,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          iridescence: 0.7,
          iridescenceIOR: 1.6,
          reflectivity: 0.9,
        })
      : new THREE.MeshStandardMaterial({
          color: 0xffffff, emissive: 0x4f46e5, emissiveIntensity: 0.4,
          roughness: 0.02, metalness: 0.85,
        });
    const crystal = new THREE.Mesh(geo, mat);
    crystal.position.set(0, 1.55, 0);   // top-center — text sits in lower third, no overlap
    scene.add(crystal);

    // Wireframe shell
    const wireGeo = new THREE.IcosahedronGeometry(1.18, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.55 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    wire.position.copy(crystal.position);
    scene.add(wire);

    // Inner glow core
    const glowGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const glowCore = new THREE.Mesh(glowGeo, glowMat);
    glowCore.position.copy(crystal.position);
    scene.add(glowCore);

    // Outer ring 1 — bright cyan, centered on crystal
    const ring1Geo = new THREE.TorusGeometry(1.7, 0.04, 8, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.copy(crystal.position);
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    // Outer ring 2 — bright violet, counter-rotating
    const ring2Geo = new THREE.TorusGeometry(2.2, 0.025, 8, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.7 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.position.copy(crystal.position);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Stars — 1500 particles evenly distributed across the WHOLE sphere (not top-biased)
    // Use uniform sphere sampling so bottom and right quadrants are equally filled
    const pCount = 1500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      // Fibonacci sphere — perfectly uniform, no polar bunching
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const y = 1 - (i / (pCount - 1)) * 2;           // -1 to 1
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      // Scatter to various distances — bias toward far background
      const dist = 3.5 + (i % 7) * 0.6 + Math.sin(i * 1.3) * 0.8;
      pPos[i * 3]     = radius * Math.cos(theta) * dist;
      pPos[i * 3 + 1] = y * dist;
      pPos[i * 3 + 2] = radius * Math.sin(theta) * dist - 1.5;  // push slightly back
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    // Mix of dot sizes — larger square stars + smaller dots like real sky
    const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.055, transparent: true, opacity: 0.88, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Second layer — dimmer, slightly smaller, different distribution for depth
    const p2Count = 800;
    const p2Geo = new THREE.BufferGeometry();
    const p2Pos = new Float32Array(p2Count * 3);
    for (let i = 0; i < p2Count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 5 + Math.random() * 4;
      p2Pos[i * 3]     = dist * Math.sin(phi) * Math.cos(theta);
      p2Pos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      p2Pos[i * 3 + 2] = dist * Math.cos(phi) - 3;
    }
    p2Geo.setAttribute("position", new THREE.BufferAttribute(p2Pos, 3));
    const p2Mat = new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.03, transparent: true, opacity: 0.55, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const particles2 = new THREE.Points(p2Geo, p2Mat);
    scene.add(particles2);

    let t = 0;
    let lastNow = performance.now();

    // Mouse parallax — camera drifts toward cursor, looks at crystal
    let zmx = 0, zmy = 0, zmtx = 0, zmty = 0;
    function zMouse(e) {
      zmtx = (e.clientX / window.innerWidth  - 0.5) * 2;
      zmty = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", zMouse, { passive: true });

    function resize() {
      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", resize);

    function frame(now) {
      if (!zoomRunning) return;
      requestAnimationFrame(frame);
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;
      t += dt;

      crystal.rotation.x = t * 0.20;
      crystal.rotation.y = t * 0.32;
      wire.rotation.x = crystal.rotation.x - t * 0.05;
      wire.rotation.y = crystal.rotation.y + t * 0.05;
      ring1.rotation.z = t * 0.18;
      ring2.rotation.z = -t * 0.12;
      ring2.rotation.x = -Math.PI / 3 + t * 0.08;
      particles.rotation.y = t * 0.015;   // slow galaxy drift
      particles.rotation.x = t * 0.008;
      particles2.rotation.y = -t * 0.01;  // counter-rotate for depth

      // Breathing scale + glow pulse
      const breathe = 1 + Math.sin(t * 0.9) * 0.06;
      crystal.scale.setScalar(breathe);
      wire.scale.setScalar(breathe);

      // Glow core pulses faster
      const glow = 0.45 + Math.sin(t * 2.2) * 0.25;
      glowMat.opacity = glow;

      // Eased mouse parallax — camera drifts, always frames the crystal
      zmx += (zmtx - zmx) * 0.05;
      zmy += (zmty - zmy) * 0.05;
      camera.position.x = zmx * 0.6;
      camera.position.y = -zmy * 0.4;
      camera.lookAt(crystal.position.x * 0.5, crystal.position.y * 0.5, 0);

      renderer.render(scene, camera);
    }

    zoomRunning = true;
    requestAnimationFrame(frame);

    return {
      dispose() {
        zoomRunning = false;
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", zMouse);
        geo.dispose(); mat.dispose();
        wireGeo.dispose(); wireMat.dispose();
        glowGeo.dispose(); glowMat.dispose();
        ring1Geo.dispose(); ring1Mat.dispose();
        ring2Geo.dispose(); ring2Mat.dispose();
        pGeo.dispose(); pMat.dispose();
        p2Geo.dispose(); p2Mat.dispose();
        renderer.dispose();
      }
    };
  }

  function initZoomSection() {
    if (prefersReduced || isTouch || !hasGsap || !window.ScrollTrigger) return;
    ensureST();
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    const section = document.getElementById("lfZoomSection");
    const stage   = section?.querySelector(".lf-zoom-stage");
    const inner   = document.getElementById("lfZoomInner");
    const canvas  = document.getElementById("lfZoomCanvas");
    if (!section || !stage || !inner || !canvas) return;

    // DO NOT init Three.js here — canvas.offsetWidth is 0 on first load because
    // the inner is clipped to inset(50%) so layout gives it zero visible size.
    // Instead, init lazily on first ScrollTrigger onEnter, when the pin has
    // activated and the canvas definitely has real pixel dimensions.
    let zScene = null;

    // Section height = 5× viewport — the stage occupies 1vh, the rest is scroll space
    section.style.height = (window.innerHeight * 5) + "px";

    // Overlay text elements
    const eyebrow = inner.querySelector(".lf-zoom-eyebrow");
    const title   = inner.querySelector(".lf-zoom-title");
    const desc    = inner.querySelector(".lf-zoom-desc");

    // clip-path: inset(50% 50%) = invisible point at center.
    // Opens to inset(0%) = fullscreen. Then collapses back to inset(50%) = gone.
    const state = { pct: 50, radius: 0 };

    function applyClip() {
      const p = state.pct;
      const r = state.radius;
      inner.style.clipPath = `inset(${p}% ${p}% round ${r}px)`;
      if (p < 3) inner.classList.add("lf-zoom-open");
      else        inner.classList.remove("lf-zoom-open");
    }
    applyClip();

    // Also animate a subtle scale-in for extra cinematic depth
    gsap.set(inner, { scale: 0.92 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        scrub: 3.5,
        pinSpacing: false,
        onEnter() {
          // Lazy init: canvas now has real dimensions (GSAP pin has activated).
          // Only run once — if zScene already exists, skip.
          if (!zScene) {
            zScene = initZoomScene(canvas);
          }
        },
      },
    });

    // Phase 1 (0→0.38): appear from nothing → fullscreen
    // expo.inOut = starts imperceptibly slow, rockets through, decelerates silently to rest
    tl.to(state, {
      pct: 0,
      radius: 0,
      ease: "expo.inOut",
      onUpdate: applyClip,
      duration: 0.38,
    }, 0);
    // Scale from 0.92 → 1.0 simultaneously — adds a "push through" feel
    tl.to(inner, {
      scale: 1,
      ease: "expo.inOut",
      duration: 0.38,
    }, 0);

    // Phase 2 (0.34→0.58): overlay text drifts in
    tl.to([eyebrow, title, desc], {
      opacity: 1, y: 0,
      stagger: 0.08,
      ease: "power3.out",
      duration: 0.22,
    }, 0.34);

    // Long dwell until 0.82

    // Phase 3 (0.82→0.90): text fades out
    tl.to([eyebrow, title, desc], {
      opacity: 0, y: -24,
      ease: "power3.in",
      duration: 0.08,
    }, 0.82);

    // Phase 4 (0.88→1.0): collapse — same expo curve in reverse, equally silky
    tl.to(state, {
      pct: 50,
      radius: 0,
      ease: "expo.inOut",
      onUpdate: applyClip,
      duration: 0.12,
    }, 0.88);
    tl.to(inner, {
      scale: 0.92,
      ease: "expo.inOut",
      duration: 0.12,
    }, 0.88);

    onCleanup(() => {
      tl.scrollTrigger?.kill(); tl.kill();
      section.style.height = "";
      inner.style.clipPath = "";
      inner.classList.remove("lf-zoom-open");
      [eyebrow, title, desc].forEach(el => el?.removeAttribute("style"));
      zScene?.dispose();
    });
  }

  // ---- Phase 5: Branded view-transition wipe ---------------------------------
  // A full-screen panel sweeps in (covering the swap), the real view change
  // runs underneath, then the panel lifts away. No white flash, both directions.
  // Reduced-motion: instant swap, no animation.

  // Build the wipe overlay once and reuse it.
  let wipeEl = null;
  function ensureWipe() {
    if (wipeEl) return wipeEl;
    wipeEl = document.getElementById("lf-view-wipe");
    if (!wipeEl) return null;
    return wipeEl;
  }

  // dir: "in" = landing → lesson  |  "out" = lesson → landing
  // swapFn: the real swap (called while panel covers the screen)
  function playWipe(dir, swapFn) {
    const el = ensureWipe();

    // Reduced-motion or no GSAP → instant swap, no animation.
    if (prefersReduced || !hasGsap || !el) {
      swapFn();
      return;
    }

    const gsap = window.gsap;

    // Reset: panel starts fully off-screen below.
    gsap.set(el, { yPercent: 100, display: "flex" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // 1. Sweep panel UP to cover the screen (fast).
    tl.to(el, { yPercent: 0, duration: 0.45 });

    // 2. While covered: run the real swap.
    tl.add(() => {
      try { swapFn(); } catch (e) { /* swap must not crash the timeline */ }
    });

    // 3. Brief pause so the new view can paint.
    tl.to({}, { duration: 0.08 });

    // 4. Sweep panel UP off-screen to reveal the new view (slightly slower).
    tl.to(el, { yPercent: -100, duration: 0.52 });

    // 5. Hide panel so it's out of the accessibility tree.
    tl.set(el, { display: "none" });
  }

  // Hook into the app's view switch without overriding behavior.
  // startLearning() hides #landing → we tear down. goHome() shows it → reboot.
  // Phase 5: both directions are now wrapped in playWipe so no raw flash.
  function patchViewSwitches() {
    if (typeof window.startLearning === "function") {
      const orig = window.startLearning;
      window.startLearning = function () {
        const args = arguments;
        const self = this;
        playWipe("in", () => {
          orig.apply(self, args); // does the class-swap
          shutdown();             // teardown landing effects
        });
      };
    }
    if (typeof window.goHome === "function") {
      const orig = window.goHome;
      window.goHome = function () {
        const args = arguments;
        const self = this;
        playWipe("out", () => {
          orig.apply(self, args); // removes .hidden from #landing → now visible
          // Boot HERE, inside the wipe (right after the class-swap), while the
          // panel still covers the screen. #landing is visible at this point so
          // landingVisible() is true and boot() actually runs. The old double-rAF
          // boot fired ~32ms in — BEFORE playWipe's 0.45s cover sweep ran this
          // swap — so #landing was still .hidden, landingVisible() was false, and
          // boot() bailed early, leaving the landing dark/dead on return.
          boot();
        });
      };
    }
  }

  function start() {
    patchViewSwitches();
    watchReducedMotion(); // runtime media-query listener — set up once
    initPreloader(); // runs before boot — covers the page during initial load
    boot();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // enhanceDayCards: called by app.js after buildPreviewGrid() populates #previewGrid
  // Applies letter-roll + image-reveal to dynamically generated day cards.
  function enhanceDayCards() {
    initLetterRoll(); // idempotent — skips already-split
    initImageRevealCards(); // idempotent — skips cards with .visible
  }

  window.LandingFX = {
    boot,
    shutdown,
    enhanceDayCards,
    get lenis() { return lenis; },
    get cursor() { return { active: cursorActive }; },
  };
})();
