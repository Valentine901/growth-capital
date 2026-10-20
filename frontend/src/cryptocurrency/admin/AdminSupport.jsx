import { useSupportChat } from "../hooks/useSupportChat";
import { useInvestAuth } from "../context/AuthContext";
import { APIInvest } from "../../constants/API";
import { useState, useEffect, useRef } from "react";
import { X, SendHorizontal, Headset, ArrowLeft } from "lucide-react";

const MessageBubble = ({ message, isMine }) => {
    const time = new Date(message.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl shadow-sm ${
                    isMine
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-900 rounded-bl-sm border border-gray-200"
                }`}
            >
                <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
                <span className={`block text-[10px] mt-1 text-right ${isMine ? "text-blue-100" : "text-gray-400"}`}>
                    {time}
                </span>
            </div>
        </div>
    );
};

// change these two lines if your User fields are named differently
const displayName = (user) =>
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.email ||
    "Unknown user";

const formatInboxTime = (iso) => {
    const d = new Date(iso);
    const isToday = d.toDateString() === new Date().toDateString();
    return isToday
        ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : d.toLocaleDateString([], { day: "numeric", month: "short" });
};

// the chat for ONE conversation; only mounted when the admin has selected one
const ChatWindow = ({ conversationId, user, onBack }) => {
    const { userData } = useInvestAuth();
    const { messages, loading, error, send, connected } = useSupportChat(conversationId);
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const content = text.trim();
        if (!content) return;
        const sent = send(content);
        if (sent) setText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* chat header */}
            <div className="flex items-center gap-3 bg-white border-b border-gray-200 px-3 py-2">
                <button
                    onClick={onBack}
                    aria-label="Back to conversations"
                    className="md:hidden p-1 rounded-md hover:bg-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="leading-tight min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{displayName(user)}</p>
                    <p className="text-xs text-gray-500">{connected ? "Online" : "Connecting..."}</p>
                </div>
            </div>

            {/* messages */}
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 p-3">
                {loading && <p className="text-center text-sm text-gray-500">Loading...</p>}
                {error && <p className="text-center text-sm text-red-500">{error}</p>}
                {!loading && !error && messages.length === 0 && (
                    <p className="text-center text-sm text-gray-500 mt-4">No messages yet.</p>
                )}
                {messages.map((m) => (
                    <MessageBubble key={m.id} message={m} isMine={m.sender_id === userData?.id} />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* input bar */}
            <div className="flex items-end gap-2 bg-white border-t border-gray-200 p-3">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={2000}
                    placeholder="Type a reply..."
                    className="flex-1 resize-none max-h-24 rounded-xl bg-gray-100 text-gray-900 text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSend}
                    disabled={!text.trim() || !connected}
                    aria-label="Send message"
                    className="w-10 h-10 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <SendHorizontal size={18} />
                </button>
            </div>
        </>
    );
};

const AdminSupport = ({ onCloseSupport }) => {
    const [conversations, setConversations] = useState([]);
    const [inboxLoading, setInboxLoading] = useState(true);
    const [inboxError, setInboxError] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    // load the inbox, and refresh it every 15 seconds
    useEffect(() => {
        let cancelled = false;

        const loadInbox = async () => {
            try {
                const res = await APIInvest.get("/support/admin/conversations");
                if (cancelled) return;
                setConversations(res.data);
                setInboxError("");
            } catch (err) {
                if (cancelled) return;
                setInboxError(err.response?.data?.detail || "Could not load conversations");
            } finally {
                if (!cancelled) setInboxLoading(false);
            }
        };

        loadInbox();
        const timer = setInterval(loadInbox, 15000);

        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, []);

    const selected = conversations.find((c) => c.id === selectedId);

    return (
        <div className="fixed right-5 top-15 z-100 w-[calc(100%-2.5rem)] max-w-3xl h-140 max-h-[calc(100vh-5rem)] rounded-2xl bg-gray-100 shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

            {/* header */}
            <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                        <Headset size={20} />
                    </div>
                    <p className="font-semibold">Support inbox</p>
                </div>
                <button
                    onClick={onCloseSupport}
                    aria-label="Close support"
                    className="p-1 rounded-md hover:bg-white/20 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex flex-1 min-h-0">

                {/* sidebar: list of users who have written */}
                <div className={`${selectedId ? "hidden md:flex" : "flex"} w-full md:w-64 shrink-0 flex-col bg-white border-r border-gray-200`}>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        {inboxLoading && <p className="text-center text-sm text-gray-500 p-4">Loading...</p>}
                        {inboxError && <p className="text-center text-sm text-red-500 p-4">{inboxError}</p>}
                        {!inboxLoading && !inboxError && conversations.length === 0 && (
                            <p className="text-center text-sm text-gray-500 p-4">No messages from users yet.</p>
                        )}

                        {conversations.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedId(c.id)}
                                className={`w-full flex items-center gap-3 px-3 py-3 text-left border-b border-gray-100 transition-colors hover:bg-blue-50 ${
                                    c.id === selectedId ? "bg-blue-50" : ""
                                }`}
                            >
                                <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold uppercase">
                                    {displayName(c.user).charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-medium text-gray-900 text-sm truncate">{displayName(c.user)}</p>
                                        <span className="text-[10px] text-gray-400 shrink-0">
                                            {formatInboxTime(c.last_message_at)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{c.user?.email}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* chat area */}
                <div className={`${selectedId ? "flex" : "hidden md:flex"} flex-1 min-w-0 flex-col`}>
                    {selectedId ? (
                        <ChatWindow
                            key={selectedId}
                            conversationId={selectedId}
                            user={selected?.user}
                            onBack={() => setSelectedId(null)}
                        />
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                            Select a conversation to start replying
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSupport;