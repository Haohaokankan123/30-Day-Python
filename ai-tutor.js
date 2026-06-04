/* =============================================
   AI TUTOR — Groq llama-3.3-70b-versatile
   Browser → /api/chat (Vercel serverless)
   Chat history sidebar with Supabase persistence
   ============================================= */

const AITutor = (() => {
  let useCodeContext = false;
  let thinkMode = false;
  let history = [];
  let currentAssistantEl = null;
  let isGenerating = false;

  // ─── Session state ─────────────────────────────
  let _sessionId   = null;  // active chat session UUID
  let _sidebarOpen = false;
  let _sessions    = [];    // cached list for sidebar

  // ─── Tiny markdown renderer ───────────────────
  function renderMarkdown(text) {
    const lines = text.split("\n");
    const out = [];
    let inFence = false, fenceLang = "", fenceLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const fenceMatch = line.match(/^```(\w*)$/);
      if (fenceMatch && !inFence) {
        inFence = true; fenceLang = fenceMatch[1] || ""; fenceLines = []; continue;
      }
      if (line.trim() === "```" && inFence) {
        const code = escHtml(fenceLines.join("\n"));
        const lang = escHtml(fenceLang) || "code";
        out.push(`<pre class="tutor-code-block"><span class="tutor-code-lang">${lang}</span><code>${code}</code></pre>`);
        inFence = false; fenceLang = ""; fenceLines = []; continue;
      }
      if (inFence) { fenceLines.push(line); continue; }
      let l = escHtml(line);
      l = l.replace(/`([^`]+)`/g, '<code class="tutor-inline-code">$1</code>');
      l = l.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      l = l.replace(/\*(.+?)\*/g, "<em>$1</em>");
      out.push(l);
    }
    if (inFence && fenceLines.length) {
      const code = escHtml(fenceLines.join("\n"));
      const lang = escHtml(fenceLang) || "code";
      out.push(`<pre class="tutor-code-block"><span class="tutor-code-lang">${lang}</span><code>${code}</code></pre>`);
    }
    return groupIntoParagraphs(out);
  }

  function escHtml(s) {
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function groupIntoParagraphs(lines) {
    const result = []; let para = [];
    const flush = () => {
      if (para.length) { const j = para.join("<br>"); if (j.trim()) result.push(`<p>${j}</p>`); para = []; }
    };
    for (const line of lines) {
      if (line.startsWith("<pre")) { flush(); result.push(line); }
      else if (line.trim() === "") { flush(); }
      else { para.push(line); }
    }
    flush();
    return result.join("\n");
  }

  // ─── DOM helpers ──────────────────────────────
  function setStatus(text) {
    const el = document.getElementById("tutorStatus");
    if (el) el.textContent = text;
  }
  function chatEl() { return document.getElementById("tutorChat"); }

  function appendUserBubble(text) {
    const div = document.createElement("div");
    div.className = "tutor-msg user";
    div.textContent = text;
    chatEl().appendChild(div);
    chatEl().scrollTop = chatEl().scrollHeight;
  }

  function startAssistantBubble() {
    const div = document.createElement("div");
    div.className = "tutor-msg assistant streaming";
    chatEl().appendChild(div);
    chatEl().scrollTop = chatEl().scrollHeight;
    currentAssistantEl = div;
    currentAssistantEl._rawText = "";
  }

  function appendToken(text) {
    if (!currentAssistantEl) startAssistantBubble();
    currentAssistantEl._rawText += text;
    currentAssistantEl.innerHTML = renderMarkdown(currentAssistantEl._rawText);
    chatEl().scrollTop = chatEl().scrollHeight;
  }

  async function finalizeAssistantBubble() {
    if (currentAssistantEl) {
      const finalText = currentAssistantEl._rawText || currentAssistantEl.textContent;
      currentAssistantEl.innerHTML = renderMarkdown(finalText);
      currentAssistantEl.classList.remove("streaming");
      history.push({ role: "assistant", content: finalText });
      currentAssistantEl = null;
      await saveMessage("assistant", finalText);
    }
  }

  // ─── Auth helpers ──────────────────────────────
  function getUserId() {
    if (window.Auth && typeof window.Auth.user === "function") {
      const u = window.Auth.user();
      return u ? u.id : null;
    }
    return null;
  }

  function sb() { return window._supabase || null; }

  // ─── ID generation ─────────────────────────────
  function generateId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // ─── localStorage fallback ─────────────────────
  const LS_KEY = "py30_tutor_chats";

  function lsGetSessions() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
  }
  function lsSaveSessions(sessions) {
    localStorage.setItem(LS_KEY, JSON.stringify(sessions));
  }
  function lsUpsertSession(sess) {
    const sessions = lsGetSessions();
    const idx = sessions.findIndex(s => s.id === sess.id);
    if (idx >= 0) sessions[idx] = { ...sessions[idx], ...sess };
    else sessions.unshift(sess);
    lsSaveSessions(sessions);
  }
  function lsDeleteSession(id) {
    lsSaveSessions(lsGetSessions().filter(s => s.id !== id));
    const msgs = JSON.parse(localStorage.getItem(LS_KEY + "_msgs") || "{}");
    delete msgs[id];
    localStorage.setItem(LS_KEY + "_msgs", JSON.stringify(msgs));
  }
  function lsAddMessage(sessionId, role, content) {
    const all = JSON.parse(localStorage.getItem(LS_KEY + "_msgs") || "{}");
    if (!all[sessionId]) all[sessionId] = [];
    all[sessionId].push({ id: generateId(), session_id: sessionId, role, content, created_at: new Date().toISOString() });
    localStorage.setItem(LS_KEY + "_msgs", JSON.stringify(all));
  }
  function lsGetMessages(sessionId) {
    const all = JSON.parse(localStorage.getItem(LS_KEY + "_msgs") || "{}");
    return all[sessionId] || [];
  }

  // ─── Session management ───────────────────────
  async function ensureSession(firstUserMessage) {
    if (_sessionId) return _sessionId;
    const id    = generateId();
    const title = firstUserMessage.slice(0, 50) || "New chat";
    const now   = new Date().toISOString();
    _sessionId  = id;

    lsUpsertSession({ id, title, created_at: now, updated_at: now });

    const uid = getUserId();
    if (uid && sb()) {
      try {
        await sb().from("ai_chat_sessions").upsert(
          { id, user_id: uid, title, created_at: now, updated_at: now },
          { onConflict: "id" }
        );
      } catch (e) { console.warn("[AITutor] session create failed:", e.message); }
    }

    renderSidebar();
    return id;
  }

  async function saveMessage(role, content) {
    if (!_sessionId) return;
    const uid = getUserId();
    lsAddMessage(_sessionId, role, content);

    if (uid && sb()) {
      try {
        const msgId = generateId();
        const now   = new Date().toISOString();
        await sb().from("ai_chat_messages").insert({
          id: msgId, session_id: _sessionId, user_id: uid,
          role, content, created_at: now,
        });
        await sb().from("ai_chat_sessions").update({ updated_at: now })
          .eq("id", _sessionId).eq("user_id", uid);
      } catch (e) { console.warn("[AITutor] save message failed:", e.message); }
    }
  }

  async function loadSessions() {
    const uid = getUserId();
    if (uid && sb()) {
      try {
        const { data } = await sb()
          .from("ai_chat_sessions")
          .select("id,title,created_at,updated_at")
          .eq("user_id", uid)
          .order("updated_at", { ascending: false })
          .limit(50);
        if (data) {
          _sessions = data;
          renderSidebar();
          return;
        }
      } catch (e) { console.warn("[AITutor] load sessions failed:", e.message); }
    }
    _sessions = lsGetSessions();
    renderSidebar();
  }

  async function loadSession(id) {
    const uid = getUserId();
    let messages = [];

    if (uid && sb()) {
      try {
        const { data } = await sb()
          .from("ai_chat_messages")
          .select("role,content,created_at")
          .eq("session_id", id)
          .eq("user_id", uid)
          .order("created_at", { ascending: true });
        if (data) messages = data;
      } catch (e) { console.warn("[AITutor] load messages failed:", e.message); }
    }

    if (!messages.length) messages = lsGetMessages(id);

    _sessionId = id;
    history = [];
    const chat = chatEl();
    if (chat) chat.innerHTML = "";

    for (const msg of messages) {
      history.push({ role: msg.role, content: msg.content });
      if (msg.role === "user") {
        appendUserBubble(msg.content);
      } else {
        const div = document.createElement("div");
        div.className = "tutor-msg assistant";
        div.innerHTML = renderMarkdown(msg.content);
        chat.appendChild(div);
      }
    }
    if (chat) chat.scrollTop = chat.scrollHeight;
    setStatus("Session loaded. Continue the conversation!");
    renderSidebar();
  }

  async function deleteSession(id) {
    const uid = getUserId();
    lsDeleteSession(id);

    if (uid && sb()) {
      try {
        await sb().from("ai_chat_messages").delete().eq("session_id", id).eq("user_id", uid);
        await sb().from("ai_chat_sessions").delete().eq("id", id).eq("user_id", uid);
      } catch (e) { console.warn("[AITutor] delete session failed:", e.message); }
    }

    if (_sessionId === id) {
      _sessionId = null;
      history = [];
      const chat = chatEl();
      if (chat) chat.innerHTML = "";
      setStatus("Ready. Ask anything about Python!");
    }
    await loadSessions();
  }

  // ─── Sidebar render ────────────────────────────
  function formatDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}d ago`;
    return d.toLocaleDateString();
  }

  function renderSidebar() {
    const list = document.getElementById("tutorSessionList");
    if (!list) return;
    if (!_sessions.length) {
      list.innerHTML = `<div style="padding:12px 10px;font-size:11px;color:var(--text-3);opacity:0.5;">No chats yet</div>`;
      return;
    }
    list.innerHTML = _sessions.map(s => `
      <div class="tutor-session-item${s.id === _sessionId ? " active" : ""}"
           onclick="AITutor.loadSession('${s.id}')">
        <div class="tutor-session-title">${escHtml(s.title || "Untitled")}</div>
        <div class="tutor-session-date">${formatDate(s.updated_at || s.created_at)}</div>
        <button class="tutor-session-delete" title="Delete"
                onclick="event.stopPropagation(); AITutor.deleteSession('${s.id}')">✕</button>
      </div>`).join("");
  }

  // ─── Sidebar toggle ────────────────────────────
  function toggleSidebar() {
    _sidebarOpen = !_sidebarOpen;
    const sidebar = document.getElementById("tutorSidebar");
    const toggle  = document.getElementById("tutorSidebarToggle");
    if (sidebar) sidebar.classList.toggle("open", _sidebarOpen);
    if (toggle)  toggle.classList.toggle("active", _sidebarOpen);
    if (_sidebarOpen) loadSessions();
  }

  // ─── New chat ──────────────────────────────────
  async function newChat() {
    _sessionId = null;
    history    = [];
    const chat = chatEl();
    if (chat) chat.innerHTML = "";
    setStatus("Ready. Ask anything about Python!");
    renderSidebar();
  }

  // ─── Show tutor body ───────────────────────────
  function showTutorBody() {
    const body = document.getElementById("tutorBody");
    if (body) body.classList.add("visible");
  }

  // ─── Send message ─────────────────────────────
  async function send() {
    if (isGenerating) return;
    const ta = document.getElementById("tutorTextarea");
    if (!ta) return;
    const userText = ta.value.trim();
    if (!userText) return;

    let code = "";
    if (useCodeContext) {
      if (window.FloatingPlayground) code = (window.FloatingPlayground.getCode() || "").trim();
      if (!code && window.Playground) code = (window.Playground.getCode() || "").trim();
      if (code === "# Type your Python here!\nprint('Hello, Python!')") code = "";
    }

    let fullPrompt = code
      ? `Here is my current Python code:\n\`\`\`python\n${code}\n\`\`\`\n\nMy question: ${userText}`
      : userText;
    if (thinkMode) {
      fullPrompt = `Please think step by step and give a thorough, detailed explanation.\n\n${fullPrompt}`;
    }

    // Ensure session exists (creates one named after first message)
    await ensureSession(userText);

    appendUserBubble(userText + (code ? "  📎" : ""));
    history.push({ role: "user", content: fullPrompt });
    await saveMessage("user", userText);
    ta.value = "";

    // Update session list order
    const sess = _sessions.find(s => s.id === _sessionId);
    if (sess) { sess.updated_at = new Date().toISOString(); _sessions.sort((a,b) => b.updated_at > a.updated_at ? 1 : -1); }
    renderSidebar();

    autoResize(ta);
    isGenerating = true;
    setStatus("Thinking…");
    const btn = document.getElementById("tutorSendBtn");
    if (btn) { btn.disabled = true; btn.classList.add("loading"); btn.classList.remove("has-text"); }

    startAssistantBubble();

    const messages = history.slice(-20);
    const userId   = getUserId();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, userId }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        if (currentAssistantEl && !currentAssistantEl._rawText) {
          chatEl().removeChild(currentAssistantEl);
          currentAssistantEl = null;
        } else {
          await finalizeAssistantBubble();
        }
        if (response.status === 429) {
          appendToken(err.message || "You've reached your 20 free messages for today. Come back tomorrow!");
          await finalizeAssistantBubble();
          setStatus("Daily limit reached.");
        } else {
          appendToken(`Error: ${err.error || "Something went wrong. Try again."}`);
          await finalizeAssistantBubble();
          setStatus("Error. Try again.");
        }
        return;
      }

      const reader  = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const jsonStr = trimmed.slice(6).trim();
          if (!jsonStr || jsonStr === "[DONE]") continue;
          try {
            const json  = JSON.parse(jsonStr);
            const token = json.choices?.[0]?.delta?.content;
            if (token) appendToken(token);
          } catch (_) {}
        }
      }

      await finalizeAssistantBubble();
      setStatus("Ready. Ask another question!");
    } catch (e) {
      appendToken("Network error: " + e.message);
      await finalizeAssistantBubble();
      setStatus("Network error. Check your connection.");
    } finally {
      isGenerating = false;
      if (btn) { btn.disabled = false; btn.classList.remove("loading"); }
      updateSendState();
    }
  }

  // ─── UI actions ───────────────────────────────
  function toggle() {
    const panel = document.getElementById("tutorPanel");
    const btn   = document.getElementById("tutorBtn");
    if (!panel) return;
    const isOpen = panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (btn) btn.classList.toggle("active", isOpen);
    if (isOpen) {
      showTutorBody();
      setStatus("Ready. Ask anything about Python!");
      loadSessions().then(() => {
        if (_sessions.length && !_sessionId) loadSession(_sessions[0].id);
      });
    }
    if (typeof syncPanelPositions === "function") syncPanelPositions();
  }

  function toggleContext() {
    useCodeContext = !useCodeContext;
    const btn = document.getElementById("tutorContextBtn");
    if (btn) btn.classList.toggle("active", useCodeContext);
  }

  function toggleThink() {
    thinkMode = !thinkMode;
    const btn = document.getElementById("tutorThinkBtn");
    if (btn) btn.classList.toggle("active", thinkMode);
  }

  // Reflect whether the textarea has text on the send button (bright vs dim)
  function updateSendState() {
    const ta  = document.getElementById("tutorTextarea");
    const btn = document.getElementById("tutorSendBtn");
    if (!ta || !btn) return;
    btn.classList.toggle("has-text", ta.value.trim().length > 0);
  }

  // Grow the textarea with content up to its CSS max-height
  function autoResize(ta) {
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }

  function clearHistory() { newChat(); }

  document.addEventListener("DOMContentLoaded", () => {
    const ta = document.getElementById("tutorTextarea");
    if (ta) {
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
      });
      ta.addEventListener("input", () => { autoResize(ta); updateSendState(); });
    }

    // Quick-prompt chips: fill the textarea (optionally enabling code context) and send
    const chips = document.getElementById("tutorChips");
    if (chips) {
      chips.addEventListener("click", (e) => {
        const chip = e.target.closest(".tutor-chip");
        if (!chip) return;
        const prompt = chip.getAttribute("data-prompt") || "";
        if (chip.getAttribute("data-usecode") === "1" && !useCodeContext) toggleContext();
        if (ta) { ta.value = prompt; autoResize(ta); updateSendState(); ta.focus(); }
        send();
      });
    }

    // Screenshot upload: acknowledge the file by naming it in the prompt
    const imgInput = document.getElementById("tutorImageInput");
    if (imgInput) {
      imgInput.addEventListener("change", () => {
        const f = imgInput.files && imgInput.files[0];
        if (!f || !ta) return;
        const note = `(I attached a screenshot: ${f.name}) `;
        ta.value = note + ta.value;
        autoResize(ta); updateSendState(); ta.focus();
        imgInput.value = "";
      });
    }
  });

  return {
    toggle, toggleContext, toggleThink, send, clearHistory,
    toggleSidebar, newChat, loadSession, deleteSession,
  };
})();

window.AITutor         = AITutor;
window.toggleTutor        = () => AITutor.toggle();
window.toggleTutorContext = () => AITutor.toggleContext();
window.sendTutorMessage   = () => AITutor.send();
window.clearTutorHistory  = () => AITutor.clearHistory();
