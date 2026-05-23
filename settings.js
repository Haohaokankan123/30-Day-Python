/* =============================================
   SETTINGS.JS
   Exposes: window.Settings, window.SettingsPanel,
            window.UserAvatar, window.LangSwitcher
   ============================================= */

// ─── UserAvatar (bottom-left popup) ──────────
const UserAvatar = (() => {
  let _open = false;

  function toggle() {
    _open ? close() : open();
  }

  function open() {
    _open = true;
    document.getElementById("userAvatarPopup")?.classList.remove("hidden");
    setTimeout(() => document.addEventListener("click", _outsideClick), 0);
  }

  function close() {
    _open = false;
    document.getElementById("userAvatarPopup")?.classList.add("hidden");
    document.removeEventListener("click", _outsideClick);
  }

  function _outsideClick(e) {
    const wrap = document.getElementById("userAvatarWrap");
    if (wrap && !wrap.contains(e.target)) close();
  }

  return { toggle, open, close };
})();

window.UserAvatar = UserAvatar;

// ─── SettingsPanel ────────────────────────────
const SettingsPanel = (() => {
  let _activeSection = "appearance";

  function open() {
    document.getElementById("settingsOverlay")?.classList.remove("hidden");
    document.getElementById("settingsModal")?.classList.remove("hidden");
    nav(_activeSection);
    _syncUiToPrefs();
  }

  function close() {
    document.getElementById("settingsOverlay")?.classList.add("hidden");
    document.getElementById("settingsModal")?.classList.add("hidden");
  }

  function nav(section) {
    _activeSection = section;
    // Hide all sections
    document.querySelectorAll(".settings-section").forEach(el => el.classList.add("hidden"));
    // Show target
    const target = document.getElementById("settings-" + section);
    if (target) target.classList.remove("hidden");
    // Update nav buttons
    document.querySelectorAll(".settings-nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.section === section);
    });
  }

  function _syncUiToPrefs() {
    const theme = localStorage.getItem("py30_theme") || "dark";
    const font  = localStorage.getItem("py30_font")  || "dm-sans";
    const size  = localStorage.getItem("py30_size")  || "medium";

    // Theme picker
    document.querySelectorAll(".picker-btn[data-theme]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === theme);
    });
    // Font picker
    document.querySelectorAll(".picker-btn[data-font]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.font === font);
    });
    // Size picker
    document.querySelectorAll(".picker-btn[data-size]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.size === size);
    });

    // Editor settings
    const tabSize = localStorage.getItem("py30_editor_tabsize") || "4";
    const editorFs = localStorage.getItem("py30_editor_fontsize") || "14";
    const lineNums = localStorage.getItem("py30_editor_linenums") !== "false";
    const tsEl = document.getElementById("tabSizeSelect");
    if (tsEl) tsEl.value = tabSize;
    const efsEl = document.getElementById("editorFontSizeSelect");
    if (efsEl) efsEl.value = editorFs;
    const lnEl = document.getElementById("lineNumToggle");
    if (lnEl) lnEl.checked = lineNums;

    // Accessibility
    const reduceMotion = localStorage.getItem("py30_reduce_motion") === "true";
    const rmEl = document.getElementById("reduceMotionToggle");
    if (rmEl) rmEl.checked = reduceMotion;

    // Notifications
    const streakReminder = localStorage.getItem("py30_notif_streak") !== "false";
    const weeklyTips = localStorage.getItem("py30_notif_tips") !== "false";
    const srEl = document.getElementById("streakReminderToggle");
    if (srEl) srEl.checked = streakReminder;
    const wtEl = document.getElementById("weeklyTipsToggle");
    if (wtEl) wtEl.checked = weeklyTips;

    // Account email
    const emailEl = document.getElementById("settingsEmail");
    if (emailEl && window.Auth && window.Auth.user()) {
      emailEl.textContent = window.Auth.user().email || "";
    }
  }

  return { open, close, nav };
})();

window.SettingsPanel = SettingsPanel;

