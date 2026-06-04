#!/usr/bin/env python3
"""
Stop hook — saves a summary of what was discussed to Pinecone after each session.
"""
import sys
import json
import os
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

try:
    from memory import save_memory

    hook_input = json.load(sys.stdin)

    transcript = hook_input.get("transcript", [])
    if not transcript:
        sys.exit(0)

    last_messages = []
    for msg in transcript[-6:]:
        role = msg.get("role", "")
        content = msg.get("content", "")
        if isinstance(content, list):
            content = " ".join(
                c.get("text", "") for c in content if isinstance(c, dict) and c.get("type") == "text"
            )
        if content and role in ("user", "assistant"):
            last_messages.append(f"{role}: {content[:300]}")

    if last_messages:
        summary = f"[Session {time.strftime('%Y-%m-%d %H:%M')}] " + " | ".join(last_messages)
        save_memory(summary[:1000])

except Exception:
    pass
