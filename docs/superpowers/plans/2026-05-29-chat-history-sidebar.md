# Chat History Sidebar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a toggleable chat history sidebar inside the AI Tutor panel that persists sessions to Supabase (or localStorage when logged out).

**Architecture:** The tutor panel becomes a flex row: a hidden-by-default `.tutor-sidebar` on the left and the existing `.tutor-chat-area` on the right. All session/message persistence lives in `ai-tutor.js` as async helpers using `window._supabase` with a graceful localStorage fallback. No new files needed — all changes are surgical edits to `index.html`, `style.css`, and `ai-tutor.js`.

**Tech Stack:** Vanilla HTML/CSS/JS, Supabase JS client (`window._supabase`), localStorage for fallback, `crypto.randomUUID()` for IDs.

---

## File Map

| File | Change |
|---|---|
| `index.html` lines 648–705 | Add sidebar toggle button in header, add `.tutor-sidebar` div, replace "Clear chat" with "New Chat" button |
| `style.css` after line 2694 | Add sidebar layout rules (`.tutor-sidebar`, `.tutor-session-item`, etc.) and update `.tutor-panel` flex direction |
| `ai-tutor.js` | Add `_sessionId`, `_sidebarOpen` state, `generateId`, `loadSessions`, `loadSession`, `saveMessage`, `newChat`, `deleteSession`, `toggleSidebar` functions; hook `send()` and `finalizeAssistantBubble()` and `toggle()` |

---

### Task 1: HTML — Add Sidebar Toggle Button and Sidebar Div

**Files:**
- Modify: `index.html` lines 648–705

- [ ] **Step 1: Read the exact current HTML block**

Read `index.html` lines 648–705 to confirm exact content before editing.

- [ ] **Step 2: Add sidebar toggle button to `.tutor-header`**

Inside `<header class="tutor-header">`, before `<h3>AI Tutor</h3>`, insert:

```html
<button
    class="tutor-sidebar-toggle"
    id="tutorSidebarToggle"
    onclick="AITutor.toggleSidebar()"
    title="Chat history"
>
    ☰
</button>
```

- [ ] **Step 3: Add `.tutor-sidebar` div before `.tutor-chat-area`**

After `</header>` and the `ai-warning-banner` div, before `<div class="tutor-chat-area" id="tutorChatArea">`, insert:

```html
<!-- Sidebar: chat session list -->
<div class="tutor-sidebar" id="tutorSidebar">
    <div class="tutor-sidebar-header">
        <span>Chats</span>
        <button id="tutorNewChat" onclick="AITutor.newChat()">+ New</button>
    </div>
    <div class="tutor-session-list" id="tutorSessionList"></div>
</div>
```

- [ ] **Step 4: Replace "Clear chat" button with "New Chat" button**

Replace:
```html
<button
    class="tutor-key-change-btn"
    onclick="clearTutorHistory()"
    title="Clear chat history"
>
    Clear chat
</button>
```

With:
```html
<button
    class="tutor-key-change-btn"
    onclick="AITutor.newChat()"
    title="New chat"
>
    New chat
</button>
```

- [ ] **Step 5: Verify HTML is valid by opening the file and scanning for unclosed tags**

Run:
```bash
node -e "const fs=require('fs'); const html=fs.readFileSync('index.html','utf8'); const opens=(html.match(/<div/g)||[]).length; const closes=(html.match(/<\/div>/g)||[]).length; console.log('div opens:',opens,'closes:',closes);"
```
Expected: opens and closes counts match (or differ by the same amount as before your edit — compare against a baseline count taken before starting).

---

### Task 2: CSS — Sidebar Layout Rules

**Files:**
- Modify: `style.css` (insert after the `.tutor-chat-area` block at line ~2694)

- [ ] **Step 1: Read the `.tutor-panel` and `.tutor-chat-area` blocks in style.css**

Read `style.css` lines 2218–2240 (`.tutor-panel`) and lines 2682–2695 (`.tutor-chat-area`) to confirm existing rules before inserting.

- [ ] **Step 2: Update `.tutor-panel` to use flex-row**

The `.tutor-panel` already has `display: flex; flex-direction: column`. We need the body below the header to be a flex row. We will NOT change `.tutor-panel` itself — the sidebar and chat-area both sit as siblings inside the panel, and the panel is already `flex-direction: column`. The sidebar+chat-area are wrapped in a new row using CSS. Insert a new rule that targets the sidebar+chat-area as a flex row:

Add this CSS block after the `.tutor-chat-area` block (after line ~2694):

```css
/* ─── TUTOR SIDEBAR ─────────────────────────── */
.tutor-sidebar {
    width: 0;
    overflow: hidden;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.25);
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 0;
}

.tutor-sidebar.open {
    width: 200px;
}

.tutor-sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
}

.tutor-sidebar-header span {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-2);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
}

.tutor-sidebar-header button {
    background: rgba(252, 212, 77, 0.12);
    border: 1px solid rgba(252, 212, 77, 0.25);
    color: var(--accent, #fcd44d);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s;
}

.tutor-sidebar-header button:hover {
    background: rgba(252, 212, 77, 0.22);
}

.tutor-session-list {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.tutor-session-item {
    padding: 10px 12px;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: flex-start;
    gap: 6px;
    transition: background 0.15s;
    min-width: 0;
}

.tutor-session-item:hover {
    background: rgba(255, 255, 255, 0.05);
}

.tutor-session-item.active {
    background: rgba(252, 212, 77, 0.08);
    border-left: 2px solid var(--accent, #fcd44d);
}

.tutor-session-item .session-info {
    flex: 1;
    min-width: 0;
    overflow: hidden;
}

.tutor-session-item .session-title {
    font-size: 12px;
    color: var(--text-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
}

.tutor-session-item .session-date {
    font-size: 10px;
    color: var(--text-3);
    margin-top: 2px;
    white-space: nowrap;
}

.tutor-session-item .session-delete {
    background: transparent;
    border: none;
    color: var(--text-3);
    font-size: 14px;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
}

.tutor-session-item:hover .session-delete {
    opacity: 1;
}

.tutor-session-item .session-delete:hover {
    color: #ff6b6b;
}

/* Sidebar toggle button in header */
.tutor-sidebar-toggle {
    background: transparent;
    border: none;
    color: var(--text-2);
    font-size: 16px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    line-height: 1;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
}

.tutor-sidebar-toggle:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-1);
}

/* Body area (sidebar + chat) as flex row */
.tutor-body {
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}
```

- [ ] **Step 3: Verify no CSS parse errors**

Run:
```bash
node -e "const fs=require('fs'); const css=fs.readFileSync('style.css','utf8'); const opens=(css.match(/\{/g)||[]).length; const closes=(css.match(/\}/g)||[]).length; console.log('opens:',opens,'closes:',closes, 'diff:',opens-closes);"
```
Expected: `diff: 0` (equal number of `{` and `}` braces).

---

### Task 3: HTML — Wrap Sidebar and Chat Area in `.tutor-body`

**Files:**
- Modify: `index.html` lines 648–705 (the section modified in Task 1)

This task depends on Task 1 and Task 2 being complete. We need to wrap the `.tutor-sidebar` and `.tutor-chat-area` in a `.tutor-body` div so the CSS flex-row rule from Task 2 takes effect.

- [ ] **Step 1: Read the current state of lines 648–720 in index.html**

Read `index.html` lines 648–720 to see the sidebar and chat area positions after Task 1.

- [ ] **Step 2: Wrap sidebar and chat-area in `.tutor-body`**

Add `<div class="tutor-body">` immediately after the `</div>` that closes `ai-warning-banner`, and `</div>` immediately before `</aside>` that closes `tutorPanel`.

The resulting structure will be:
```html
<aside class="tutor-panel" id="tutorPanel" aria-hidden="true">
    <div class="panel-resize-handle" ...></div>
    <header class="tutor-header">
        ...
    </header>
    <div class="ai-warning-banner hidden" id="aiWarningBanner">...</div>
    <div class="tutor-body">
        <div class="tutor-sidebar" id="tutorSidebar">
            ...
        </div>
        <div class="tutor-chat-area" id="tutorChatArea">
            ...
        </div>
    </div>
</aside>
```

---

### Task 4: JS — State Variables and Utility Functions

**Files:**
- Modify: `ai-tutor.js`

- [ ] **Step 1: Add `_sessionId`, `_sidebarOpen`, and `generateId` after the existing state variables**

