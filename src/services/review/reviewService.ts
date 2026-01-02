/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface ICreateTourReview {
  booking: string;
  tour: string;
  rating: number;
  comment?: string;
}

export interface ICreateGuideReview {
  booking: string;
  guide: string;
  rating: number;
  comment?: string;
}

export async function createTourReview(payload: ICreateTourReview) {
  try {
    const response = await serverFetch.post("/review/create-tour-review", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit tour review");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Create tour review error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit tour review",
    };
  }
}

export async function createGuideReview(payload: ICreateGuideReview) {
  try {
    const response = await serverFetch.post("/review/create-guide-review", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit guide review");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Create guide review error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit guide review",
    };
  }
}

export async function getBookingForReview(bookingId: string) {
  try {
    const response = await serverFetch.get(`/booking/${bookingId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch booking details");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Get booking error:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch booking",
      data: null,
    };
  }
}