/* eslint-disable @typescript-eslint/no-explicit-any */
import TourBanner from "@/components/modules/Tours/TourBanner";
import TourFilters from "@/components/modules/Tours/TourFilters";
import TourGrid from "@/components/modules/Tours/TourGrid";
import TourGridHeader from "@/components/modules/Tours/TourGridHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllDivisions } from "@/services/admin/divisionsManagement";
import { getAllTours, getAllTourTypes } from "@/services/admin/tourManagement";
import { Suspense } from "react";
// Import the options definition from the client component to reuse the array


const AllToursPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // Fetch tours, types, and divisions in parallel
  const [toursResponse, tourTypesResponse, divisionsResponse] = await Promise.all([
    getAllTours(queryString),
    getAllTourTypes(),
    getAllDivisions()
  ]);

  const tours = toursResponse?.data || [];
  const tourTypes = tourTypesResponse?.data || [];
  const divisions = divisionsResponse?.data || [];
  const totalTours = toursResponse?.meta?.total || 0;

  // Logic for Tour Count Header Text (Server-side calculation)
  const isFiltered = !!searchParamsObj.division || !!searchParamsObj.tourType || !!searchParamsObj.searchTerm;

  // Check if the current request has a sort parameter applied
  const isSorted = !!searchParamsObj.sort;
  const isFilteredOrSorted = isFiltered || isSorted;

  const countText = isFilteredOrSorted
    ? `Showing ${totalTours} results matching your criteria`
    : `Showing ${totalTours} available tours`;


  return (
    <section>
      <TourBanner />
      <div className="container mx-auto px-5 pb-20 pt-8">

        {/* Page Title Header */}
        <div className="text-center my-8">
          <h1 className="text-3xl md:text-[40px] font-bold text-white drop-shadow-lg mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Our Exclusive Tours
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Filters Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <TourFilters divisionOption={divisions.map((d: any) => ({ value: d._id, label: d.name }))}
              tourTypeOptions={tourTypes.map((t: any) => ({ value: t._id, label: t.name }))}
              divisionIsLoading={false}
              tourTypeIsLoading={false}  />
          </div>

          <div className="col-span-12 md:col-span-9">

            {/* Header: Tour Count + Sort By (Client Component handles interaction) */}
            <TourGridHeader
              countText={countText}
            // Sort logic is now internal to TourGridHeader.tsx
            />

            {/* tour grid */}
            <Suspense fallback={<TableSkeleton columns={3} />}>
              <TourGrid tours={tours} tourTypes={tourTypes} />
            </Suspense>

          </div>

        </div>

        <div className="pt-20">
          <TablePagination
            currentPage={toursResponse?.meta?.page || 1}
            totalPages={toursResponse?.meta?.totalPage || 1}
          />
        </div>

      </div>
    </section>
  );
};

export default AllToursPage;