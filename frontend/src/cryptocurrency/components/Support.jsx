import { useSupportChat } from "../hooks/useSupportChat";
import { useInvestAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { X, SendHorizontal, Headset } from "lucide-react";

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

const Support = ({ onCloseSupport }) => {
    const { userData } = useInvestAuth();
    const { messages, loading, error, send, connected } = useSupportChat();
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
        <div className="fixed inset-0 z-100 h-dvh w-full bg-gray-100 flex flex-col overflow-hidden md:inset-auto md:right-5 md:top-15 md:h-140 md:max-h-[calc(100vh-5rem)] md:w-100 md:rounded-2xl md:border md:border-gray-200 md:shadow-2xl">

            {/* header */}
            <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                        <Headset size={20} />
                    </div>
                    <div className="leading-tight">
                        <p className="font-semibold">Support</p>
                        <p className="text-xs text-blue-100">What is on your mind?</p>
                    </div>
                </div>
                <button
                    onClick={onCloseSupport}
                    aria-label="Close support"
                    className="p-1 rounded-md hover:bg-white/20 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* messages */}
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 p-3">
                {loading && <p className="text-center text-sm text-gray-500">Loading...</p>}
                {error && <p className="text-center text-sm text-red-500">{error}</p>}
                {!loading && !error && messages.length === 0 && (
                    <p className="text-center text-sm text-gray-500 mt-4">No messages yet. Say hello!</p>
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
                    placeholder="Type a message..."
                    className="flex-1 resize-none max-h-24 rounded-xl bg-gray-100 text-gray-900 text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSend}
                    disabled={!text.trim()}
                    aria-label="Send message"
                    className="w-10 h-10 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <SendHorizontal size={18} />
                </button>
            </div>
        </div>
    );
};

export default Support;