In `ai-tutor.js`, after line 11 (`let isGenerating = false;`), insert:

```javascript
  let _sessionId = null;      // current session UUID or null
  let _sidebarOpen = false;   // sidebar visibility state

  // ─── ID generation ────────────────────────────
  function generateId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for older browsers
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
```

- [ ] **Step 2: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output (no errors).

---

### Task 5: JS — localStorage Helpers

**Files:**
- Modify: `ai-tutor.js`

These helpers read/write to `localStorage` as the fallback for logged-out users. They go right after the `generateId()` function.

- [ ] **Step 1: Insert localStorage helpers**

```javascript
  // ─── localStorage helpers (logged-out fallback) ─
  const LS_KEY = "py30_tutor_chats";

  function lsGetSessions() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }

  function lsSaveSessions(sessions) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(sessions));
    } catch (_) {}
  }

  function lsGetSession(id) {
    return lsGetSessions().find((s) => s.id === id) || null;
  }

  function lsUpsertSession(session) {
    const sessions = lsGetSessions();
    const idx = sessions.findIndex((s) => s.id === session.id);
    if (idx >= 0) {
      sessions[idx] = { ...sessions[idx], ...session };
    } else {
      sessions.unshift(session);
    }
    lsSaveSessions(sessions);
  }

  function lsDeleteSession(id) {
    const sessions = lsGetSessions().filter((s) => s.id !== id);
    lsSaveSessions(sessions);
  }

  function lsAddMessage(sessionId, message) {
    const sessions = lsGetSessions();
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;
    if (!session.messages) session.messages = [];
    session.messages.push(message);
    lsSaveSessions(sessions);
  }
```

- [ ] **Step 2: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 6: JS — `saveMessage` and `ensureSession`

**Files:**
- Modify: `ai-tutor.js`

These functions create/update a session and append a message. They handle both Supabase and localStorage paths.

- [ ] **Step 1: Insert `ensureSession` and `saveMessage` functions**

Insert after the localStorage helpers block:

```javascript
  // ─── Session persistence ──────────────────────
  async function ensureSession(titleHint) {
    if (_sessionId) return _sessionId;
    _sessionId = generateId();
    const userId = getUserId();
    const now = new Date().toISOString();
    const title = (titleHint || "New chat").slice(0, 40);

    if (userId && window._supabase) {
      try {
        await window._supabase.from("ai_chat_sessions").insert({
          id: _sessionId,
          user_id: userId,
          title,
          created_at: now,
          updated_at: now,
        });
      } catch (_) {
        // Table may not exist yet — fall through to localStorage
        lsUpsertSession({ id: _sessionId, title, created_at: now, updated_at: now, messages: [] });
      }
    } else {
      lsUpsertSession({ id: _sessionId, title, created_at: now, updated_at: now, messages: [] });
    }
    return _sessionId;
  }

  async function saveMessage(role, content) {
    const userId = getUserId();
    const sessionId = await ensureSession(role === "user" ? content : null);
    const now = new Date().toISOString();
    const msgId = generateId();

    // Update session's updated_at
    if (userId && window._supabase) {
      try {
        await window._supabase
          .from("ai_chat_sessions")
          .update({ updated_at: now })
          .eq("id", sessionId);

        await window._supabase.from("ai_chat_messages").insert({
          id: msgId,
          session_id: sessionId,
          user_id: userId,
          role,
          content,
          created_at: now,
        });
      } catch (_) {
        // Graceful fallback to localStorage
        lsAddMessage(sessionId, { id: msgId, role, content, created_at: now });
      }
    } else {
      lsAddMessage(sessionId, { id: msgId, role, content, created_at: now });
    }
  }
```

- [ ] **Step 2: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 7: JS — `loadSessions` and `renderSidebar`

**Files:**
- Modify: `ai-tutor.js`

- [ ] **Step 1: Insert `renderSidebar` and `loadSessions` functions**

Insert after the `saveMessage` block:

