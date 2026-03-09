# AI_CONTEST_REPORT.md
# Dream Tour — AI Contest Documentation

---

## 1. Project Overview

**Project Name:** Dream Tour  
**Description:** Dream Tour is a travel planning and booking web application focused on exploring the breathtaking beauty of Bangladesh — safely, comfortably, and affordably. It connects travelers with trusted guides, amazing destinations, and premium travel experiences all in one place.  
**Tech Stack:** React.js (Frontend), Express.js (Backend), MongoDB (Database)

---

## 2. AI Tools Used

| Tool | Purpose |
|------|---------|
| **Claude AI (Anthropic)** | Powers the AI Chat Assistant (Tour Guide Bot) |
| **Claude API (`claude-sonnet-4-20250514`)** | Processes user messages and generates intelligent responses |

**Why Claude AI?**
- Highly capable of understanding natural language queries
- Supports custom system prompts to inject real tour data (RAG approach)
- Fast and reliable responses for real-time chat experience

---

## 3. UI Improvements

### 3.1 Skeleton Loading
- Replaced plain "Loading tours..." text with a fully animated skeleton UI
- Skeleton matches the exact shape and layout of the actual tour cards
- Provides a smooth, professional loading experience using Tailwind's `animate-pulse`

### 3.2 Hero Section
- Redesigned the homepage hero section with a visually striking layout
- Added gradient text effects using yellow → orange → pink theme
- Improved typography, spacing, and call-to-action button design

### 3.3 Tour Cards Redesign
- Completely redesigned tour cards with modern rounded layout (`rounded-3xl`)
- Added image hover zoom effect with gradient overlay
- Added floating badges for Location, Price, and Duration on the card image
- Improved content layout with icons for Departure, Start Date, and Max Guests
- Added gradient CTA button "Explore This Tour" at the bottom of each card

### 3.4 Gradient Buttons
- Replaced plain buttons across the site with consistent gradient buttons
- Gradient style: `from-yellow-400 via-orange-500 to-pink-500`
- Applied `rounded-full`, `shadow-xl`, and hover effects for a polished look
- Used across Hero Section, Tour Cards, and Navigation

---

## 4. AI Feature Implemented

### AI Chat Assistant — Tour Guide Bot

**Type:** AI Chat Assistant  
**Location:** Floating button (bottom-right corner) — visible on all pages

#### How It Works

1. User clicks the floating chat button (bottom-right corner)
2. The app fetches all available tours from the backend (`getAllTours()`)
3. Real tour data (title, location, price, dates, description, slug) is injected into the AI's system prompt
4. User asks any question in the chat
5. Claude AI responds using the real tour data — suggesting tours, answering pricing questions, providing travel tips, and guiding users to book

#### This is a RAG (Retrieval Augmented Generation) approach:
```
User Question
     ↓
Fetch real tours from DB (getAllTours)
     ↓
Inject tour data into AI system prompt
     ↓
Claude AI generates answer based on real data
     ↓
Response shown in chat UI
```

#### Features
- 🌿 Floating chat button visible on every page
- 📦 Loads real tour data on chat open
- 💬 Supports multi-turn conversation (full chat history sent each time)
- ⌨️ Send message with Enter key or Send button
- 🔄 Animated loading indicator while AI is thinking
- 📍 Suggests tour slugs/links when user wants to book
- ⚠️ Graceful error handling

#### Example Interactions

| User Query | AI Response |
|-----------|-------------|
| "Cox's Bazar tour ache?" | Lists available Cox's Bazar tours with price and dates |
| "Sবচেয়ে কম দামের tour কোনটা?" | Compares all tours and suggests cheapest option |
| "March এ কোথায় যেতে পারি?" | Filters tours by date and suggests relevant ones |
| "Sundarbans tour book করবো কিভাবে?" | Explains booking process and provides tour link |

---

## 5. Prompts Used

### System Prompt (injected into Claude API):

```
You are a friendly and knowledgeable Bangladesh Tour Guide AI assistant for "Dream Tour" travel platform.

You have access to the following REAL tour packages currently available on our platform:

[DYNAMIC TOUR DATA INJECTED HERE]

Your job:
- Answer user questions using the above real tour data
- Suggest relevant tours based on user preferences (location, budget, dates)
- Provide travel tips about Bangladesh destinations
- Help users understand pricing, duration, and booking
- If a user asks about a specific tour, give detailed info from the data above
- If user wants to book, tell them to click "Explore This Tour" on the tour card or visit /allTours/tours/[slug]
- Keep responses concise, friendly, and helpful
- Use emojis occasionally to keep it warm and engaging
- If no tours match a query, suggest the closest alternatives from the list
```

---

## 6. Architecture

```
Frontend (React.js)
     │
     ├── TourChatBot.tsx         → Floating chat UI component
     │        │
     │        ├── getAllTours()  → Fetches real tour data from backend
     │        │
     │        └── POST /api/chat → Sends message to Express backend
     │
Backend (Express.js)
     │
     └── /api/chat route         → Calls Anthropic Claude API securely
              │
              └── Claude AI      → Generates response using real tour data
```

**Security:** The Anthropic API key is stored in the backend `.env` file and never exposed to the frontend.

---

## 7. File Structure (AI Related)

```
frontend/
└── src/
    └── components/
        └── TourChatBot.tsx       ← AI Chat UI Component

backend/
├── routes/
│   └── chat.js                   ← Express route for Claude API
├── .env                          ← ANTHROPIC_API_KEY stored here
└── server.js                     ← Route registered here
```

---

*© 2025 Dream Tour. All rights reserved.*
