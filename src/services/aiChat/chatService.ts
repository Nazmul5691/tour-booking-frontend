/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export async function sendChatMessage(messages: ChatMessage[]) {
    try {
        const response = await serverFetch.post("/chat", {
            body: JSON.stringify({ messages }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message || "AI request failed",
            };
        }

        return {
            success: true,
            data: result.data.reply,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}