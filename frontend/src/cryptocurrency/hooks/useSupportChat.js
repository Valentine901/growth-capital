import { useEffect, useState, useRef } from "react";
import { APIInvest } from "../../constants/API";

export function useSupportChat(conversationId = null) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);
useEffect(() => {
  if (!conversation?.id) return;

  const MAX_RETRIES = 6;
  const base = APIInvest.defaults.baseURL
    .replace(/^http/, "ws")
    .replace(/\/$/, "");
  const url = `${base}/support/ws/support/${conversation.id}`;

  let ws;
  let timer;
  let retries = 0;
  let closedByUs = false;

  // fetch history again and add only the messages we don't have yet
  const syncMissed = async () => {
    try {
      const res = await APIInvest.get(
        `/support/conversations/${conversation.id}/messages`,
      );
      setMessages((prev) => {
        const known = new Set(prev.map((m) => m.id));
        const fresh = res.data.filter((m) => !known.has(m.id));
        if (fresh.length === 0) return prev;
        return [...prev, ...fresh].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at),
        );
      });
    } catch (err) {
      console.log("sync after reconnect failed:", err);
    }
  };

  const connect = () => {
    ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      if (retries > 0) syncMissed(); // this was a reconnect, not the first connection
      retries = 0;
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (!data.id) return;
      setMessages((prev) =>
        prev.some((m) => m.id === data.id) ? prev : [...prev, data],
      );
    };

    ws.onclose = (e) => {
      setConnected(false);
      console.log("Socket closed, code:", e.code);

      if (closedByUs || retries >= MAX_RETRIES) return;

      const delay = Math.min(1000 * 2 ** retries, 15000);
      retries += 1;
      timer = setTimeout(connect, delay);
    };
  };

  connect();

  return () => {
    closedByUs = true;
    clearTimeout(timer);
    ws?.close();
  };
}, [conversation?.id]);

  useEffect(() => {
  let cancelled = false;

  // reset everything when we switch to a different conversation
  setConversation(null);
  setMessages([]);
  setError("");
  setLoading(true);

  const loadChat = async () => {
    try {
      let convo;
      if (conversationId) {
        // admin: the conversation already exists, we were told which one
        convo = { id: conversationId };
      } else {
        // normal user: get my own conversation (created if needed)
        const convosRes = await APIInvest.get("/support/conversation");
        convo = convosRes.data;
      }

      const historyRes = await APIInvest.get(
        `/support/conversations/${convo.id}/messages`,
      );

      if (cancelled) return;
      setConversation(convo);
      setMessages(historyRes.data);
    } catch (err) {
      if (cancelled) return;
      setError(err.response?.data?.detail || "Could not load support chat");
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  loadChat();

  return () => {
    cancelled = true;
  };
}, [conversationId]);

  const send = (content) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;

    ws.send(JSON.stringify({ content }));
    return true;
  };

  return {
    conversation,
    messages,
    setMessages,
    loading,
    error,
    connected,
    send,
  };
}
