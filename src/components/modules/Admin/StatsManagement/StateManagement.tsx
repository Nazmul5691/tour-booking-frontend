/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
    Users,
    MapPin,
    Calendar,
    CreditCard,
    TrendingUp,
    DollarSign,
    UserCheck,
    UserX,
    ShieldBan,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { getAllStats } from "@/services/admin/statsManagement";

export default function AllStats() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const data = await getAllStats();

            if (
                !data.userStats.success ||
                !data.tourStats.success ||
                !data.bookingStats.success ||
                !data.paymentStats.success
            ) {
                toast.error("Failed to load some statistics");
            }

            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
            toast.error("Failed to load dashboard statistics");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return `৳${amount.toLocaleString()}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Failed to load dashboard data</p>
            </div>
        );
    }

    const userStats = stats.userStats.data;
    const tourStats = stats.tourStats.data;
    const bookingStats = stats.bookingStats.data;
    const paymentStats = stats.paymentStats.data;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    Overview of your tour booking platform
                </p>
            </div>

            {/* USER STATISTICS */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    User Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {userStats?.totalUsers || 0}
                                </p>
                            </div>
                            <Users className="w-12 h-12 text-blue-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {userStats?.totalActiveUsers || 0}
                                </p>
                            </div>
                            <UserCheck className="w-12 h-12 text-green-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Inactive Users</p>
                                <p className="text-3xl font-bold text-yellow-600">
                                    {userStats?.totalInActiveUsers || 0}
                                </p>
                            </div>
                            <UserX className="w-12 h-12 text-yellow-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Blocked Users</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {userStats?.totalBlockedUsers || 0}
                                </p>
                            </div>
                            <ShieldBan className="w-12 h-12 text-red-500 opacity-20" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-700 mb-1 font-medium">
                                    New Users (Last 7 Days)
                                </p>
                                <p className="text-2xl font-bold text-blue-900">
                                    {userStats?.newUsersInLast7Days || 0}
                                </p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-700 mb-1 font-medium">
                                    New Users (Last 30 Days)
                                </p>
                                <p className="text-2xl font-bold text-purple-900">
                                    {userStats?.newUsersInLast30Days || 0}
                                </p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Users by Role - FIX: Add null check */}
                {userStats?.usersByRole && userStats.usersByRole.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Users by Role
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {userStats.usersByRole.map((role: any) => (
                                <div
                                    key={role._id}
                                    className="bg-gray-50 rounded-lg p-4 text-center"
                                >
                                    <p className="text-sm text-gray-600 mb-1 uppercase">
                                        {role._id}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {role.count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* TOUR STATISTICS */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Tour Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Tours</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {tourStats?.totalTour || 0}
                                </p>
                            </div>
                            <MapPin className="w-12 h-12 text-indigo-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Average Tour Cost</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {formatCurrency(
                                        tourStats?.avgTourCost?.[0]?.avgCostFrom || 0
                                    )}
                                </p>
                            </div>
                            <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Tours by Type - FIX: Add null check */}
                {tourStats?.totalTourByTourType && tourStats.totalTourByTourType.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Tours by Type
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {tourStats.totalTourByTourType.map((type: any) => (
                                <div
                                    key={type._id}
                                    className="bg-indigo-50 rounded-lg p-4 text-center"
                                >
                                    <p className="text-sm text-indigo-700 mb-1 font-medium">
                                        {type._id}
                                    </p>
                                    <p className="text-2xl font-bold text-indigo-900">
                                        {type.count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tours by Division - FIX: Add null check */}
                {tourStats?.totalTourByDivision && tourStats.totalTourByDivision.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Tours by Division
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {tourStats.totalTourByDivision.map((division: any) => (
                                <div
                                    key={division._id}
                                    className="bg-green-50 rounded-lg p-4 text-center"
                                >
                                    <p className="text-sm text-green-700 mb-1 font-medium">
                                        {division._id}
                                    </p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {division.count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Top Booked Tours - FIX: Add null check */}
                {tourStats?.totalHighestBookedTour && tourStats.totalHighestBookedTour.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Top 5 Booked Tours
                        </h3>
                        <div className="space-y-3">
                            {tourStats.totalHighestBookedTour.map(
                                (tour: any, index: number) => (
                                    <div
                                        key={tour._id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {tour.tour.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {tour.tour.slug}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
                                            {tour.bookingCount} bookings
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* BOOKING STATISTICS */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Booking Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {bookingStats?.totalBooking || 0}
                                </p>
                            </div>
                            <Calendar className="w-12 h-12 text-orange-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Avg Guest Count</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {typeof bookingStats?.avgGuestCountPerBooking === 'number' 
                                        ? bookingStats.avgGuestCountPerBooking.toFixed(1) 
                                        : '0'}
                                </p>
                            </div>
                            <Users className="w-12 h-12 text-cyan-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Unique Users</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {bookingStats?.totalBookingByUniqueUsers || 0}
                                </p>
                            </div>
                            <UserCheck className="w-12 h-12 text-teal-500 opacity-20" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-orange-700 mb-1 font-medium">
                                    Bookings (Last 7 Days)
                                </p>
                                <p className="text-2xl font-bold text-orange-900">
                                    {bookingStats?.bookingsLast7Days || 0}
                                </p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-orange-600" />
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-cyan-50 to-cyan-100 rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-cyan-700 mb-1 font-medium">
                                    Bookings (Last 30 Days)
                                </p>
                                <p className="text-2xl font-bold text-cyan-900">
                                    {bookingStats?.bookingsLast30Days || 0}
                                </p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-cyan-600" />
                        </div>
                    </div>
                </div>

                {/* Bookings by Status - FIX: Add null check */}
                {bookingStats?.totalBookingByStatus && bookingStats.totalBookingByStatus.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Bookings by Status
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {bookingStats.totalBookingByStatus.map((status: any) => {
                                const statusColors: any = {
                                    PENDING: "bg-yellow-50 text-yellow-700",
                                    COMPLETE: "bg-green-50 text-green-700",
                                    CANCEL: "bg-red-50 text-red-700",
                                    FAILED: "bg-gray-50 text-gray-700",
                                };

                                return (
                                    <div
                                        key={status._id}
                                        className={`${
                                            statusColors[status._id] || "bg-gray-50 text-gray-700"
                                        } rounded-lg p-4 text-center`}
                                    >
                                        <p className="text-sm mb-1 font-medium">{status._id}</p>
                                        <p className="text-2xl font-bold">{status.count}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>

            {/* PAYMENT STATISTICS */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Payments</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {paymentStats?.totalPayment || 0}
                                </p>
                            </div>
                            <CreditCard className="w-12 h-12 text-blue-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-white mb-1 font-medium opacity-90">
                                    Total Revenue
                                </p>
                                <p className="text-3xl font-bold text-white">
                                    {formatCurrency(
                                        paymentStats?.totalRevenue?.[0]?.totalRevenue || 0
                                    )}
                                </p>
                            </div>
                            <DollarSign className="w-12 h-12 text-white opacity-30" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Avg Payment</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {formatCurrency(
                                        paymentStats?.avgPaymentAmount?.[0]?.avgPaymentAMount || 0
                                    )}
                                </p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Payments by Status - FIX: Add null check */}
                {paymentStats?.totalPaymentByStatus && paymentStats.totalPaymentByStatus.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Payments by Status
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {paymentStats.totalPaymentByStatus.map((status: any) => {
                                const statusColors: any = {
                                    PAID: "bg-green-50 text-green-700",
                                    UNPAID: "bg-yellow-50 text-yellow-700",
                                    FAILED: "bg-red-50 text-red-700",
                                    CANCELLED: "bg-gray-50 text-gray-700",
                                };

                                return (
                                    <div
                                        key={status._id}
                                        className={`${
                                            statusColors[status._id] || "bg-gray-50 text-gray-700"
                                        } rounded-lg p-4 text-center`}
                                    >
                                        <p className="text-sm mb-1 font-medium">{status._id}</p>
                                        <p className="text-2xl font-bold">{status.count}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}