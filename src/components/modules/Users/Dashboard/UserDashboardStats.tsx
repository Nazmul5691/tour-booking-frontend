/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Star, 
  FileText, 
  Clock, 
  CheckCircle2,
  XCircle,
  TrendingUp
} from "lucide-react";
import { getMyBookings } from "@/services/booking/bookingService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  pendingReviews: number;
  totalReviews: number;
  totalSpent: number;
}

export default function UserDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    pendingReviews: 0,
    totalReviews: 0,
    totalSpent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getMyBookings();
      const bookings = response?.data || [];

      // Calculate stats from bookings data
      const totalBookings = bookings.length;
      const completedBookings = bookings.filter(
        (b: any) => b.status === "COMPLETE"
      ).length;
      const pendingBookings = bookings.filter(
        (b: any) => b.status === "PENDING"
      ).length;
      const cancelledBookings = bookings.filter(
        (b: any) => b.status === "CANCEL" || b.status === "FAILED"
      ).length;

      // Calculate reviews
      const completedWithReview = bookings.filter(
        (b: any) => b.status === "COMPLETE" && b.hasReview
      ).length;
      const completedWithoutReview = bookings.filter(
        (b: any) => b.status === "COMPLETE" && !b.hasReview
      ).length;

      // Calculate total spent (from completed bookings with payment)
      const totalSpent = bookings
        .filter((b: any) => b.status === "COMPLETE" && b.payment?.amount)
        .reduce((sum: number, b: any) => sum + (b.payment?.amount || 0), 0);

      setStats({
        totalBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        pendingReviews: completedWithoutReview,
        totalReviews: completedWithReview,
        totalSpent,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "All time bookings",
    },
    {
      title: "Completed Tours",
      value: stats.completedBookings,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Successfully completed",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Awaiting confirmation",
    },
    {
      title: "Cancelled/Failed",
      value: stats.cancelledBookings,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Unsuccessful bookings",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Tours waiting for review",
    },
    {
      title: "Reviews Given",
      value: stats.totalReviews,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Total reviews submitted",
    },
    {
      title: "Total Spent",
      value: `৳${stats.totalSpent.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Lifetime spending",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Your booking statistics and activity summary
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/dashboard/my-bookings"
              className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
            >
              <Calendar className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">My Bookings</h3>
              <p className="text-sm text-muted-foreground">
                View and manage your bookings
              </p>
            </a>

            <Link
              href="/dashboard/review"
              className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
            >
              <Star className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Write Reviews</h3>
              <p className="text-sm text-muted-foreground">
                Share your tour experiences
              </p>
            </Link>

            <a
              href="/allTours"
              className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Browse Tours</h3>
              <p className="text-sm text-muted-foreground">
                Discover new adventures
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}