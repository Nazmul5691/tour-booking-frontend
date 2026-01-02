/* eslint-disable @typescript-eslint/no-explicit-any */
// components/modules/Guide/GuideDashboard.tsx
"use client";

import { Wallet, MapPin, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

interface IGuideStats {
    walletBalance: number;
    totalTours: number;
    pendingApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    totalApplications: number;
    availableTours: number;
}

interface GuideDashboardProps {
    stats: IGuideStats | null;
    guideInfo: any;
    userInfo: any;
}

export default function GuideDashboard({ stats, guideInfo, userInfo }: GuideDashboardProps) {
    const formatCurrency = (amount: number) => {
        return `৳${amount.toLocaleString()}`;
    };

    if (!stats) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">Failed to load dashboard stats</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {userInfo.name}!</h2>
                <p className="text-blue-100">
                    {guideInfo?.bio || "Manage your tours and track your earnings"}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Wallet Balance */}
                <Link href="/guide/wallet">
                    <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm mb-1">Wallet Balance</p>
                                <p className="text-3xl font-bold">
                                    {formatCurrency(stats.walletBalance)}
                                </p>
                            </div>
                            <Wallet className="w-12 h-12 text-white opacity-80" />
                        </div>
                    </div>
                </Link>

                {/* Available Tours */}
                <Link href="/guide/available-tours">
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Available Tours</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.availableTours}
                                </p>
                            </div>
                            <MapPin className="w-12 h-12 text-blue-500 opacity-50" />
                        </div>
                    </div>
                </Link>

                {/* Total Applications */}
                <Link href="/guide/my-applications">
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Applications</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.totalApplications}
                                </p>
                            </div>
                            <FileText className="w-12 h-12 text-purple-500 opacity-50" />
                        </div>
                    </div>
                </Link>

                {/* Pending Applications */}
                <div className="bg-white rounded-lg p-6 shadow-md border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Pending Applications</p>
                            <p className="text-3xl font-bold text-yellow-600">
                                {stats.pendingApplications}
                            </p>
                        </div>
                        <Clock className="w-12 h-12 text-yellow-500 opacity-50" />
                    </div>
                </div>
            </div>

            {/* Application Status Breakdown */}
            <div className="bg-white rounded-lg p-6 shadow-md border">
                <h3 className="text-xl font-semibold mb-4">Application Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div>
                            <p className="text-sm text-green-700 mb-1">Approved</p>
                            <p className="text-2xl font-bold text-green-600">
                                {stats.approvedApplications}
                            </p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div>
                            <p className="text-sm text-yellow-700 mb-1">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {stats.pendingApplications}
                            </p>
                        </div>
                        <Clock className="w-10 h-10 text-yellow-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div>
                            <p className="text-sm text-red-700 mb-1">Rejected</p>
                            <p className="text-2xl font-bold text-red-600">
                                {stats.rejectedApplications}
                            </p>
                        </div>
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-md border">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/guide/dashboard/available-tours"
                        className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        <MapPin className="w-8 h-8 text-blue-600 mb-2" />
                        <h4 className="font-semibold text-gray-900">View Tours</h4>
                        <p className="text-sm text-gray-600">Browse available tours</p>
                    </Link>

                    <Link
                        href="/guide/dashboard/my-applications"
                        className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                        <FileText className="w-8 h-8 text-purple-600 mb-2" />
                        <h4 className="font-semibold text-gray-900">My Applications</h4>
                        <p className="text-sm text-gray-600">Track application status</p>
                    </Link>

                    {/* <Link
                        href="/guide/wallet"
                        className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                    >
                        <Wallet className="w-8 h-8 text-green-600 mb-2" />
                        <h4 className="font-semibold text-gray-900">Wallet</h4>
                        <p className="text-sm text-gray-600">View earnings history</p>
                    </Link> */}
                </div>
            </div>

            {/* Guide Info Card */}
            {guideInfo && (
                <div className="bg-white rounded-lg p-6 shadow-md border">
                    <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Experience</p>
                            <p className="text-lg font-semibold">
                                {guideInfo.experienceYears || 0} years
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Languages</p>
                            <p className="text-lg font-semibold">
                                {guideInfo.languages?.length || 0}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Rating</p>
                            <p className="text-lg font-semibold">
                                ⭐ {guideInfo.averageRating?.toFixed(1) || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Reviews</p>
                            <p className="text-lg font-semibold">
                                {guideInfo.totalReviews || 0}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}