import { Bot, Loader2, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { Message } from "./types";

interface Props {
    messages: Message[];
    loading: boolean;
    toursLoading: boolean;
}

export default function ChatMessages({ messages, loading, toursLoading }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 max-h-[400px]">
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
    );
}