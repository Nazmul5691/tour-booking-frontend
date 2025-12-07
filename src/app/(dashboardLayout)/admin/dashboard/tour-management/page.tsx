

import TourFilters from "@/components/modules/Admin/TourManagement/TourFilters";
import ToursTable from "@/components/modules/Admin/TourManagement/tourTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllTours } from "@/services/admin/tourManagement";
import { Suspense } from "react";

const AdminTourManagementPage = async () => {
  const result = await getAllTours();
  const tours = result.data || [];

  // fetch divisions & tourTypes as well
  const divisions = result.divisions || [];
  const tourTypes = result.tourTypes || [];

  return (
    <div className="space-y-6">
      <TourFilters divisions={divisions} tourTypes={tourTypes} />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <ToursTable tours={tours} divisions={divisions} tourTypes={tourTypes} />
      </Suspense>
    </div>
  );
};

export default AdminTourManagementPage;