```javascript
  // ─── Sidebar rendering ────────────────────────
  function formatDate(isoStr) {
    const d = new Date(isoStr);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function renderSidebar(sessions) {
    const list = document.getElementById("tutorSessionList");
    if (!list) return;
    list.innerHTML = "";
    if (!sessions.length) {
      list.innerHTML = '<div style="padding:12px;font-size:11px;color:var(--text-3);text-align:center">No chats yet</div>';
      return;
    }
    for (const s of sessions) {
      const item = document.createElement("div");
      item.className = "tutor-session-item" + (s.id === _sessionId ? " active" : "");
      item.dataset.id = s.id;
      item.innerHTML = `
        <div class="session-info">
          <div class="session-title">${escHtml(s.title || "Untitled")}</div>
          <div class="session-date">${formatDate(s.created_at)}</div>
        </div>
        <button class="session-delete" title="Delete" onclick="event.stopPropagation(); AITutor.deleteSession('${s.id}')">×</button>
      `;
      item.addEventListener("click", () => AITutor.loadSession(s.id));
      list.appendChild(item);
    }
  }

  async function loadSessions() {
    const userId = getUserId();
    let sessions = [];

    if (userId && window._supabase) {
      try {
        const { data, error } = await window._supabase
          .from("ai_chat_sessions")
          .select("id, title, created_at, updated_at")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false })
          .limit(50);
        if (!error && data) sessions = data;
        else throw error;
      } catch (_) {
        sessions = lsGetSessions();
      }
    } else {
      sessions = lsGetSessions();
    }

    renderSidebar(sessions);
    return sessions;
  }
```

- [ ] **Step 2: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 8: JS — `loadSession` (switch to a different session)

**Files:**
- Modify: `ai-tutor.js`

- [ ] **Step 1: Insert `loadSession` function**

Insert after the `loadSessions` block:

```javascript
  async function loadSession(id) {
    if (isGenerating) return; // don't switch mid-stream
    const userId = getUserId();
    let messages = [];

    if (userId && window._supabase) {
      try {
        const { data, error } = await window._supabase
          .from("ai_chat_messages")
          .select("role, content, created_at")
          .eq("session_id", id)
          .order("created_at", { ascending: true });
        if (!error && data) messages = data;
        else throw error;
      } catch (_) {
        const s = lsGetSession(id);
        messages = s ? (s.messages || []) : [];
      }
    } else {
      const s = lsGetSession(id);
      messages = s ? (s.messages || []) : [];
    }

    // Set active session
    _sessionId = id;

    // Clear chat DOM
    const chat = chatEl();
    if (chat) chat.innerHTML = "";
    history = [];

    // Replay messages into DOM and history
    for (const msg of messages) {
      history.push({ role: msg.role, content: msg.content });
      if (msg.role === "user") {
        appendUserBubble(msg.content);
      } else {
        const div = document.createElement("div");
        div.className = "tutor-msg assistant";
        div.innerHTML = renderMarkdown(msg.content);
        chat.appendChild(div);
        if (chat) chat.scrollTop = chat.scrollHeight;
      }
    }

    // Update active state in sidebar
    document.querySelectorAll(".tutor-session-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.id === id);
    });

    setStatus("Session loaded. Ask anything!");
  }
```

- [ ] **Step 2: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 9: JS — `newChat`, `deleteSession`, `toggleSidebar`

**Files:**
- Modify: `ai-tutor.js`

- [ ] **Step 1: Insert `newChat`, `deleteSession`, and `toggleSidebar` functions**

Insert after the `loadSession` block:

```javascript
  async function newChat() {
    if (isGenerating) return;
    _sessionId = null;
    history = [];
    const chat = chatEl();
    if (chat) chat.innerHTML = "";
    setStatus("New chat started. Ask anything about Python!");
    // Deselect any active item in sidebar
    document.querySelectorAll(".tutor-session-item").forEach((el) => {
      el.classList.remove("active");
    });
  }

  async function deleteSession(id) {
    const userId = getUserId();
    if (userId && window._supabase) {
      try {
        await window._supabase.from("ai_chat_messages").delete().eq("session_id", id);
        await window._supabase.from("ai_chat_sessions").delete().eq("id", id);
      } catch (_) {
        lsDeleteSession(id);
      }
    } else {
      lsDeleteSession(id);
    }
    // If we deleted the current session, start fresh
    if (_sessionId === id) {
      await newChat();
    }
    await loadSessions();
  }

  function toggleSidebar() {
    const sidebar = document.getElementById("tutorSidebar");
    if (!sidebar) return;
    _sidebarOpen = !_sidebarOpen;
    sidebar.classList.toggle("open", _sidebarOpen);
    if (_sidebarOpen) {
      loadSessions();
    }
  }
```

