
"use client";

import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import TourViewDialog from "./TourViewDialog";
import { deleteTour } from "@/services/admin/tourManagement";
import { ITour } from "@/types/tour.interface";
import { IDivision } from "@/types/division.interface";
import { TourFormDialog } from "./TourFormDialog";

interface Props {
  tours: ITour[];
  divisions: IDivision[];
  tourTypes: { _id: string; name: string }[];
}

const columns: Column<ITour>[] = [
  { header: "Title", accessor: r => r.title },
  { header: "Location", accessor: r => r.location },
  { header: "Cost", accessor: r => r.costFrom },
];

const ToursTable = ({ tours, divisions, tourTypes }: Props) => {
  const router = useRouter();
  const [, start] = useTransition();
  const [edit, setEdit] = useState<ITour | null>(null);
  const [view, setView] = useState<ITour | null>(null);
  const [del, setDel] = useState<ITour | null>(null);

  const refresh = () => start(() => router.refresh());

  const confirmDelete = async () => {
    if (!del) return;
    const res = await deleteTour(del._id);
    if (res.success) {
      toast.success("Deleted");
      refresh();
    }
    setDel(null);
  };

  return (
    <>
      <ManagementTable
        data={tours}
        columns={columns}
        getRowKey={r => r._id}
        onEdit={setEdit}
        onView={setView}
        onDelete={setDel}
      />

      <TourFormDialog
        // 🚀 FIX: Pass the 'open' and 'onClose' props to control the dialog
        open={!!edit}
        onClose={() => setEdit(null)}
        onSuccess={refresh}
        // 🚀 FIX: Rename the prop from 'tour' to 'initialTourData'
        initialTourData={edit ?? undefined}
        allDivisions={divisions}
        // Pass tourTypes as required by the updated props
        tourTypes={tourTypes}
      />

      <TourViewDialog open={!!view} onClose={() => setView(null)} tour={view} />

      <DeleteConfirmationDialog
        open={!!del}
        onConfirm={confirmDelete}
        onOpenChange={() => setDel(null)}
        title="Delete Tour"
        description="This action cannot be undone"
      />
    </>
  );
};

export default ToursTable;