# backend/knowledge/services.md
# Služby

## WhatsApp Chatbot (Cloud API)
- Zřízení Meta/WhatsApp Business Cloud API.
- Webhook endpoint v FastAPI, validace (verify tokens), příjem a odesílání zpráv.
- Propojení na AI (DeepSeek) s možností firemního kontextu.
- Logování a strážci domény (odpovídáme pouze na firemní témata).

## Telegram Chatbot
- Vytvoření bota u @BotFather, nastavení `/setWebhook`.
- Endpoint: `POST /api/telegram/webhook/{token}`.
- Napojení na DeepSeek s vícejazyčnou podporou (cs/en/ru) a systémovým promptem.
- Off-topic filtr a znalostní kontext z Markdown souborů.

## AI API Chatbot (Web)
- Plovoucí chat widget v Reactu + Tailwind.
- Volání `POST /api/chat/respond` s historií konverzace.
- System prompt a „company knowledge“ pro konzistentní odpovědi.
- Připraveno pro streaming a session tracking.

## AI Marketing Asistenti
- Příprava promptů a šablon pro lead kvalifikaci, FAQ, produktové karty.
- Možnost více jazyků. Default čeština.
- Integrace do webu nebo komunikačních kanálů.

## Kontaktní formulář
- `POST /api/contact` → email na service@lukiora.com.
- Validace (Pydantic), background odeslání přes SMTP.
- Bezpečné CORS pro dev i prod.