// ─── Settings (theme/font/size/editor) ───────
const Settings = (() => {
  const FONT_STACKS = {
    "dm-sans": "'DM Sans', 'Inter', sans-serif",
    "inter":   "'Inter', sans-serif",
    "system":  "system-ui, -apple-system, sans-serif",
    "roboto":  "'Roboto', sans-serif",
  };

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("py30_theme", theme);
    document.querySelectorAll(".picker-btn[data-theme]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === theme);
    });
    if (window.Sync) window.Sync.push();
  }

  function setFont(font) {
    // Lazy-load Roboto if needed
    if (font === "roboto" && !document.getElementById("robotoFont")) {
      const link = document.createElement("link");
      link.id = "robotoFont";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
      document.head.appendChild(link);
    }
    const stack = FONT_STACKS[font] || FONT_STACKS["dm-sans"];
    document.documentElement.style.setProperty("--font-body", stack);
    localStorage.setItem("py30_font", font);
    document.querySelectorAll(".picker-btn[data-font]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.font === font);
    });
  }

  function setSize(size) {
    document.documentElement.setAttribute("data-size", size);
    localStorage.setItem("py30_size", size);
    document.querySelectorAll(".picker-btn[data-size]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.size === size);
    });
  }

  function setReduceMotion(val) {
    localStorage.setItem("py30_reduce_motion", String(val));
    document.documentElement.classList.toggle("reduce-motion", val);
  }

  function setTabSize(val) {
    localStorage.setItem("py30_editor_tabsize", val);
    if (window.Playground && window.Playground.editor) {
      window.Playground.editor.getSession().setTabSize(parseInt(val, 10));
    }
    if (window.FloatingPlayground && window.FloatingPlayground.editor) {
      window.FloatingPlayground.editor.getSession().setTabSize(parseInt(val, 10));
    }
  }

  function setLineNumbers(val) {
    localStorage.setItem("py30_editor_linenums", String(val));
    const opts = { showGutter: val };
    if (window.Playground && window.Playground.editor) {
      window.Playground.editor.setOptions(opts);
    }
    if (window.FloatingPlayground && window.FloatingPlayground.editor) {
      window.FloatingPlayground.editor.setOptions(opts);
    }
  }

  function setEditorFontSize(val) {
    localStorage.setItem("py30_editor_fontsize", val);
    const sz = parseInt(val, 10);
    if (window.Playground && window.Playground.editor) {
      window.Playground.editor.setFontSize(sz);
    }
    if (window.FloatingPlayground && window.FloatingPlayground.editor) {
      window.FloatingPlayground.editor.setFontSize(sz);
    }
  }

  function setNotification(key, val) {
    localStorage.setItem("py30_notif_" + key, String(val));
  }

  async function sendPasswordReset() {
    if (!window.Auth || !window.Auth.user()) return;
    const email = window.Auth.user().email;
    const { error } = await window._supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    const hint = document.querySelector("#settings-account .settings-hint");
    if (error) {
      if (hint) { hint.textContent = "Error: " + error.message; hint.style.color = "#fca5a5"; }
    } else {
      if (hint) { hint.textContent = "Reset link sent to " + email + "!"; hint.style.color = "#86efac"; }
      setTimeout(() => { if (hint) { hint.textContent = "We'll send a reset link to your email."; hint.style.color = ""; } }, 4000);
    }
  }

  // ─── Delete account (3 confirmations) ──────
  let _deleteStep = 0;

  function startDeleteAccount() {
    _deleteStep = 1;
    _showDeleteModal(
      "Delete Account — Step 1 of 3",
      "This will permanently delete your account and all progress.",
      'Type DELETE to continue',
      "DELETE"
    );
  }

  function _showDeleteModal(title, msg, placeholder, expected) {
    document.getElementById("deleteConfirmTitle").textContent = title;
    document.getElementById("deleteConfirmMsg").textContent = msg;
    const input = document.getElementById("deleteConfirmInput");
    input.placeholder = placeholder;
    input.value = "";
    input.dataset.expected = expected;
    document.getElementById("deleteConfirmOverlay")?.classList.remove("hidden");
    document.getElementById("deleteConfirmModal")?.classList.remove("hidden");
    setTimeout(() => input.focus(), 50);
  }

  function _hideDeleteModal() {
    document.getElementById("deleteConfirmOverlay")?.classList.add("hidden");
    document.getElementById("deleteConfirmModal")?.classList.add("hidden");
  }

  function cancelDelete() {
    _deleteStep = 0;
    _hideDeleteModal();
  }

  function confirmDeleteStep() {
    const input = document.getElementById("deleteConfirmInput");
    const expected = input.dataset.expected || "";
    const val = (input.value || "").trim();

    if (val !== expected) {
      input.style.borderColor = "#ef4444";
      setTimeout(() => { input.style.borderColor = ""; }, 1500);
      return;
    }

    if (_deleteStep === 1) {
      _deleteStep = 2;
      const email = (window.Auth && window.Auth.user()) ? window.Auth.user().email : "";
      _showDeleteModal(
        "Delete Account — Step 2 of 3",
        "Type your email address to confirm you own this account.",
        "Your email address",
        email
      );
    } else if (_deleteStep === 2) {
      _deleteStep = 3;
      _showDeleteModal(
        "Delete Account — Step 3 of 3",
        "Final confirmation. This CANNOT be undone. All XP, badges, and progress will be lost forever.",
        'Type GOODBYE to permanently delete',
        "GOODBYE"
      );
    } else if (_deleteStep === 3) {
      _executeDelete();
    }
  }

  async function _executeDelete() {
    _hideDeleteModal();
    _deleteStep = 0;
    try {
      if (window._supabase && window.Auth && window.Auth.user()) {
        const userId = window.Auth.user().id;
        // Delete all user data (RLS allows user to delete own rows)
        await Promise.all([
          window._supabase.from("user_progress").delete().eq("user_id", userId),
          window._supabase.from("user_badges").delete().eq("user_id", userId),
          window._supabase.from("user_exercises").delete().eq("user_id", userId),
          window._supabase.from("user_quiz_answers").delete().eq("user_id", userId),
          window._supabase.from("profiles").delete().eq("id", userId),
        ]);
        // Delete auth user (requires calling Supabase admin or user's own delete)
        await window._supabase.auth.signOut();
        // Clear all local data
        Object.keys(localStorage).filter(k => k.startsWith("py30_")).forEach(k => localStorage.removeItem(k));
        // Redirect to landing
        window.location.hash = "";
        window.location.reload();
      }
    } catch (err) {
      console.error("[Settings] delete account error:", err);
      alert("Account deletion failed. Please try again or contact support.");
    }
  }

  // Apply saved preferences on load
  function applyOnLoad() {
    const font = localStorage.getItem("py30_font") || "dm-sans";
    setFont(font); // ensures Roboto loads if saved

    const reduceMotion = localStorage.getItem("py30_reduce_motion") === "true";
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
  }

  return {
    setTheme, setFont, setSize, setReduceMotion,
    setTabSize, setLineNumbers, setEditorFontSize, setNotification,
    sendPasswordReset, startDeleteAccount, confirmDeleteStep, cancelDelete,
    applyOnLoad,
  };
})();

