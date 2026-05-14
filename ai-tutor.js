/* =============================================
   AI TUTOR — Google Gemini 2.0 Flash (free tier)
   Uses server-sent events streaming
   ============================================= */

const AITutor = (() => {
  let useCodeContext = false;
  let history = [];          // {role:"user"|"model", parts:[{text}]}
  let currentAssistantEl = null;
  let isGenerating = false;

  const GEMINI_MODEL = "gemini-2.5-flash";

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
  }

  function appendToken(text) {
    if (!currentAssistantEl) startAssistantBubble();
    currentAssistantEl.textContent += text;
    chatEl().scrollTop = chatEl().scrollHeight;
  }

  function finalizeAssistantBubble() {
    if (currentAssistantEl) {
      const finalText = currentAssistantEl.textContent;
      currentAssistantEl.classList.remove("streaming");
      history.push({ role: "model", parts: [{ text: finalText }] });
      currentAssistantEl = null;
    }
  }

  // ─── API Key management ───────────────────────
  function getKey() {
    return localStorage.getItem("gemini_api_key") || "";
  }

  function saveKey(key) {
    localStorage.setItem("gemini_api_key", key.trim());
  }

  function showKeyInput() {
    const setup = document.getElementById("tutorKeySetup");
    const chat  = document.getElementById("tutorChatArea");
    if (setup) setup.style.display = "flex";
    if (chat)  chat.style.display  = "none";
  }

  function hideKeyInput() {
    const setup = document.getElementById("tutorKeySetup");
    const chat  = document.getElementById("tutorChatArea");
    if (setup) setup.style.display = "none";
    if (chat)  chat.style.display  = "flex";
  }

  function submitKey() {
    const input = document.getElementById("tutorApiKeyInput");
    const key = (input ? input.value : "").trim();
    if (key.length < 20) {
      if (input) {
        input.style.borderColor = "#ef4444";
        input.value = "";
        input.placeholder = "That doesn't look right — try again";
        setTimeout(() => {
          input.style.borderColor = "";
          input.placeholder = "Paste your Gemini API key…";
        }, 2500);
      }
      return;
    }
    saveKey(key);
    hideKeyInput();
    setStatus("Ready! Ask me anything about Python.");
  }

  function clearKey() {
    localStorage.removeItem("gemini_api_key");
    const input = document.getElementById("tutorApiKeyInput");
    if (input) input.value = "";
    showKeyInput();
  }

  // ─── System instruction ───────────────────────
  function systemInstruction() {
    return `You are an expert Python tutor for the "30 Days of Python" beginner course. You help students learn Python from scratch.

You know everything about Python including: variables, data types (int, float, str, bool, list, tuple, set, dict), operators, type casting, strings, lists, tuples, sets, dictionaries, conditionals (if/elif/else), loops (for/while/range/break/continue/pass), functions (def, return, parameters, default args, *args, **kwargs, scope, lambda), modules, list comprehension, higher-order functions (map/filter/reduce/lambda), exception handling, file handling, OOP (classes, objects, inheritance), and all standard Python concepts.

Rules:
- Be clear, friendly, and encouraging for absolute beginners.
- Keep answers concise — under 150 words unless the student asks for more detail.
- Always show a short code example when explaining a concept.
- Format code blocks with triple backticks and python label.
- If the student shares their code, find bugs and explain the fix step by step.
- If asked about something unrelated to Python, politely redirect.`;
  }

  // ─── Send message ─────────────────────────────
  async function send() {
    if (isGenerating) return;

    const key = getKey();
    if (!key) { showKeyInput(); return; }

    const ta = document.getElementById("tutorTextarea");
    if (!ta) return;
    const userText = ta.value.trim();
    if (!userText) return;

    // Get code from editor if context active
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
    history.push({ role: "user", parts: [{ text: fullPrompt }] });
    ta.value = "";

    isGenerating = true;
    setStatus("Thinking…");
    const btn = document.getElementById("tutorSendBtn");
    if (btn) { btn.disabled = true; btn.textContent = "…"; }

    startAssistantBubble();

    // Build Gemini request body — keep last 8 turns for context
    const contents = history.slice(-8);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction() }] },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 600,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const msg = (err && err.error && err.error.message) || ("HTTP " + response.status);
        const status = response.status;
        console.error("Gemini error:", status, JSON.stringify(err));

        if (status === 400 || status === 403 ||
            msg.toLowerCase().includes("api key") ||
            msg.toLowerCase().includes("invalid") ||
            msg.toLowerCase().includes("permission")) {
          finalizeAssistantBubble();
          showKeyInput();
          setStatus("API key issue — please re-enter your key.");
        } else if (status === 429) {
          appendToken("⚠️ Rate limit reached. Wait 60 seconds and try again.");
          finalizeAssistantBubble();
          setStatus("Rate limited. Wait a moment.");
        } else {
          appendToken(`Error (${status}): ${msg}`);
          finalizeAssistantBubble();
          setStatus("Error. Try again.");
        }
        return;
      }

      // Parse Gemini SSE stream
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
            const text = json && json.candidates && json.candidates[0] &&
              json.candidates[0].content && json.candidates[0].content.parts &&
              json.candidates[0].content.parts[0] && json.candidates[0].content.parts[0].text;
            if (text) appendToken(text);
          } catch (_) {}
        }
      }

      finalizeAssistantBubble();
      setStatus("Ready. Ask another question!");
    } catch (e) {
      appendToken("Network error: " + e.message);
      finalizeAssistantBubble();
      setStatus("Error. Check your internet connection.");
    } finally {
      isGenerating = false;
      if (btn) { btn.disabled = false; btn.textContent = "Send"; }
    }
  }

  // ─── UI actions ───────────────────────────────
  function toggle() {
    const panel = document.getElementById("tutorPanel");
    if (!panel) return;
    const isOpen = panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (isOpen) {
      if (getKey()) {
        hideKeyInput();
        setStatus("Ready. Ask anything about Python!");
      } else {
        showKeyInput();
        const input = document.getElementById("tutorApiKeyInput");
        if (input) input.value = "";
      }
    }
  }

  function toggleContext() {
    useCodeContext = !useCodeContext;
    const btn = document.getElementById("tutorContextBtn");
    if (btn) btn.classList.toggle("active", useCodeContext);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const ta = document.getElementById("tutorTextarea");
    if (ta) {
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
      });
    }
    const ki = document.getElementById("tutorApiKeyInput");
    if (ki) {
      ki.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitKey();
      });
    }
  });

  return { toggle, toggleContext, send, submitKey, clearKey };
})();

window.AITutor = AITutor;
window.toggleTutor    = () => AITutor.toggle();
window.toggleTutorContext = () => AITutor.toggleContext();
window.sendTutorMessage   = () => AITutor.send();
window.submitTutorKey     = () => AITutor.submitKey();
window.clearTutorKey      = () => AITutor.clearKey();
