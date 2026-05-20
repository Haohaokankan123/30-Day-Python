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
    // Reset back to error styling (previous success message may have overridden)
    el.style.background = "";
    el.style.borderColor = "";
    el.style.color = "";
    el.textContent = msg;
    el.classList.remove("hidden");
  }

  function _clearError() {
    const el = document.getElementById("authErrorMsg");
    if (el) {
      el.textContent = "";
      el.classList.add("hidden");
      el.style.background = "";
      el.style.borderColor = "";
      el.style.color = "";
    }
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

  // ─── View switch (signup / login / forgot) ───
  // The modal has three states. Most of the time we toggle between
  // 'signup' and 'login' via the tabs. 'forgot' is a separate view
  // that hides the tabs and shows a single email field.
  function _switchTab(tab) {
    _currentTab = tab;
    _clearError();
    _resetSignupLockUI();
    _showLoginView();

    const signupTab = document.getElementById("authTabSignup");
    const loginTab  = document.getElementById("authTabLogin");
    const submitBtn = document.getElementById("authSubmitBtn");
    const title     = document.getElementById("authModalTitle");
    const switchP   = document.querySelector(".auth-switch");
    const forgotLink = document.getElementById("authForgotLink");

    if (tab === "signup") {
      signupTab?.classList.add("active");
      loginTab?.classList.remove("active");
      if (submitBtn) submitBtn.textContent = "Create Account";
      if (title) title.textContent = "Create your account";
      if (switchP) switchP.innerHTML = 'Already have an account? <a id="authSwitchLink" href="#" onclick="Auth._switchTab(\'login\'); return false;">Log in</a>';
      if (forgotLink) forgotLink.classList.add("hidden");
    } else {
      loginTab?.classList.add("active");
      signupTab?.classList.remove("active");
      if (submitBtn) submitBtn.textContent = "Log In";
      if (title) title.textContent = "Welcome back";
      if (switchP) switchP.innerHTML = 'Don\'t have an account? <a id="authSwitchLink" href="#" onclick="Auth._switchTab(\'signup\'); return false;">Sign up</a>';
      if (forgotLink) forgotLink.classList.remove("hidden");
    }
  }

  // Show/hide the standard login view vs the forgot-password view
  function _showLoginView() {
    document.getElementById("authLoginView")?.classList.remove("hidden");
    document.getElementById("authForgotView")?.classList.add("hidden");
  }
  function _showForgotView() {
    document.getElementById("authLoginView")?.classList.add("hidden");
    document.getElementById("authForgotView")?.classList.remove("hidden");
    _clearError();
    setTimeout(() => document.getElementById("authForgotEmailInput")?.focus(), 50);
  }

  // Reset the form back to enabled state (after a previous pending signup)
  function _resetSignupLockUI() {
    const em = document.getElementById("authEmailInput");
    const pw = document.getElementById("authPasswordInput");
    const btn = document.getElementById("authSubmitBtn");
    const resend = document.getElementById("authResendLink");
    if (em) em.disabled = false;
    if (pw) pw.disabled = false;
    if (btn) btn.disabled = false;
    if (resend) resend.classList.add("hidden");
  }

  function _showSuccess(text) {
    const errEl = document.getElementById("authErrorMsg");
    if (!errEl) return;
    errEl.style.background = "rgba(62,207,142,0.12)";
    errEl.style.borderColor = "rgba(62,207,142,0.3)";
    errEl.style.color = "#86efac";
    errEl.textContent = text;
    errEl.classList.remove("hidden");
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
        const { data, error } = await _sb.auth.signUp({ email, password });
        if (error) { _showError(error.message); return; }

        // Supabase returns an empty `identities` array when the email already exists.
        // This is the documented way to detect a duplicate signup without leaking which
        // emails are registered.
        const isDuplicate = Array.isArray(data?.user?.identities) && data.user.identities.length === 0;
        if (isDuplicate) {
          _showError("An account with that email already exists. Try logging in, or use Forgot Password.");
          return;
        }

        // Real new signup — show success, lock the form, expose Resend link
        _pendingSignupEmail = email;
        _showSuccess("Check your email to confirm your account! You won't be able to log in until you confirm.");
        const em = document.getElementById("authEmailInput");
        const pw = document.getElementById("authPasswordInput");
        const btn = document.getElementById("authSubmitBtn");
        const resend = document.getElementById("authResendLink");
        if (em) em.disabled = true;
        if (pw) pw.disabled = true;
        if (btn) btn.disabled = true;
        if (resend) resend.classList.remove("hidden");
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

  // ─── Resend confirmation email ────────────
  let _pendingSignupEmail = null;
  async function _resendConfirmation() {
    if (!_pendingSignupEmail) return;
    const link = document.getElementById("authResendLink");
    if (link) { link.textContent = "Sending…"; link.style.pointerEvents = "none"; }
    try {
      const { error } = await _sb.auth.resend({ type: "signup", email: _pendingSignupEmail });
      if (error) {
        _showError(error.message);
      } else {
        _showSuccess("Confirmation email sent again. Check your inbox.");
      }
    } catch (e) {
      _showError(e.message || "Could not resend. Try again later.");
    } finally {
      if (link) { link.textContent = "Resend confirmation email"; link.style.pointerEvents = ""; }
    }
  }

  // ─── Forgot password flow ─────────────────
  function showForgotPassword() {
    _clearError();
    const title = document.getElementById("authModalTitle");
    if (title) title.textContent = "Reset your password";
    _showForgotView();
  }

  async function _submitForgot() {
    _clearError();
    const email = (document.getElementById("authForgotEmailInput")?.value || "").trim();
    if (!email) { _showError("Please enter your email."); return; }

    const btn = document.getElementById("authForgotSubmitBtn");
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    try {
      const { error } = await _sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password.html",
      });
      if (error) { _showError(error.message); return; }
      _showSuccess("If that email is registered, we've sent a reset link. Check your inbox.");
    } catch (e) {
      _showError(e.message || "Something went wrong. Try again.");
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = "Send reset link"; }
    }
  }

  // Used by reset-password.html
  async function updatePassword(newPassword) {
    return await _sb.auth.updateUser({ password: newPassword });
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
  // Listen for auth state changes (handles OAuth redirect automatically).
  // PASSWORD_RECOVERY fires when the user lands from a reset email; reset-password.html
  // reads this event itself, but on the main site we just ignore it (no UI here).
  _sb.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") return;
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
    const fe = document.getElementById("authForgotEmailInput");
    if (fe) fe.addEventListener("keydown", e => { if (e.key === "Enter") _submitForgot(); });
  });

  return {
    user, signUp, signIn, signInGoogle, signOut, onChange, getSession,
    showModal, hideModal, _switchTab, _submit,
    showForgotPassword, _submitForgot, _resendConfirmation, updatePassword,
  };
})();

window.Auth = Auth;
