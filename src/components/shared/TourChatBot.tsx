/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllTours } from "@/services/admin/tourManagement";
import { sendChatMessage } from "@/services/aiChat/chatService";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { buildSystemPrompt, Message } from "./aIChat/types";
import ChatHeader from "./aIChat/ChatHeader";
import ChatMessages from "./aIChat/ChatMessages";
import ChatInput from "./aIChat/ChatInput";


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
    const [tours, setTours] = useState<any[]>([]);
    const [toursLoading, setToursLoading] = useState(false);

    useEffect(() => {
        if (isOpen && tours.length === 0) {
            setToursLoading(true);
            getAllTours()
                .then((res) => setTours(res?.data || []))
                .finally(() => setToursLoading(false));
        }
    }, [isOpen, tours.length]);

    const sendMessage = async () => {
        if (!input.trim() || loading || toursLoading) return;

        const userMessage: Message = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const chatMessages = [
                { role: "system" as const, content: buildSystemPrompt(tours) },
                ...messages.map((m) => ({
                    role: m.role as "user" | "assistant",
                    content: m.text,
                })),
                { role: "user" as const, content: input },
            ];

            const result = await sendChatMessage(chatMessages);

            if (!result.success) throw new Error(result.message);

            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: result.data as string },
            ]);
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "⚠️ Something went wrong. Please try again later." },
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
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    aria-label="Open Tour Guide Chat"
                >
                    <MessageCircle className="text-white w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[360px] max-h-[560px] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-orange-100 bg-white">
                    <ChatHeader
                        toursLoading={toursLoading}
                        toursCount={tours.length}
                        onClose={() => setIsOpen(false)}
                    />
                    <ChatMessages
                        messages={messages}
                        loading={loading}
                        toursLoading={toursLoading}
                    />
                    <ChatInput
                        input={input}
                        loading={loading}
                        toursLoading={toursLoading}
                        onChange={setInput}
                        onSend={sendMessage}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            )}
        </>
    );
}