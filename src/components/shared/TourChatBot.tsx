"use client"

import { getAllTours } from "@/services/admin/tourManagement";
import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
    role: "user" | "assistant";
    text: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildSystemPrompt = (tours: any[]) => {
    const tourList = tours
        .map(
            (t, i) => `
${i + 1}. Title: ${t.title}
   Location: ${t.location}
   Departure: ${t.departureLocation}
   Start Date: ${new Date(t.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
   End Date: ${new Date(t.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
   Cost From: ৳${t.costFrom?.toLocaleString()}
   Max Guests: ${t.maxGuest}
   Description: ${t.description}
   Slug: ${t.slug}
`
        )
        .join("\n");

    return `You are a friendly and knowledgeable Bangladesh Tour Guide AI assistant for "Dream Tour" travel platform.

You have access to the following REAL tour packages currently available on our platform:

${tourList}

Your job:
- Answer user questions using the above real tour data
- Suggest relevant tours based on user preferences (location, budget, dates)
- Provide travel tips about Bangladesh destinations
- Help users understand pricing, duration, and booking
- If a user asks about a specific tour, give detailed info from the data above
- If user wants to book, tell them to click "Explore This Tour" on the tour card or visit /allTours/tours/[slug]
- Keep responses concise, friendly, and helpful
- Use emojis occasionally to keep it warm and engaging
- If no tours match a query, suggest the closest alternatives from the list`;
};

export default function TourChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            text: "🌿 Hello! I'm your Dream Tour AI Guide. Ask me about our available tours, destinations, pricing, or anything travel-related in Bangladesh!",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tours, setTours] = useState<any[]>([]);
    const [toursLoading, setToursLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Fetch tours when chat opens
    useEffect(() => {
        if (isOpen && tours.length === 0) {
            setToursLoading(true);
            getAllTours()
                .then((res) => setTours(res?.data || []))
                .finally(() => setToursLoading(false));
        }
    }, [isOpen, tours.length]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading || toursLoading) return;

        const userMessage: Message = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "claude-sonnet-4-20250514",
                    max_tokens: 1000,
                    system: buildSystemPrompt(tours),
                    messages: [
                        ...messages.map((m) => ({
                            role: m.role,
                            content: m.text,
                        })),
                        { role: "user", content: input },
                    ],
                }),
            });

            const data = await response.json();
            const aiText =
                data?.content?.[0]?.text ||
                "Sorry, I couldn't understand. Please try again.";

            setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "⚠️ Something went wrong. Please try again later.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    aria-label="Open Tour Guide Chat"
                >
                    <MessageCircle className="text-white w-6 h-6" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[360px] max-h-[560px] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-orange-100 bg-white">
                    {/* Header */}
                    <div className="bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                                <Bot className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Dream Tour AI</p>
                                <p className="text-white/80 text-xs">
                                    {toursLoading
                                        ? "Loading tour data..."
                                        : `${tours.length} tours available 🌿`}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 max-h-[400px]">
                        {/* Tours loading indicator */}
                        {toursLoading && (
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 py-2">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Fetching latest tour data...
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                        msg.role === "assistant"
                                            ? "bg-linear-to-r from-yellow-400 to-orange-500"
                                            : "bg-gray-300"
                                    }`}
                                >
                                    {msg.role === "assistant" ? (
                                        <Bot className="w-4 h-4 text-white" />
                                    ) : (
                                        <User className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>

                                {/* Bubble */}
                                <div
                                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                        msg.role === "assistant"
                                            ? "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                                            : "bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 text-white rounded-tr-sm"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* AI Loading */}
                        {loading && (
                            <div className="flex items-end gap-2">
                                <div className="w-7 h-7 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                toursLoading ? "Loading tours..." : "Ask about our tours..."
                            }
                            disabled={toursLoading}
                            className="flex-1 text-sm px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-orange-400 bg-gray-50 disabled:opacity-50"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || loading || toursLoading}
                            className="w-9 h-9 rounded-full bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}




