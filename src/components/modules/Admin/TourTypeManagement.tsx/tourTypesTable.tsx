"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ITourType, tourTypesColumns } from "./tourTypesColumns";
import { deleteTourType } from "@/services/admin/tourManagement";

interface TourTypesTableProps {
  tourTypes: ITourType[];
}

export default function TourTypesTable({ tourTypes }: TourTypesTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTourType, setDeletingTourType] = useState<ITourType | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => router.refresh());
  };

  const handleDelete = (tourType: ITourType) => {
    setDeletingTourType(tourType);
  };

  const confirmDelete = async () => {
    if (!deletingTourType) return;
    setIsDeletingDialog(true);
    const result = await deleteTourType(deletingTourType._id);
    setIsDeletingDialog(false);

    if (result.success) {
      toast.success(result.message);
      setDeletingTourType(null);
      handleRefresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={tourTypes}
        columns={tourTypesColumns}
        getRowKey={(tourType) => tourType._id}
        onDelete={handleDelete}
        emptyMessage="No tour types found"
      />

      <DeleteConfirmationDialog
        open={!!deletingTourType}
        onOpenChange={(open) => !open && setDeletingTourType(null)}
        onConfirm={confirmDelete}
        title="Delete Tour Type"
        description={`Are you sure you want to delete ${deletingTourType?.name}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
}
