/* =============================================
   PRO.JS — Pro-tier state ($15 unlock for Days 4–30)
   Exposes window.Pro
   ============================================= */

(function () {
  let _isPro = false;
  let _checked = false;

  function sb() { return window._supabase || null; }
  function currentUser() {
    try { return window.Auth && window.Auth.user ? window.Auth.user() : null; }
    catch (_) { return null; }
  }

  function isPro() {
    // Not yet logged in / not yet checked → assume locked. The UI will refresh
    // when the pro:updated event fires after a check completes.
    return _isPro === true;
  }

  function isChecked() { return _checked; }

  async function refresh() {
    const user = currentUser();
    const client = sb();
    if (!user || !client) {
      _isPro = false;
      _checked = true;
      window.dispatchEvent(new CustomEvent("pro:updated"));
      return false;
    }
    try {
      const { data, error } = await client
        .from("pro_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        // RLS or network error — fail closed (no Pro)
        _isPro = false;
      } else {
        _isPro = !!data;
      }
    } catch (_) {
      _isPro = false;
    }
    _checked = true;
    window.dispatchEvent(new CustomEvent("pro:updated"));
    return _isPro;
  }

  async function unlock() {
    const client = sb();
    if (!client) {
      alert("Please sign in to unlock.");
      return;
    }
    const { data: sessionData } = await client.auth.getSession();
    const token = sessionData?.session?.access_token;
    if (!token) {
      // Open the auth modal so they can sign in/up first
      if (window.Auth && window.Auth.showModal) window.Auth.showModal();
      return;
    }

    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        alert("Could not start checkout: " + (err.error || r.statusText));
        return;
      }
      const { url } = await r.json();
      if (url) {
        window.location.href = url;
      } else {
        alert("Checkout URL missing from server response.");
      }
    } catch (e) {
      alert("Network error: " + e.message);
    }
  }

  function showPaidToast() {
    const toast = document.createElement("div");
    toast.className = "pro-toast";
    toast.innerHTML = "🎉 Payment successful! All 30 days are unlocked.";
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // Strip ?paid=1 / ?canceled=1 from the URL after handling
  function cleanUrlParams() {
    const u = new URL(window.location.href);
    u.searchParams.delete("paid");
    u.searchParams.delete("canceled");
    window.history.replaceState({}, "", u.pathname + u.search + u.hash);
  }

  // Initial bootstrap
  function init() {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get("paid") === "1";
    const canceled = params.get("canceled") === "1";

    if (paid) {
      // The webhook may take 1–3 seconds to write the row — retry refresh a few times.
      (async () => {
        for (let i = 0; i < 5; i++) {
          await refresh();
          if (_isPro) break;
          await new Promise(r => setTimeout(r, 1000));
        }
        if (_isPro) showPaidToast();
        cleanUrlParams();
      })();
    } else if (canceled) {
      cleanUrlParams();
    } else {
      refresh();
    }

    // Re-check whenever auth state changes (login / logout)
    if (window.Auth && window.Auth.onChange) {
      window.Auth.onChange(() => refresh());
    }
  }

  // Wait for Auth + Supabase to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.Pro = { isPro, isChecked, refresh, unlock };
})();
