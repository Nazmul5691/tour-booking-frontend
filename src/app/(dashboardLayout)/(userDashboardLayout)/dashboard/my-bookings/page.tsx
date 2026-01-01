// app/my-bookings/page.tsx

import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Suspense } from "react";
import { queryStringFormatter } from "@/lib/formatters";
import BookingManagementHeader from "@/components/modules/Users/MyBookings/BookingManagementHeader";
import BookingsTable from "@/components/modules/Users/MyBookings/BookingsTable";
import { getMyBookings } from "@/services/booking/bookingService";

const MyBookingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // ✅ USE getMyBookings HERE
  const bookingsRes = await getMyBookings(queryString);
  const bookings = bookingsRes?.data ?? [];
  const meta = bookingsRes?.meta;

  return (
    <div className="space-y-6">
      <BookingManagementHeader />
      
      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <BookingsTable bookings={bookings} meta={meta} />
      </Suspense>
    </div>
  );
};

export default MyBookingsPage;