- [ ] **Step 2: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 10: JS — Hook `send()` to Save User Messages

**Files:**
- Modify: `ai-tutor.js` lines 162–261 (the `send` function)

- [ ] **Step 1: Read lines 162–200 of ai-tutor.js to confirm the current state**

Read `ai-tutor.js` lines 162–200 to confirm the exact line where `history.push({ role: "user", content: fullPrompt })` appears.

- [ ] **Step 2: Add `saveMessage("user", userText)` after the history.push in `send()`**

Find this block in `send()`:
```javascript
    appendUserBubble(userText + (code ? "  📎" : ""));
    history.push({ role: "user", content: fullPrompt });
    ta.value = "";
```

Replace it with:
```javascript
    appendUserBubble(userText + (code ? "  📎" : ""));
    history.push({ role: "user", content: fullPrompt });
    ta.value = "";
    saveMessage("user", userText); // save display text (not code-injected)
```

- [ ] **Step 3: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 11: JS — Hook `finalizeAssistantBubble()` to Save Assistant Messages

**Files:**
- Modify: `ai-tutor.js` lines 135–143 (the `finalizeAssistantBubble` function)

- [ ] **Step 1: Read lines 135–143 to confirm exact content**

Read `ai-tutor.js` lines 135–143.

- [ ] **Step 2: Add `saveMessage("assistant", finalText)` after the history.push in `finalizeAssistantBubble`**

Find:
```javascript
  function finalizeAssistantBubble() {
    if (currentAssistantEl) {
      const finalText = currentAssistantEl._rawText || currentAssistantEl.textContent;
      currentAssistantEl.innerHTML = renderMarkdown(finalText);
      currentAssistantEl.classList.remove("streaming");
      history.push({ role: "assistant", content: finalText });
      currentAssistantEl = null;
    }
  }
```

Replace with:
```javascript
  function finalizeAssistantBubble() {
    if (currentAssistantEl) {
      const finalText = currentAssistantEl._rawText || currentAssistantEl.textContent;
      currentAssistantEl.innerHTML = renderMarkdown(finalText);
      currentAssistantEl.classList.remove("streaming");
      history.push({ role: "assistant", content: finalText });
      currentAssistantEl = null;
      saveMessage("assistant", finalText);
      // Refresh sidebar title after first assistant reply
      if (history.length <= 2) loadSessions();
    }
  }
```

- [ ] **Step 3: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 12: JS — Hook `toggle()` to Load Sessions on Panel Open

**Files:**
- Modify: `ai-tutor.js` lines 264–276 (the `toggle` function)

- [ ] **Step 1: Read lines 264–280 to confirm exact content**

Read `ai-tutor.js` lines 264–280.

- [ ] **Step 2: Add `loadSessions()` call and auto-load most recent session in `toggle()`**

Find:
```javascript
    if (isOpen) {
      hideKeyInput();
      setStatus("Ready. Ask anything about Python!");
    }
```

Replace with:
```javascript
    if (isOpen) {
      hideKeyInput();
      setStatus("Ready. Ask anything about Python!");
      // Auto-load most recent session if no active session
      loadSessions().then((sessions) => {
        if (!_sessionId && sessions.length > 0) {
          loadSession(sessions[0].id);
        }
      });
    }
```

- [ ] **Step 3: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 13: JS — Update `clearHistory` and Export New Functions

**Files:**
- Modify: `ai-tutor.js` lines 284–307 (bottom of file)

- [ ] **Step 1: Read lines 284–308 to confirm current `clearHistory` and return statement**

Read `ai-tutor.js` lines 284–308.

- [ ] **Step 2: Update `clearHistory` to use `newChat` and add new exports**

Find:
```javascript
  function clearHistory() {
    history = [];
    const chat = chatEl();
    if (chat) chat.innerHTML = "";
    setStatus("Chat cleared. Ask anything about Python!");
  }
```

Replace with:
```javascript
  function clearHistory() {
    newChat();
  }
```

Find the return statement:
```javascript
  return { toggle, toggleContext, send, clearHistory };
```

