


"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteDivision } from "@/services/admin/divisionsManagement";
import { IDivision } from "@/types/division.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { divisionsColumns } from "./divisionsColoumns";

interface DivisionsTableProps {
  divisions: IDivision[];
}

const DivisionsTable = ({ divisions }: DivisionsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDivision, setDeletingDivision] =
    useState<IDivision | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingDivision) return;
    setIsDeleting(true);

    const result = await deleteDivision(deletingDivision._id);

    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message || "Division deleted");
      setDeletingDivision(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete division");
    }
  };

  return (
    <>
      <ManagementTable
        data={divisions}
        columns={divisionsColumns}
        onDelete={setDeletingDivision}
        getRowKey={(division) => division._id}
        emptyMessage="No divisions found"
      />

      <DeleteConfirmationDialog
        open={!!deletingDivision}
        onOpenChange={(open) => !open && setDeletingDivision(null)}
        onConfirm={confirmDelete}
        title="Delete Division"
        description={`Are you sure you want to delete ${deletingDivision?.name}?`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default DivisionsTable;
