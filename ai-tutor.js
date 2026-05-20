/* =============================================
   AI TUTOR — Groq llama-3.3-70b-versatile
   Browser → /api/chat (Vercel serverless)
   ============================================= */

const AITutor = (() => {
  let useCodeContext = false;
  // history: [{role: "user"|"assistant", content: string}]
  let history = [];
  let currentAssistantEl = null;
  let isGenerating = false;

  // ─── Tiny markdown renderer ───────────────────
  // Converts response text to safe HTML.
  // Handles: ```lang ... ``` fences, `inline`, **bold**, *italic*, paragraphs
  function renderMarkdown(text) {
    const lines = text.split("\n");
    const out = [];
    let inFence = false;
    let fenceLang = "";
    let fenceLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const fenceMatch = line.match(/^```(\w*)$/);

      if (fenceMatch && !inFence) {
        inFence = true;
        fenceLang = fenceMatch[1] || "";
        fenceLines = [];
        continue;
      }
      if (line.trim() === "```" && inFence) {
        const code = escHtml(fenceLines.join("\n"));
        const lang = escHtml(fenceLang) || "code";
        out.push(
          `<pre class="tutor-code-block"><span class="tutor-code-lang">${lang}</span><code>${code}</code></pre>`
        );
        inFence = false;
        fenceLang = "";
        fenceLines = [];
        continue;
      }
      if (inFence) {
        fenceLines.push(line);
        continue;
      }

      // Inline formatting on regular lines
      let l = escHtml(line);
      l = l.replace(/`([^`]+)`/g, '<code class="tutor-inline-code">$1</code>');
      l = l.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      l = l.replace(/\*(.+?)\*/g, "<em>$1</em>");
      out.push(l);
    }

    // If fence never closed (mid-stream)
    if (inFence && fenceLines.length) {
      const code = escHtml(fenceLines.join("\n"));
      const lang = escHtml(fenceLang) || "code";
      out.push(
        `<pre class="tutor-code-block"><span class="tutor-code-lang">${lang}</span><code>${code}</code></pre>`
      );
    }

    return groupIntoParagraphs(out);
  }

  function escHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function groupIntoParagraphs(lines) {
    const result = [];
    let para = [];

    const flush = () => {
      if (para.length) {
        const joined = para.join("<br>");
        if (joined.trim()) result.push(`<p>${joined}</p>`);
        para = [];
      }
    };

    for (const line of lines) {
      if (line.startsWith("<pre")) {
        flush();
        result.push(line);
      } else if (line.trim() === "") {
        flush();
      } else {
        para.push(line);
      }
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

  function finalizeAssistantBubble() {
    if (currentAssistantEl) {
      const finalText = currentAssistantEl._rawText || currentAssistantEl.textContent;
      currentAssistantEl.innerHTML = renderMarkdown(finalText);
      currentAssistantEl.classList.remove("streaming");
      history.push({ role: "assistant", content: finalText });
      currentAssistantEl = null;
    }
  }

  // ─── Get current logged-in user ID ────────────
  function getUserId() {
    if (window.Auth && typeof window.Auth.user === "function") {
      const u = window.Auth.user();
      return u ? u.id : null;
    }
    return null;
  }

  function hideKeyInput() {
    const setup = document.getElementById("tutorKeySetup");
    const chat  = document.getElementById("tutorChatArea");
    if (setup) setup.style.display = "none";
    if (chat)  chat.style.display  = "flex";
  }

  // ─── Send message ─────────────────────────────
  async function send() {
    if (isGenerating) return;

    const ta = document.getElementById("tutorTextarea");
    if (!ta) return;
    const userText = ta.value.trim();
    if (!userText) return;

    // Attach editor code if context active
    let code = "";
    if (useCodeContext) {
      if (window.FloatingPlayground) code = (window.FloatingPlayground.getCode() || "").trim();
      if (!code && window.Playground) code = (window.Playground.getCode() || "").trim();
      if (code === "# Type your Python here!\nprint('Hello, Python!')") code = "";
    }

    const fullPrompt = code
      ? `Here is my current Python code:\n\`\`\`python\n${code}\n\`\`\`\n\nMy question: ${userText}`
      : userText;

    appendUserBubble(userText + (code ? "  📎" : ""));
    history.push({ role: "user", content: fullPrompt });
    ta.value = "";

    isGenerating = true;
    setStatus("Thinking…");
    const btn = document.getElementById("tutorSendBtn");
    if (btn) { btn.disabled = true; btn.textContent = "…"; }

    startAssistantBubble();

    // Keep last 20 messages (10 turns) for context window
    const messages = history.slice(-20);
    const userId = getUserId();

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
          finalizeAssistantBubble();
        }

        if (response.status === 429) {
          appendToken(err.message || "You've reached your 20 free messages for today. Come back tomorrow!");
          finalizeAssistantBubble();
          setStatus("Daily limit reached.");
        } else {
          appendToken(`Error: ${err.error || "Something went wrong. Try again."}`);
          finalizeAssistantBubble();
          setStatus("Error. Try again.");
        }
        return;
      }

      // Parse OpenAI-compatible SSE stream from Groq
      const reader = response.body.getReader();
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
            const json = JSON.parse(jsonStr);
            const token = json.choices?.[0]?.delta?.content;
            if (token) appendToken(token);
          } catch (_) {}
        }
      }

      finalizeAssistantBubble();
      setStatus("Ready. Ask another question!");
    } catch (e) {
      appendToken("Network error: " + e.message);
      finalizeAssistantBubble();
      setStatus("Network error. Check your connection.");
    } finally {
      isGenerating = false;
      if (btn) { btn.disabled = false; btn.textContent = "Send"; }
    }
  }

  // ─── UI actions ───────────────────────────────
  function toggle() {
    const panel = document.getElementById("tutorPanel");
    const btn = document.getElementById("tutorBtn");
    if (!panel) return;
    const isOpen = panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (btn) btn.classList.toggle("active", isOpen);
    if (isOpen) {
      hideKeyInput();
      setStatus("Ready. Ask anything about Python!");
    }
    if (typeof syncPanelPositions === "function") syncPanelPositions();
  }

  function toggleContext() {
    useCodeContext = !useCodeContext;
    const btn = document.getElementById("tutorContextBtn");
    if (btn) btn.classList.toggle("active", useCodeContext);
  }

  function clearHistory() {
    history = [];
    const chat = chatEl();
    if (chat) chat.innerHTML = "";
    setStatus("Chat cleared. Ask anything about Python!");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const ta = document.getElementById("tutorTextarea");
    if (ta) {
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
      });
    }
  });

  return { toggle, toggleContext, send, clearHistory };
})();

window.AITutor = AITutor;
window.toggleTutor        = () => AITutor.toggle();
window.toggleTutorContext = () => AITutor.toggleContext();
window.sendTutorMessage   = () => AITutor.send();
window.clearTutorHistory  = () => AITutor.clearHistory();
