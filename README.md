# Lukiora - AI Chatbot & Web Solutions

## O projektu

**Lukiora** je kompletní platforma pro AI chatboty a webová řešení.

Nabízíme:
- 🤖 AI Chatboty (WhatsApp, Telegram, API)
- 🌐 Webové stránky (Vizitka, Prezentace, WordPress)
- 📊 Data Analysis
- 📈 AI Marketing Assistants

## Technologie

Projekt je postaven na:
- **Frontend**: Vite + React + TypeScript
- **UI**: shadcn-ui + Tailwind CSS
- **Backend**: FastAPI + Python
- **i18n**: 8 jazyků (cs, en, ru, sk, es, de, fr, it)

## Lokální vývoj

```sh
# Instalace dependencies
npm install

# Spuštění dev serveru
npm run dev

# Build pro produkci
npm run build
```

## Docker

```sh
# Build frontend
docker build -f Dockerfile.frontend -t lukiora-fe .

# Spuštění kontejneru
docker run -d -p 8081:80 --name lukiora-fe-container lukiora-fe
```

## Backend

```sh
cd backend
pip install -r ../requirements.txt
uvicorn app.main:app --reload --port 8002
```

---

© 2024 Lukiora. All rights reserved.
