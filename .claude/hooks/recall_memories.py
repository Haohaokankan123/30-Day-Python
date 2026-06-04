#!/usr/bin/env python3
"""
UserPromptSubmit hook — injects relevant Pinecone memories into every Claude prompt.
"""
import sys
import json
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

try:
    from memory import recall

    hook_input = json.load(sys.stdin)
    prompt = hook_input.get("prompt", "")

    memories = recall(prompt, top_k=5)

    if memories:
        memory_block = "\n".join(f"- {m}" for m in memories)
        injected = f"[Relevant memories from Pinecone]\n{memory_block}\n\n"
        output = {"additionalSystemPrompt": injected}
    else:
        output = {}

    print(json.dumps(output))

except Exception:
    print(json.dumps({}))
