
import DivisionsManagementHeader from "@/components/modules/Admin/DivisionsManagement/divisionsManagementHeader";
import DivisionsTable from "@/components/modules/Admin/DivisionsManagement/divisionsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllDivisions } from "@/services/admin/divisionsManagement";
import { Suspense } from "react";

const AdminDivisionsManagementPage = async () => {
  const result = await getAllDivisions();
  return (
    <div className="space-y-6">
      <DivisionsManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        
        <DivisionsTable divisions={result.data} />
      </Suspense>
    </div>
  );
};

export default AdminDivisionsManagementPage;