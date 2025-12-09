// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import ManagementTable, { Column } from "@/components/shared/ManagementTable";
// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import TourFormDialog from "./TourFormDialog";
// import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
// import { deleteTour } from "@/services/admin/tourManagement";
// import TourViewDialog from "./TourViewDialog";
// import { ITour } from "@/types/tour.interface";

// interface ToursTableProps {
//   tours: any[];
//   divisions?: { id: string; title: string }[];
//   tourTypes?: { id: string; name: string }[];
// }

// const toursColumns: Column<ITour>[] = [
//   {
//     header: "Title",
//     accessor: (row) => row.title,
//   },
//   {
//     header: "Location",
//     accessor: (row) => row.location,
//   },
//   {
//     header: "Cost From",
//     accessor: (row) => row.costFrom,
//   },
//   {
//     header: "Start Date",
//     accessor: (row) => row.startDate,
//   },
//   {
//     header: "Max Guest",
//     accessor: (row) => row.endDate,
//   }

// ];

// // export const toursColumns = [
// //   { 
// //     header: "Title", 
// //     accessor: (row) => row.title 
// //   },
// //   { header: "Location", accessor: (row) => row.location },
// //   { header: "Cost From", accessor: (row) => row.costFrom },
// //   { header: "Start Date", accessor: (row) => row.startDate },
// //   { header: "Max Guest", accessor: (row) => row.startDate },
// // ];

// const ToursTable = ({ tours, divisions, tourTypes }: ToursTableProps) => {
//   const router = useRouter();
//   const [, startTransition] = useTransition();
//   const [editingTour, setEditingTour] = useState<any>(null);
//   const [viewingTour, setViewingTour] = useState<any>(null);
//   const [deletingTour, setDeletingTour] = useState<any>(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleRefresh = () => startTransition(() => router.refresh());

//   const confirmDelete = async () => {
//     if (!deletingTour) return;
//     setIsDeleting(true);
//     const result = await deleteTour(deletingTour.id);
//     setIsDeleting(false);

//     if (result.success) {
//       toast.success(result.message || "Tour deleted successfully");
//       setDeletingTour(null);
//       handleRefresh();
//     } else {
//       toast.error(result.message || "Failed to delete tour");
//     }
//   };

//   return (
//     <>
//       <ManagementTable
//         data={tours}
//         columns={toursColumns}
//         onView={setViewingTour}
//         onEdit={setEditingTour}
//         onDelete={setDeletingTour}
//         getRowKey={(tour) => tour._id}
//         emptyMessage="No tours found"
//       />

//       <TourFormDialog
//         open={!!editingTour}
//         onClose={() => setEditingTour(null)}
//         onSuccess={() => {
//           setEditingTour(null);
//           handleRefresh();
//         }}
//         tour={editingTour}
//         divisions={divisions?.map((d) => ({ _id: d.id, name: d.title })) || []} // <-- mapped to IDivision[]
//         tourTypes={tourTypes?.map((t) => ({ _id: t.id, name: t.name })) || []}
//       />

//       <TourViewDialog
//         open={!!viewingTour}
//         onClose={() => setViewingTour(null)}
//         tour={viewingTour}
//       />

//       <DeleteConfirmationDialog
//         open={!!deletingTour}
//         onOpenChange={(open) => !open && setDeletingTour(null)}
//         onConfirm={confirmDelete}
//         title="Delete Tour"
//         description={`Are you sure you want to delete tour "${deletingTour?.title}"? This action cannot be undone.`}
//         isDeleting={isDeleting}
//       />
//     </>
//   );
// };

// export default ToursTable;








// "use client";

// import ManagementTable, { Column } from "@/components/shared/ManagementTable";
// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
// import TourViewDialog from "./TourViewDialog";
// import { deleteTour } from "@/services/admin/tourManagement";
// import { ITour } from "@/types/tour.interface";
// import { IDivision } from "@/types/division.interface";
// import { TourFormDialog } from "./TourFormDialog";

// interface Props {
//   tours: ITour[];
//   divisions: IDivision[];
//   tourTypes: { _id: string; name: string }[];
// }

// const columns: Column<ITour>[] = [
//   { header: "Title", accessor: r => r.title },
//   { header: "Location", accessor: r => r.location },
//   { header: "Cost", accessor: r => r.costFrom },
// ];

// const ToursTable = ({ tours, divisions, tourTypes }: Props) => {
//   const router = useRouter();
//   const [, start] = useTransition();
//   const [edit, setEdit] = useState<ITour | null>(null);
//   const [view, setView] = useState<ITour | null>(null);
//   const [del, setDel] = useState<ITour | null>(null);

//   const refresh = () => start(() => router.refresh());

//   const confirmDelete = async () => {
//     if (!del) return;
//     const res = await deleteTour(del._id);
//     if (res.success) {
//       toast.success("Deleted");
//       refresh();
//     }
//     setDel(null);
//   };

//   return (
//     <>
//       <ManagementTable
//         data={tours}
//         columns={columns}
//         getRowKey={r => r._id}
//         onEdit={setEdit}
//         onView={setView}
//         onDelete={setDel}
//       />

//       <TourFormDialog
//         open={!!edit}
//         onClose={() => setEdit(null)}
//         onSuccess={refresh}
//         tour={edit ?? undefined}
//         divisions={divisions}
//         tourTypes={tourTypes}
//       />

//       <TourViewDialog open={!!view} onClose={() => setView(null)} tour={view} />

//       <DeleteConfirmationDialog
//         open={!!del}
//         onConfirm={confirmDelete}
//         onOpenChange={() => setDel(null)}
//         title="Delete Tour"
//         description="This action cannot be undone"
//       />
//     </>
//   );
// };

// export default ToursTable;






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