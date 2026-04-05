import { Send } from "lucide-react";

interface Props {
    input: string;
    loading: boolean;
    toursLoading: boolean;
    onChange: (val: string) => void;
    onSend: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChatInput({ input, loading, toursLoading, onChange, onSend, onKeyDown }: Props) {
    return (
        <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={toursLoading ? "Loading tours..." : "Ask about our tours..."}
                disabled={toursLoading}
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-orange-400 bg-gray-50 disabled:opacity-50"
            />
            <button
                onClick={onSend}
                disabled={!input.trim() || loading || toursLoading}
                className="w-9 h-9 rounded-full bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send className="w-4 h-4 text-white" />
            </button>
        </div>
    );
}