# 🌏 Dream Tour — Tour Booking Platform (Bangladesh)

A modern, scalable, and role-based **tour booking web application** built with **Next.js App Router**, designed specifically for exploring and booking tours across **Bangladesh** 🇧🇩.

Dream Tour provides a smooth experience for **travelers**, **tour guides**, and **administrators**, with clean UI, protected dashboards, secure online payments, and a transparent **review & rating system**.

---

## 🚀 Project Overview

**Dream Tour** is a full-featured tour booking frontend that allows users to:

- Browse tours across Bangladesh
- View detailed tour pages
- Book tours securely
- Complete payments via **SSLCommerz**
- Submit reviews & ratings after tours
- Manage bookings, payments, and reviews
- Apply as a tour guide
- Access role-based dashboards (User, Guide, Admin)

---


🔗 **Live Demo**: [https://tour-booking-frontend-indol.vercel.app/](Dream Tour)


---


## 🧱 Tech Stack

### Frontend Core
- Next.js 16 (App Router)
- TypeScript

### UI & Styling
- Tailwind CSS v4
- Radix UI
- Lucide Icons
- Framer Motion
- Sonner (Toast notifications)

### Forms & Validation
- React Hook Form
- Zod

### Utilities & Integrations
- JWT (Authentication handling)
- SSLCommerz (Payment Gateway – Bangladesh)
- Date-fns
- React Leaflet (Maps)

---

## 💳 Payment System (SSLCommerz)

Dream Tour integrates **SSLCommerz**, the most widely used payment gateway in Bangladesh, for secure online payments.

### Payment Features
- Secure tour booking payments
- Redirect-based checkout flow
- Payment success, failure, and cancel handling
- Backend payment verification support
- Seamless user experience

### Payment Routes
- `/dashboard/payment-success`
- `/dashboard/payment-fail`
- `/dashboard/payment-cancel`

---

## ⭐ Review & Rating System

Dream Tour includes a **verified review & rating system** to ensure transparency and trust.

### Review Features
- Only **booked users** can submit reviews
- Star-based rating system
- Review submission from user dashboard
- Prevents duplicate reviews for the same booking

### Review Routes
- `/dashboard/review`
- `/tours/[slug]` (public review display)

---

## 👥 User Roles

| Role | Description |
|-----|------------|
| USER | Browse tours, book tours, pay online, submit reviews & manage bookings |
| GUIDE | Apply for tours, manage guide applications |
| ADMIN | Manage users, guides, tours, divisions, tour types, and reviews |
| SUPER_ADMIN | Same as Admin with extended permissions |

---

## 🗂 Folder Structure (Simplified)

```txt
src/
├── app/
│   ├── (commonLayout)
│   ├── (dashboardLayout)
│   │   ├── (commonProtectedLayout)
│   │   ├── (userDashboardLayout)
│   │   │   ├── my-bookings
│   │   │   ├── review
│   │   │   ├── payment-success
│   │   │   ├── payment-fail
│   │   │   └── payment-cancel
│   │   └── admin/
│   ├── auth/
│   ├── allTours/
│   ├── tours/[slug]/
│   ├── bookTour/
│   ├── about-us/
│   ├── contact-us/
│   ├── error.tsx
│   ├── not-found.tsx
│   └── layout.tsx
│
├── components/
│   ├── modules/
│   ├── shared/
│   └── ui/
│
├── hooks/
├── lib/
│   ├── auth-utils.ts
│   ├── jwtHandlers.ts
│   ├── serverFetch.ts
│   ├── navItems.config.ts
│   └── formatters.ts
│
├── services/
│   ├── admin/
│   ├── auth/
│   ├── booking/
│   ├── guide/
│   ├── review/
│   └── user/
│
├── zod/
│   ├── auth.validation.ts
│   ├── booking.validation.ts
│   ├── division.validation.ts
│   ├── tours.validation.ts
│   ├── review.validation.ts
│   └── user.validation.ts
│
├── types/
└── proxy.ts
```

---

## 🔐 Authentication & Route Protection

- JWT-based authentication
- Access & refresh token handling
- Secure cookie-based auth
- Auto token refresh
- Role-based route protection

All routing and auth rules are handled centrally via:

```ts
src/proxy.ts
```

---

## 🧭 Role-Based Navigation

Navigation menus are generated dynamically based on user roles:

- **Common**: Dashboard, Profile
- **User**: My Bookings, Reviews, Download Invoice
- **Guide**: Available Tours, Applications
- **Admin**: User, Guide, Tour, Division & Tour Type Management

Configuration file:
```ts
lib/navItems.config.ts
```

---

## 📦 Key Features

### 🌍 Public
- Tour listing
- Dynamic tour details
- Public reviews & ratings
- About & Contact pages

### 👤 User Dashboard
- Tour booking
- SSLCommerz payment
- Booking history
- Reviews & ratings management
- Invoice download
- Profile & password management

### 🧑‍✈️ Guide Dashboard
- Available tours
- Guide applications
- Profile management

### 🛠 Admin Dashboard
- Admin management
- User management
- Guide management
- Tour management
- Division management
- Tour type management
- Review moderation

---

## ⚙️ Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 🛡 Architecture Principles

- App Router–first architecture
- Feature-based component separation
- Clean service layer
- Centralized auth, payment & review flow
- Role-based UI enforcement
- Scalable dashboard layouts

---

## 📝 License

MIT License

---

## 👤 Author

Developed by **Md. Nazmul Islam**  

