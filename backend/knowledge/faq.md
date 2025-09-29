# backend/knowledge/faq.md
# FAQ

**V jakých jazycích bot odpovídá?**  
Česky, anglicky a rusky. Detekce jazyka je automatická. Default čeština.

**Odpovídá bot jen na firemní témata?**  
Ano. Používáme systémový prompt a off-topic pravidla. Mimo rozsah bot zdvořile odmítne.

**Jak probíhá napojení na DeepSeek?**  
Backend volá `chat/completions` s `system` promptem a firemním kontextem z `backend/knowledge/*.md`.

**Kde běží backend?**  
V dev na `localhost:8002` přes ngrok/cloudflared. V produkci pod vlastní doménou za reverse proxy.

**Je možné přidat WhatsApp?**  
Ano. Umíme Cloud API variantu. Nastavíme webhook, validaci a směrování zpráv do LLM.

**Jak funguje kontaktní formulář?**  
`POST /api/contact` odešle e-mail na `service@lukiora.com` přes SMTP `mail.lukiora.com`.

**Jak se aktualizují znalosti bota?**  
Uprav `backend/knowledge/*.md`, restartuj backend. Bot ihned používá nové texty.

**Ukládáte historii chatů?**  
Základní verze odpovídá bez perzistence. Lze doplnit DB (SQLModel/Alembic) pro audit a analytiku.

**Jak je řešeno zabezpečení webhooků?**  
Telegram webhook chrání URL token. WhatsApp přidává ověřovací tokeny. V produkci vždy HTTPS.

**Můžeme přidat vlastní pravidla?**  
Ano. Lze doplnit další guardrails, šablony odpovědí, sentiment, nebo hand-off na člověka. 
