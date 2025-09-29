# backend/knowledge/process.md
# Proces spolupráce

1) **Kick-off**
   - Cíle, kanály (WhatsApp/Telegram/Web), jazyk(y).
   - Shromáždění materiálů: popis firmy, nabídka, FAQ, kontakt.

2) **Dev prostředí**
   - Backend FastAPI na 8002, tunel (ngrok/cloudflared).
   - Test webhooků a základního promptu.

3) **Obsah & Konfigurace**
   - Naplnění `backend/knowledge/*.md` a `DEEPSEEK_SYSTEM_PROMPT`.
   - Nastavení off-topic pravidel a vícejazyčnosti.

4) **Integrace kanálů**
   - Telegram: BotFather, `/setWebhook`.
   - WhatsApp Cloud API: ověření a webhook.
   - Web widget: odesílání na `/api/chat/respond`.

5) **Testy a ladění**
   - Funkční průchody, fallbacky při chybách API.
   - Kontrola jazyků a doménového omezení odpovědí.

6) **Produkce**
   - Reverse proxy (Nginx), HTTPS, CORS pro doménu.
   - Monitoring, zálohy, dokumentace.

7) **Podpora**
   - Úpravy promptů a znalostního obsahu.
   - Průběžná optimalizace kvality odpovědí.
