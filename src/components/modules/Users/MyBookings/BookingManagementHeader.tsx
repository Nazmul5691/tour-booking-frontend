"use client";

import BookingFilter from "./BookingFilter";

const BookingManagementHeader = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Bookings</h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage all your tour bookings
                    </p>
                </div>
            </div>

            {/* Filter Component */}
            <BookingFilter />
        </div>
    );
};

export default BookingManagementHeader;