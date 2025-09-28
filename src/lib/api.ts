export type ContactIn = {
  name: string;
  email: string;
  message: string;
};

export type ContactOut = {
  ok: boolean;
  received: ContactIn;
};

const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function postContact(data: ContactIn): Promise<ContactOut> {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Contact failed: ${res.status} ${txt}`);
  }
  return res.json();
}
