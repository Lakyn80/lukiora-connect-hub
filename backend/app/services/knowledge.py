from __future__ import annotations
from pathlib import Path
from functools import lru_cache

# repo root = dva adresáře nad tímto modulem
REPO_ROOT = Path(__file__).resolve().parents[3]
KNOW_DIR = REPO_ROOT / "backend" / "knowledge"

@lru_cache(maxsize=1)
def get_context(max_chars: int = 8000) -> str:
    if not KNOW_DIR.exists():
        return ""
    parts: list[str] = []
    for p in sorted(KNOW_DIR.glob("*.md")):
        try:
            parts.append(f"# {p.stem}\n" + p.read_text(encoding="utf-8").strip())
        except Exception:
            continue
    text = "\n\n".join(parts)
    return text[:max_chars]
