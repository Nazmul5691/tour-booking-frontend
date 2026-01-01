// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import ManagementTable, { Column } from "@/components/shared/ManagementTable";
// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import BookingViewDialog from "./BookingViewDialog";
// import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
// import { Badge } from "@/components/ui/badge";
// import { cancelBooking, IBooking, IBookingMeta } from "@/services/booking/bookingService";
// import TablePagination from "@/components/shared/TablePagination";

// interface Props {
//   bookings: IBooking[];
//   meta?: IBookingMeta;
// }

// const columns: Column<IBooking>[] = [
//   { 
//     header: "Tour", 
//     accessor: (r) => r.tour.title 
//   },
//   { 
//     header: "Location", 
//     accessor: (r) => r.tour.location 
//   },
//   { 
//     header: "Guests", 
//     accessor: (r) => r.guestCount 
//   },
//   { 
//     header: "Amount", 
//     accessor: (r) => `৳${r.amountAfterDiscount?.toLocaleString() || 0}` 
//   },
//   { 
//     header: "Status", 
//     accessor: (r) => r,
//     render: (booking: any) => {
//       const statusColors: Record<string, string> = {
//         PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
//         COMPLETE: "bg-green-500/10 text-green-600 border-green-500/20",
//         FAILED: "bg-red-500/10 text-red-600 border-red-500/20",
//         CANCEL: "bg-gray-500/10 text-gray-600 border-gray-500/20",
//       };
      
//       return (
//         <Badge variant="outline" className={statusColors[booking.status]}>
//           {booking.status}
//         </Badge>
//       );
//     }
//   },
//   { 
//     header: "Date", 
//     accessor: (r) => new Date(r.createdAt || "").toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   },
// ];

// const BookingsTable = ({ bookings, meta }: Props) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [view, setView] = useState<IBooking | null>(null);
//   const [cancelItem, setCancelItem] = useState<IBooking | null>(null);

//   const refresh = () => startTransition(() => router.refresh());

//   // ✅ USE cancelBooking HERE
//   const confirmCancel = async () => {
//     if (!cancelItem) return;
    
//     try {
//       const result = await cancelBooking(cancelItem._id);
      
//       if (result.success) {
//         toast.success("Booking cancelled successfully");
//         refresh();
//       } else {
//         toast.error(result.message || "Failed to cancel booking");
//       }
//     } catch (error: any) {
//       toast.error(error.message || "Failed to cancel booking");
//     }
    
//     setCancelItem(null);
//   };

//   const handleDelete = (booking: IBooking) => {
//     // Only allow cancellation for PENDING bookings
//     if (booking.status === "PENDING") {
//       setCancelItem(booking);
//     } else {
//       toast.error("Only pending bookings can be cancelled");
//     }
//   };

//   return (
//     <>
//       <ManagementTable
//         data={bookings}
//         columns={columns}
//         getRowKey={(r) => r._id}
//         onView={setView}
//         onDelete={handleDelete}
//         // hideEdit={true}
//       />

//       {/* Pagination */}
//       {meta && meta.totalPage > 1 && (
//         <div className="mt-6">
//           <TablePagination
//             currentPage={meta.page}
//             totalPages={meta.totalPage}
//           />
//         </div>
//       )}

//       {/* View Dialog */}
//       <BookingViewDialog 
//         open={!!view} 
//         onClose={() => setView(null)} 
//         booking={view} 
//       />

//       {/* Cancel Confirmation Dialog */}
//       <DeleteConfirmationDialog
//         open={!!cancelItem}
//         onConfirm={confirmCancel}
//         onOpenChange={() => setCancelItem(null)}
//         title="Cancel Booking"
//         description="Are you sure you want to cancel this booking? This action cannot be undone."
//       />
//     </>
//   );
// };

// export default BookingsTable;




/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BookingViewDialog from "./BookingViewDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { cancelBooking, IBooking, IBookingMeta } from "@/services/booking/bookingService";
import TablePagination from "@/components/shared/TablePagination";

interface Props {
  bookings: IBooking[];
  meta?: IBookingMeta;
}

const columns: Column<IBooking>[] = [
  { 
    header: "Tour", 
    accessor: (r) => r.tour.title 
  },
  { 
    header: "Location", 
    accessor: (r) => r.tour.location 
  },
  { 
    header: "Guests", 
    accessor: (r) => r.guestCount 
  },
  { 
    header: "Amount", 
    accessor: (r) => `৳${r.amountAfterDiscount?.toLocaleString() || 0}` 
  },
  { 
    header: "Status",
    accessor: (booking) => {
      const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        COMPLETE: "bg-green-500/10 text-green-600 border-green-500/20",
        FAILED: "bg-red-500/10 text-red-600 border-red-500/20",
        CANCEL: "bg-gray-500/10 text-gray-600 border-gray-500/20",
      };
      
      return (
        <Badge variant="outline" className={statusColors[booking.status]}>
          {booking.status}
        </Badge>
      );
    }
  },
  { 
    header: "Date", 
    accessor: (r) => new Date(r.createdAt || "").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  },
];

const BookingsTable = ({ bookings, meta }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState<IBooking | null>(null);
  const [cancelItem, setCancelItem] = useState<IBooking | null>(null);

  const refresh = () => startTransition(() => router.refresh());

  const confirmCancel = async () => {
    if (!cancelItem) return;
    
    try {
      const result = await cancelBooking(cancelItem._id);
      
      if (result.success) {
        toast.success("Booking cancelled successfully");
        refresh();
      } else {
        toast.error(result.message || "Failed to cancel booking");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel booking");
    }
    
    setCancelItem(null);
  };

  const handleDelete = (booking: IBooking) => {
    // Only allow cancellation for PENDING bookings
    if (booking.status === "PENDING") {
      setCancelItem(booking);
    } else {
      toast.error("Only pending bookings can be cancelled");
    }
  };

  return (
    <>
      <ManagementTable
        data={bookings}
        columns={columns}
        getRowKey={(r) => r._id}
        onView={setView}
        // onDelete={handleDelete}
      />

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="mt-6">
          <TablePagination
            currentPage={meta.page}
            totalPages={meta.totalPage}
          />
        </div>
      )}

      {/* View Dialog */}
      <BookingViewDialog 
        open={!!view} 
        onClose={() => setView(null)} 
        booking={view} 
      />

      {/* Cancel Confirmation Dialog */}
      {/* <DeleteConfirmationDialog
        open={!!cancelItem}
        onConfirm={confirmCancel}
        onOpenChange={() => setCancelItem(null)}
        title="Cancel Booking"
        description="Are you sure you want to cancel this booking? This action cannot be undone."
      /> */}
    </>
  );
};

export default BookingsTable;