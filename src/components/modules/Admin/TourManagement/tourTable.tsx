/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TourFormDialog from "./TourFormDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteTour } from "@/services/admin/tourManagement";
import TourViewDialog from "./TourViewDialog";
import { ITour } from "@/types/tour.interface";

interface ToursTableProps {
  tours: any[];
  divisions?: { id: string; title: string }[];
  tourTypes?: { id: string; name: string }[];
}

const toursColumns: Column<ITour>[] = [
  {
    header: "Title",
    accessor: (row) => row.title,
  },
  {
    header: "Location",
    accessor: (row) => row.location,
  },
  {
    header: "Cost From",
    accessor: (row) => row.costFrom,
  },
  {
    header: "Start Date",
    accessor: (row) => row.startDate,
  },
  {
    header: "Max Guest",
    accessor: (row) => row.endDate,
  }

];

// export const toursColumns = [
//   { 
//     header: "Title", 
//     accessor: (row) => row.title 
//   },
//   { header: "Location", accessor: (row) => row.location },
//   { header: "Cost From", accessor: (row) => row.costFrom },
//   { header: "Start Date", accessor: (row) => row.startDate },
//   { header: "Max Guest", accessor: (row) => row.startDate },
// ];

const ToursTable = ({ tours, divisions, tourTypes }: ToursTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editingTour, setEditingTour] = useState<any>(null);
  const [viewingTour, setViewingTour] = useState<any>(null);
  const [deletingTour, setDeletingTour] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => startTransition(() => router.refresh());

  const confirmDelete = async () => {
    if (!deletingTour) return;
    setIsDeleting(true);
    const result = await deleteTour(deletingTour.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tour deleted successfully");
      setDeletingTour(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete tour");
    }
  };

  return (
    <>
      <ManagementTable
        data={tours}
        columns={toursColumns}
        onView={setViewingTour}
        onEdit={setEditingTour}
        onDelete={setDeletingTour}
        getRowKey={(tour) => tour._id}
        emptyMessage="No tours found"
      />

      <TourFormDialog
        open={!!editingTour}
        onClose={() => setEditingTour(null)}
        onSuccess={() => {
          setEditingTour(null);
          handleRefresh();
        }}
        tour={editingTour}
        divisions={divisions?.map((d) => ({ _id: d.id, name: d.title })) || []} // <-- mapped to IDivision[]
        tourTypes={tourTypes?.map((t) => ({ _id: t.id, name: t.name })) || []}
      />

      <TourViewDialog
        open={!!viewingTour}
        onClose={() => setViewingTour(null)}
        tour={viewingTour}
      />

      <DeleteConfirmationDialog
        open={!!deletingTour}
        onOpenChange={(open) => !open && setDeletingTour(null)}
        onConfirm={confirmDelete}
        title="Delete Tour"
        description={`Are you sure you want to delete tour "${deletingTour?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ToursTable;
