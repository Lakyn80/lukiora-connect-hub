export type Role = "user" | "assistant" | "system";

export type ChatMessage = { role: Role; content: string };
export type ChatRequest = {
  message: string;
  session_id?: string | null;
  history?: ChatMessage[] | null;
};
export type ChatResponse = { session_id: string; reply: string };

const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function postChat(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat/respond`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Chat failed: ${res.status} ${txt}`);
  }
  return res.json();
}