Replace with:
```javascript
  return {
    toggle,
    toggleContext,
    send,
    clearHistory,
    newChat,
    toggleSidebar,
    loadSessions,
    loadSession,
    deleteSession,
  };
```

- [ ] **Step 3: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 14: JS — localStorage Migration (Logged-in User)

**Files:**
- Modify: `ai-tutor.js`

When a user logs in (or when the panel opens and a user is now logged in with localStorage data), migrate localStorage sessions to Supabase.

- [ ] **Step 1: Insert `migrateLocalToSupabase` function after the `toggleSidebar` block**

```javascript
  async function migrateLocalToSupabase() {
    const userId = getUserId();
    if (!userId || !window._supabase) return;
    const sessions = lsGetSessions();
    if (!sessions.length) return;

    for (const s of sessions) {
      const now = new Date().toISOString();
      try {
        // Insert session (ignore if already exists)
        await window._supabase.from("ai_chat_sessions").upsert({
          id: s.id,
          user_id: userId,
          title: s.title || "Imported chat",
          created_at: s.created_at || now,
          updated_at: s.updated_at || now,
        }, { onConflict: "id" });

        // Insert messages
        for (const msg of (s.messages || [])) {
          await window._supabase.from("ai_chat_messages").upsert({
            id: msg.id || generateId(),
            session_id: s.id,
            user_id: userId,
            role: msg.role,
            content: msg.content,
            created_at: msg.created_at || now,
          }, { onConflict: "id" });
        }
      } catch (_) {
        // If tables don't exist, skip migration silently
        return;
      }
    }

    // Clear localStorage after successful migration
    localStorage.removeItem(LS_KEY);
  }
```

- [ ] **Step 2: Call `migrateLocalToSupabase()` at the start of `loadSessions()`**

Find:
```javascript
  async function loadSessions() {
    const userId = getUserId();
    let sessions = [];
```

Replace with:
```javascript
  async function loadSessions() {
    await migrateLocalToSupabase();
    const userId = getUserId();
    let sessions = [];
```

- [ ] **Step 3: Verify syntax**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js
```
Expected: no output.

---

### Task 15: Final Verification

- [ ] **Step 1: Full syntax check**

Run:
```bash
node --check /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js && echo "PASS"
```
Expected: `PASS`

- [ ] **Step 2: Check div balance in index.html**

Run:
```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('/Users/charleschen/Downloads/Projects/python-30-days/index.html', 'utf8');
const opens = (html.match(/<div[\s>]/g) || []).length;
const closes = (html.match(/<\/div>/g) || []).length;
console.log('div opens:', opens, 'closes:', closes, opens === closes ? 'BALANCED' : 'MISMATCH');
"
```
Expected: `BALANCED`

- [ ] **Step 3: Verify sidebar CSS block is present**

Run:
```bash
grep -c "tutor-sidebar" /Users/charleschen/Downloads/Projects/python-30-days/style.css
```
Expected: number > 0 (at least 5 occurrences)

- [ ] **Step 4: Verify all exported functions are in the return statement**

Run:
```bash
grep "return {" /Users/charleschen/Downloads/Projects/python-30-days/ai-tutor.js -A 10
```
Expected: all of `toggle, toggleContext, send, clearHistory, newChat, toggleSidebar, loadSessions, loadSession, deleteSession` appear.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css ai-tutor.js
git commit -m "feat: add chat history sidebar to AI Tutor panel with Supabase + localStorage fallback"
```

---

## Supabase SQL

Run this in the Supabase SQL Editor to create the required tables:

```sql
-- ─── ai_chat_sessions ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id          uuid PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       text NOT NULL DEFAULT 'New chat',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ai_chat_sessions_user_id_idx
  ON ai_chat_sessions (user_id, updated_at DESC);

ALTER TABLE ai_chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own sessions"
  ON ai_chat_sessions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── ai_chat_messages ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id          uuid PRIMARY KEY,
  session_id  uuid NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role        text NOT NULL CHECK (role IN ('user', 'assistant')),
  content     text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ai_chat_messages_session_id_idx
  ON ai_chat_messages (session_id, created_at ASC);

ALTER TABLE ai_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own messages"
  ON ai_chat_messages
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```
