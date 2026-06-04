/* ============================================================================
 * music.js — Focus-music controller
 * ----------------------------------------------------------------------------
 * Wires an <audio id="focusMusic" loop> element to mute/play toggle buttons.
 *
 * Browsers BLOCK autoplay until the user interacts with the page, so playback
 * is deferred until the FIRST user gesture (pointerdown OR scroll OR keydown).
 *
 * Public API (window.Music):
 *   - Music.isMuted()  -> boolean   (reads localStorage)
 *   - Music.toggle()   -> void      (flips + persists + syncs buttons/audio)
 *
 * Persistence:
 *   localStorage key 'musicMuted'
 *     '1'                 -> muted
 *     anything else / absent -> unmuted
 *
 * Button contract:
 *   class "music-toggle-btn", each containing a Font Awesome <i>:
 *     unmuted -> fa-solid fa-volume-high
 *     muted   -> fa-solid fa-volume-xmark
 *   There are two buttons (landing nav + lesson topbar); both stay in sync.
 *
 * Everything is null-safe: a missing #focusMusic element or missing buttons
 * never throws, and a missing/blocked mp3 is swallowed by play().catch().
 * ==========================================================================*/
(function () {
  "use strict";

  var STORAGE_KEY = "musicMuted";
  var MUTED_VALUE = "1";
  var DEFAULT_VOLUME = 0.35; // gentle background level

  // Has a user gesture already fired? Once true, toggling to unmuted may play.
  var gestureHappened = false;

  /** Read mute state from localStorage. Returns true when muted. */
  function isMuted() {
    try {
      return localStorage.getItem(STORAGE_KEY) === MUTED_VALUE;
    } catch (e) {
      // localStorage can throw in private mode / sandboxed iframes.
      return false;
    }
  }

  /** Persist mute state. */
  function persist(muted) {
    try {
      if (muted) {
        localStorage.setItem(STORAGE_KEY, MUTED_VALUE);
      } else {
        // Remove the key entirely so "absent" cleanly means unmuted.
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      /* ignore storage write failures */
    }
  }

  /** Get the <audio> element, or null if absent. */
  function getAudio() {
    return document.getElementById("focusMusic");
  }

  /** Get all toggle buttons as a real array (null-safe). */
  function getButtons() {
    return Array.prototype.slice.call(
      document.querySelectorAll(".music-toggle-btn")
    );
  }

  /** Attempt playback; swallow autoplay/missing-file errors. */
  function safePlay(audio) {
    if (!audio) return;
    try {
      var p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          /* autoplay blocked or file missing — ignore */
        });
      }
    } catch (e) {
      /* older browsers: play() may throw synchronously — ignore */
    }
  }

  /** Reflect the current mute state on the <audio> element. */
  function syncAudio(muted) {
    var audio = getAudio();
    if (!audio) return;
    audio.muted = muted;
    // Keep a sensible volume regardless of mute toggling.
    if (typeof audio.volume === "number") audio.volume = DEFAULT_VOLUME;
  }

  /** Reflect the current mute state on every toggle button. */
  function syncButtons(muted) {
    var buttons = getButtons();
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (!btn) continue;

      btn.setAttribute("aria-pressed", muted ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        muted ? "Unmute focus music" : "Mute focus music"
      );
      btn.title = muted ? "Unmute focus music" : "Mute focus music";

      var icon = btn.querySelector("i");
      if (icon) {
        // Preserve the Font Awesome style prefix; swap only the glyph class.
        icon.classList.remove("fa-volume-high", "fa-volume-xmark");
        icon.classList.add(muted ? "fa-volume-xmark" : "fa-volume-high");
      }
    }
  }

  /** Apply state everywhere: audio + buttons (does NOT persist). */
  function applyState(muted) {
    syncAudio(muted);
    syncButtons(muted);
  }

  /** Flip mute state, persist, sync, and start playback if appropriate. */
  function toggle() {
    var nowMuted = !isMuted();
    persist(nowMuted);
    applyState(nowMuted);

    // If we just unmuted and the user has already interacted, start playing.
    if (!nowMuted && gestureHappened) {
      safePlay(getAudio());
    }
  }

  /* ----- First-gesture autoplay unlock ------------------------------------ */

  var GESTURE_EVENTS = ["pointerdown", "scroll", "keydown"];

  function onFirstGesture() {
    if (gestureHappened) return;
    gestureHappened = true;

    // Remove all gesture listeners — we only needed the first one.
    for (var i = 0; i < GESTURE_EVENTS.length; i++) {
      window.removeEventListener(GESTURE_EVENTS[i], onFirstGesture);
    }

    // Start playback unless the user has muted.
    if (!isMuted()) {
      safePlay(getAudio());
    }
  }

  function armGestureListeners() {
    for (var i = 0; i < GESTURE_EVENTS.length; i++) {
      window.addEventListener(GESTURE_EVENTS[i], onFirstGesture, {
        once: true,
        passive: true,
      });
    }
  }

  /* ----- Init ------------------------------------------------------------- */

  function init() {
    // Sync UI + audio to the persisted state on load.
    applyState(isMuted());
    // Wait for the first user gesture before attempting playback.
    armGestureListeners();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Public API.
  window.Music = {
    toggle: toggle,
    isMuted: isMuted,
  };
})();
