
import TourTypesManagementHeader from "@/components/modules/Admin/TourTypeManagement.tsx/tourTypesManagementHeader";
import TourTypesTable from "@/components/modules/Admin/TourTypeManagement.tsx/tourTypesTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllTourTypes } from "@/services/admin/tourManagement";
import { Suspense } from "react";

const AdminTourTypesManagementPage = async () => {
  const result = await getAllTourTypes();
  return (
    <div className="space-y-6">
      <TourTypesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        
        <TourTypesTable tourTypes={result.data} />
      </Suspense>
    </div>
  );
};

export default AdminTourTypesManagementPage;