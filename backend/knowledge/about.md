# backend/knowledge/about.md
# Lukiora — AI chatboti a asistenti
Děláme implementace chatbotů a AI asistentů pro malé firmy i projekty. Zaměřujeme se na WhatsApp a Telegram, vlastní AI API integrace a přípravu marketingových AI asistentů. Frontend stavíme v Reactu + Tailwind (vite + shadcn), backend ve FastAPI (Python). Nasazujeme postupně: nejdřív funkční dev (localhost + ngrok), potom produkce na vlastní doméně.

## Klíčové body
- Rychlá integrace kanálů: WhatsApp, Telegram.
- Vlastní AI API (např. DeepSeek) s možností „guardrails“ a firemního kontextu.
- Web-vizitka lukiora.com s kontaktním formulářem a plovoucím chat widgetem.
- Email notifikace z formuláře (SMTP na mail.lukiora.com).
- Dev → prod proces, reverse proxy, HTTPS, webhooky.

## Technologie
- Frontend: React, Vite, Tailwind, framer-motion, shadcn/ui.
- Backend: FastAPI, Uvicorn, httpx, Pydantic, Alembic/DB (připraveno).
- Integrace: DeepSeek API, Telegram Bot API, WhatsApp (Cloud API varianta).
- Dev nástroje: ngrok/cloudflared, GitHub, VS Code.
