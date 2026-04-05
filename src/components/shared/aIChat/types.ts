/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Message {
    role: "user" | "assistant";
    text: string;
}

export const buildSystemPrompt = (tours: any[]) => {
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