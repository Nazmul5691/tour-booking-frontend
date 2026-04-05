import { Bot, X } from "lucide-react";

interface Props {
    toursLoading: boolean;
    toursCount: number;
    onClose: () => void;
}

export default function ChatHeader({ toursLoading, toursCount, onClose }: Props) {
    return (
        <div className="bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="text-white w-5 h-5" />
                </div>
                <div>
                    <p className="text-white font-bold text-sm">Dream Tour AI</p>
                    <p className="text-white/80 text-xs">
                        {toursLoading ? "Loading tour data..." : `${toursCount} tours available 🌿`}
                    </p>
                </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}