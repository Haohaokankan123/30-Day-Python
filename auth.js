/* =============================================
   AUTH.JS — Supabase Auth for 30 Days of Python
   Email/password + Google OAuth
   ============================================= */

const SUPABASE_URL = "https://dwuqcrqiuwtudkujlxzz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dXFjcnFpdXd0dWRrdWpseHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNTQ2MDYsImV4cCI6MjA5NDYzMDYwNn0._iZ1aVmKhdyp2ImfluajnZabhikqQ5mCgsmLmWPxWuo";

// Initialize Supabase client — exposed as window._supabase for sync.js
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window._supabase = _sb;

const Auth = (() => {
  let _currentUser = null;
  let _currentTab = "signup";
  const _listeners = [];

  // ─── Internal helpers ─────────────────────
  function _setUser(user) {
    _currentUser = user;
    _updateHeaderBtn();
    _listeners.forEach(fn => { try { fn(user); } catch (_) {} });
  }

  function _showError(msg) {
    const el = document.getElementById("authErrorMsg");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
  }

  function _clearError() {
    const el = document.getElementById("authErrorMsg");
    if (el) { el.textContent = ""; el.classList.add("hidden"); }
  }

  function _setLoading(loading) {
    const btn = document.getElementById("authSubmitBtn");
    const gBtn = document.getElementById("authGoogleBtn");
    if (btn) { btn.disabled = loading; btn.textContent = loading ? "Please wait…" : (_currentTab === "signup" ? "Create Account" : "Log In"); }
    if (gBtn) gBtn.disabled = loading;
  }

  function _updateHeaderBtn() {
    // Drive the new bottom-left avatar (UserAvatar in settings.js)
    const wrap = document.getElementById("userAvatarWrap");
    const letterEl = document.getElementById("userAvatarLetter");
    const emailEl = document.getElementById("avatarPopupEmail");
    const settingsEmailEl = document.getElementById("settingsEmail");

    if (_currentUser) {
      const letter = (_currentUser.email || "U")[0].toUpperCase();
      if (wrap) wrap.classList.remove("hidden");
      if (letterEl) letterEl.textContent = letter;
      if (emailEl) emailEl.textContent = _currentUser.email || "";
      if (settingsEmailEl) settingsEmailEl.textContent = _currentUser.email || "";
    } else {
      if (wrap) wrap.classList.add("hidden");
    }
  }

  // ─── Modal open/close ─────────────────────
  function showModal() {
    document.getElementById("authModal")?.classList.remove("hidden");
    document.getElementById("authModalOverlay")?.classList.remove("hidden");
    _clearError();
    Auth._switchTab(_currentTab);
    setTimeout(() => document.getElementById("authEmailInput")?.focus(), 50);
  }

  function hideModal() {
    document.getElementById("authModal")?.classList.add("hidden");
    document.getElementById("authModalOverlay")?.classList.add("hidden");
    _clearError();
  }

  // ─── Tab switch ───────────────────────────
  function _switchTab(tab) {
    _currentTab = tab;
    _clearError();
    const signupTab = document.getElementById("authTabSignup");
    const loginTab  = document.getElementById("authTabLogin");
    const submitBtn = document.getElementById("authSubmitBtn");
    const title     = document.getElementById("authModalTitle");
    const switchLink = document.getElementById("authSwitchLink");
    const switchP    = document.querySelector(".auth-switch");

    if (tab === "signup") {
      signupTab?.classList.add("active");
      loginTab?.classList.remove("active");
      if (submitBtn) submitBtn.textContent = "Create Account";
      if (title) title.textContent = "Create your account";
      if (switchP) switchP.innerHTML = 'Already have an account? <a id="authSwitchLink" href="#" onclick="Auth._switchTab(\'login\'); return false;">Log in</a>';
    } else {
      loginTab?.classList.add("active");
      signupTab?.classList.remove("active");
      if (submitBtn) submitBtn.textContent = "Log In";
      if (title) title.textContent = "Welcome back";
      if (switchP) switchP.innerHTML = 'Don\'t have an account? <a id="authSwitchLink" href="#" onclick="Auth._switchTab(\'signup\'); return false;">Sign up</a>';
    }
  }

  // ─── Submit handler ───────────────────────
  async function _submit() {
    _clearError();
    const email = (document.getElementById("authEmailInput")?.value || "").trim();
    const password = (document.getElementById("authPasswordInput")?.value || "").trim();

    if (!email || !password) { _showError("Please enter your email and password."); return; }
    if (password.length < 8) { _showError("Password must be at least 8 characters."); return; }

    _setLoading(true);
    try {
      if (_currentTab === "signup") {
        const { error } = await _sb.auth.signUp({ email, password });
        if (error) { _showError(error.message); return; }
        _clearError();
        const errEl = document.getElementById("authErrorMsg");
        if (errEl) {
          errEl.style.background = "rgba(62,207,142,0.12)";
          errEl.style.borderColor = "rgba(62,207,142,0.3)";
          errEl.style.color = "#86efac";
          errEl.textContent = "Check your email to confirm your account!";
          errEl.classList.remove("hidden");
        }
      } else {
        const { data, error } = await _sb.auth.signInWithPassword({ email, password });
        if (error) { _showError(error.message); return; }
        _setUser(data.user);
        hideModal();
        if (window.Sync) window.Sync.pull();
      }
    } catch (e) {
      _showError(e.message || "Something went wrong. Try again.");
    } finally {
      _setLoading(false);
    }
  }

  // ─── Public methods ───────────────────────
  async function signUp(email, password) {
    const { error } = await _sb.auth.signUp({ email, password });
    return error;
  }

  async function signIn(email, password) {
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (!error) _setUser(data.user);
    return error;
  }

  async function signInGoogle() {
    await _sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + window.location.pathname },
    });
  }

  async function signOut() {
    await _sb.auth.signOut();
    _setUser(null);
  }

  function onChange(callback) {
    _listeners.push(callback);
  }

  async function getSession() {
    const { data } = await _sb.auth.getSession();
    return data.session;
  }

  function user() { return _currentUser; }

  // ─── Bootstrap ────────────────────────────
  // Listen for auth state changes (handles OAuth redirect automatically)
  _sb.auth.onAuthStateChange((event, session) => {
    const u = session?.user || null;
    _setUser(u);
    if (u && event === "SIGNED_IN" && window.Sync) {
      window.Sync.pull();
    }
  });

  // Restore session on page load
  _sb.auth.getSession().then(({ data }) => {
    if (data.session?.user) _setUser(data.session.user);
  });

  // Enter key on password field
  document.addEventListener("DOMContentLoaded", () => {
    const pw = document.getElementById("authPasswordInput");
    if (pw) pw.addEventListener("keydown", e => { if (e.key === "Enter") _submit(); });
    const em = document.getElementById("authEmailInput");
    if (em) em.addEventListener("keydown", e => { if (e.key === "Enter") _submit(); });
  });

  return { user, signUp, signIn, signInGoogle, signOut, onChange, getSession, showModal, hideModal, _switchTab, _submit };
})();

window.Auth = Auth;
