import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number; // epoch ms
}

const MAX_HISTORY = 50;
const STORAGE_SESSION = "chat:session";
const STORAGE_HISTORY = "chat:history";

function linkify(text: string) {
  const parts = text.split(
    /(https?:\/\/[^\s)]+|www\.[^\s)]+|\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}\b)/g
  );
  return parts.map((p, i) => {
    const isURL = /^https?:\/\//.test(p) || /^www\./.test(p);
    const isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p);
    if (isURL) {
      const href = p.startsWith("http") ? p : `https://${p}`;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="underline">
          {p}
        </a>
      );
    }
    if (isMail) {
      return (
        <a key={i} href={`mailto:${p}`} className="underline">
          {p}
        </a>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

export function ChatbotWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [failCount, setFailCount] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const lastSendAtRef = useRef<number>(0);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const userNearBottomRef = useRef(true);

  useEffect(() => {
    const sid = sessionStorage.getItem(STORAGE_SESSION);
    if (sid) setSessionId(sid);
    const hist = sessionStorage.getItem(STORAGE_HISTORY);
    if (hist) {
      try {
        const parsed: Message[] = JSON.parse(hist);
        if (Array.isArray(parsed) && parsed.length) {
          setMessages(parsed.slice(-MAX_HISTORY));
          return;
        }
      } catch {}
    }
    // Set welcome message if no history
    setMessages([{
      id: "welcome-1",
      text: t('chatbot.welcome'),
      isBot: true,
      timestamp: Date.now(),
    }]);
  }, [t]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_HISTORY, JSON.stringify(messages.slice(-MAX_HISTORY)));
  }, [messages]);
  useEffect(() => {
    if (sessionId) sessionStorage.setItem(STORAGE_SESSION, sessionId);
  }, [sessionId]);

  const scrollToEnd = (behavior: ScrollBehavior = "smooth") =>
    endRef.current?.scrollIntoView({ behavior, block: "end" });

  useEffect(() => {
    if (userNearBottomRef.current) scrollToEnd("smooth");
  }, [messages, isOpen]);

  useEffect(() => {
    const onResize = () => scrollToEnd("auto");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function onScroll() {
    const el = listRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    userNearBottomRef.current = atBottom;
  }

  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
      else if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const canSend = useMemo(() => {
    const now = Date.now();
    const blocked = blockedUntil !== null && now < blockedUntil;
    return inputValue.trim().length > 0 && !isTyping && !blocked;
  }, [inputValue, isTyping, blockedUntil]);

  function computeBlock() {
    if (failCount >= 3) {
      const until = Date.now() + 15000;
      setBlockedUntil(until);
      setFailCount(0);
      setTimeout(() => setBlockedUntil(null), 15000);
    }
  }

  async function send() {
    if (!canSend) return;
    const now = Date.now();
    if (now - lastSendAtRef.current < 150) return;
    lastSendAtRef.current = now;

    const text = inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: String(Date.now()),
      text,
      isBot: false,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // drž fokus v textaree a nescrolluj layout
    textareaRef.current?.focus();

    const API_BASE = import.meta.env.VITE_API_BASE || "";
    const body = {
      message: userMessage.text,
      session_id: sessionId,
      history: messages.slice(-MAX_HISTORY).map((m) => ({
        role: m.isBot ? "assistant" : "user",
        content: m.text,
      })),
    };

    const delays = [500, 2000, 5000];
    let attempt = 0;
    let lastErr: any = null;

    while (attempt <= delays.length) {
      try {
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 30000);
        const res = await fetch(`${API_BASE}/api/chat/respond`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: ctrl.signal,
        });
        clearTimeout(timeout);

        if (!res.ok) {
          if (res.status >= 500 && attempt < delays.length) {
            attempt++;
            await new Promise((r) => setTimeout(r, delays[attempt - 1]));
            continue;
          }
          const txt = await res.text();
          throw new Error(`HTTP ${res.status} ${txt}`);
        }

        const data: { session_id: string; reply: string } = await res.json();
        if (!sessionId) setSessionId(data.session_id);

        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: data.reply,
          isBot: true,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setFailCount(0);
        setIsTyping(false);
        textareaRef.current?.focus(); // po odpovědi ponech fokus
        return;
      } catch (e) {
        lastErr = e;
        if (attempt < delays.length) {
          attempt++;
          await new Promise((r) => setTimeout(r, delays[attempt - 1]));
          continue;
        }
        break;
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `err-${Date.now()}`,
        text: t('chatbot.error'),
        isBot: true,
        timestamp: Date.now(),
      },
    ]);
    setFailCount((n) => n + 1);
    computeBlock();
    setIsTyping(false);
    textareaRef.current?.focus();
  }

  return (
    <>
      {/* toggle */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle chat"
          className="w-14 h-14 p-0 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "chat"}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.25 }}
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <MessageCircle className="w-7 h-7" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-title"
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[60vh] sm:h-[30rem]"
          >
            <Card className="glass h-full flex flex-col overflow-hidden">
              <CardHeader className="flex-shrink-0 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle id="ai-chat-title" className="text-lg">
                      {t('chatbot.title')}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                  <div className="ml-auto">
                    <Button
                      aria-label="Close chat"
                      onClick={() => setIsOpen(false)}
                      className="h-9 w-9 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* layout: messages scroll + pevný composer */}
              <CardContent className="flex-1 min-h-0 p-0">
                <div
                  ref={listRef}
                  onScroll={onScroll}
                  className="h-full overflow-y-auto overscroll-contain px-4 py-3 space-y-3"
                >
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        void navigator.clipboard.writeText(m.text);
                      }}
                      className={
                        m.isBot
                          ? "mr-auto max-w-[85%] rounded-2xl bg-neutral-100 px-3 py-2 text-sm dark:bg-neutral-800"
                          : "ml-auto max-w-[85%] rounded-2xl bg-primary px-3 py-2 text-sm text-primary-foreground"
                      }
                    >
                      <span className="break-words">{linkify(m.text)}</span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="mr-auto max-w-[85%] rounded-2xl bg-neutral-100 px-3 py-2 text-sm italic text-neutral-500 dark:bg-neutral-800">
                      {t('chatbot.send')}...
                    </div>
                  )}
                  <div ref={endRef} />
                </div>

                {/* composer */}
                <div className="border-t border-border/20 p-3">
                  <div className="flex items-end gap-2">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void send();
                        }
                      }}
                      placeholder={
                        blockedUntil
                          ? t('chatbot.rateLimit')
                          : t('chatbot.placeholder')
                      }
                      disabled={Boolean(blockedUntil)}
                      className="min-h-[2.5rem] max-h-24 flex-1 resize-none"
                    />
                    <Button
                      onClick={send}
                      disabled={!canSend}
                      aria-label="Send message"
                      className="h-10 w-10 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