window.Settings = Settings;

// ─── Escape-key handler for Settings & Delete-Confirm modals ────
// Delete-confirm sits ABOVE settings (z-index 4001 vs 3001), so when both
// are open Escape should close the popup first, leaving Settings visible.
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const deleteModal = document.getElementById("deleteConfirmModal");
  if (deleteModal && !deleteModal.classList.contains("hidden")) {
    Settings.cancelDelete();
    return;
  }
  const settingsModal = document.getElementById("settingsModal");
  if (settingsModal && !settingsModal.classList.contains("hidden")) {
    SettingsPanel.close();
  }
});

// ─── LangSwitcher (DeepL) ────────────────────
const LangSwitcher = (() => {
  let _cache = {};          // { "ZH:elementId": translatedText }
  let _originals = null;    // saved original text nodes before first translation
  let _currentLang = "EN";

  function _getKey() {
    return localStorage.getItem("py30_deepl_key") || "";
  }

  function saveKey() {
    const input = document.getElementById("deeplKeyInput");
    const key = (input ? input.value : "").trim();
    if (key.length < 10) return;
    localStorage.setItem("py30_deepl_key", key);
    document.getElementById("deeplKeyRow")?.classList.add("hidden");
    // Retry the pending switch
    if (_currentLang !== "EN") _doTranslate(_currentLang);
  }

  async function switchLang(langCode) {
    _currentLang = langCode;
    localStorage.setItem("py30_lang", langCode);

    if (langCode === "EN") {
      _restoreOriginals();
      return;
    }

    const key = _getKey();
    if (!key) {
      document.getElementById("deeplKeyRow")?.classList.remove("hidden");
      return;
    }

    document.getElementById("deeplKeyRow")?.classList.add("hidden");
    await _doTranslate(langCode);
  }

  function _saveOriginals() {
    if (_originals) return; // already saved
    _originals = {};
    const nodes = _collectTranslatableNodes();
    nodes.forEach((node, i) => {
      node.dataset.origIdx = i;
      _originals[i] = node.textContent;
    });
  }

  function _restoreOriginals() {
    if (!_originals) return;
    const nodes = _collectTranslatableNodes();
    nodes.forEach(node => {
      const idx = node.dataset.origIdx;
      if (idx !== undefined && _originals[idx] !== undefined) {
        node.textContent = _originals[idx];
      }
    });
  }

  function _collectTranslatableNodes() {
    // Collect text-bearing elements that are NOT code blocks
    const selectors = [
      ".landing-nav a", ".landing-cta-btn", ".landing-eyebrow",
      ".landing-title", ".landing-subtitle", ".landing-btn-primary", ".landing-btn-secondary",
      ".landing-stat-label", ".landing-feature-title", ".landing-feature-desc",
      ".landing-about-label", ".landing-about-headline", ".landing-about-body",
      ".landing-section-label", ".landing-section-title", ".landing-section-sub",
      ".landing-footer-tagline",
      ".topbar-icon-btn", ".tutor-btn", ".complete-btn",
      ".lesson-tab", ".tab-btn",
      ".day-nav-item span",
      "#contentWrap h2", "#contentWrap h3", "#contentWrap p", "#contentWrap li",
      ".exercise-item", ".quiz-question", ".quiz-opt",
      ".badge-name", ".badge-desc",
      "h1", "h2", "h3",
    ];
    const results = [];
    const seen = new Set();
    selectors.forEach(sel => {
      try {
        document.querySelectorAll(sel).forEach(el => {
          // Skip code blocks and their children
          if (el.closest("pre") || el.closest("code") || el.closest("[translate='no']")) return;
          if (seen.has(el)) return;
          if (!el.textContent.trim()) return;
          // Only include leaf-ish nodes (not containers with many children)
          const directTextLen = Array.from(el.childNodes)
            .filter(n => n.nodeType === 3)
            .reduce((s, n) => s + n.textContent.trim().length, 0);
          if (directTextLen > 0 || el.children.length === 0) {
            seen.add(el);
            results.push(el);
          }
        });
      } catch (_) {}
    });
    return results;
  }

  async function _doTranslate(langCode) {
    const key = _getKey();
    if (!key) return;

    _saveOriginals();

    const nodes = _collectTranslatableNodes();
    const texts = nodes.map(n => n.textContent.trim()).filter(t => t.length > 0);

    if (!texts.length) return;

    // Check cache
    const cacheKey = langCode;
    if (_cache[cacheKey]) {
      _applyTranslations(nodes, _cache[cacheKey]);
      _runLayoutCheck();
      return;
    }

    // Batch translate (DeepL allows up to 50 texts per request)
    const batchSize = 50;
    const allTranslated = [];
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      try {
        const params = new URLSearchParams();
        batch.forEach(t => params.append("text", t));
        params.append("target_lang", langCode);
        params.append("source_lang", "EN");

        const resp = await fetch("https://api-free.deepl.com/v2/translate", {
          method: "POST",
          headers: {
            "Authorization": "DeepL-Auth-Key " + key,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        if (!resp.ok) {
          const errBody = await resp.json().catch(() => ({}));
          console.warn("[LangSwitcher] DeepL error:", resp.status, errBody);
          if (resp.status === 403) {
            localStorage.removeItem("py30_deepl_key");
            document.getElementById("deeplKeyRow")?.classList.remove("hidden");
          }
          return;
        }

        const data = await resp.json();
        data.translations.forEach(t => allTranslated.push(t.text));
      } catch (err) {
        console.warn("[LangSwitcher] fetch error:", err && err.message);
        return;
      }
    }

    _cache[cacheKey] = allTranslated;
    _applyTranslations(nodes, allTranslated);
    _runLayoutCheck();
  }

  function _applyTranslations(nodes, translations) {
    let ti = 0;
    nodes.forEach(node => {
      if (!node.textContent.trim()) return;
      if (ti < translations.length) {
        node.textContent = translations[ti++];
      }
    });
  }

  function _runLayoutCheck() {
    // Check for overflowing elements and reduce font size if needed
    const checkSelectors = [".day-nav-item", ".topbar-icon-btn", ".complete-btn", ".tutor-btn"];
    checkSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.scrollWidth > el.offsetWidth + 4) {
          el.style.fontSize = "0.82em";
          console.warn("[LangSwitcher] overflow detected, font reduced:", el.textContent.trim().slice(0, 30));
        }
      });
    });
  }

  // Restore saved language on load
  function applyOnLoad() {
    const saved = localStorage.getItem("py30_lang") || "EN";
    const select = document.getElementById("avatarLangSelect");
    if (select) select.value = saved;
    if (saved !== "EN") switchLang(saved);
  }

  return { switch: switchLang, saveKey, applyOnLoad };
})();

window.LangSwitcher = LangSwitcher;

// ─── Bootstrap on DOM ready ───────────────────
document.addEventListener("DOMContentLoaded", () => {
  Settings.applyOnLoad();
  LangSwitcher.applyOnLoad();

  // Close settings with Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      SettingsPanel.close();
      Settings.cancelDelete();
    }
  });
});
