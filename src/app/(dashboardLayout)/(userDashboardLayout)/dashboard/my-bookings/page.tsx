// app/admin/dashboard/tour-management/page.tsx
import TourFilters from "@/components/modules/Admin/TourManagement/TourFilters";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Suspense } from "react";
import { getAllTours, getAllTourTypes } from "@/services/admin/tourManagement";
import ToursTable from "@/components/modules/Admin/TourManagement/tourTable";
import { getAllDivisions } from "@/services/admin/divisionsManagement";
import { queryStringFormatter } from "@/lib/formatters";
import TourManagementHeader from "@/components/modules/Admin/TourManagement/toursManagementHeader";

const MyBookingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const toursRes = await getAllTours(queryString);
  const divisionsRes = await getAllDivisions();
  const tourTypesRes = await getAllTourTypes();

  const tours = toursRes?.data ?? [];
  const divisions = divisionsRes?.data ?? [];
  const tourTypes = tourTypesRes?.data ?? [];



  return (
    <div className="space-y-6">
      {/* <TourManagementHeader
        divisions={divisions}
        tourTypes={tourTypes}
      />
      <TourFilters divisions={divisions} tourTypes={tourTypes} />
      
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <ToursTable tours={tours} divisions={divisions} tourTypes={tourTypes} />
      </Suspense> */}

        <h1>This is my bookings page</h1>
    </div>
  );
};

export default MyBookingsPage;
