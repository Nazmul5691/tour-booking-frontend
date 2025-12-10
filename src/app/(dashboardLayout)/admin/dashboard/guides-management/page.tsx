




import GuideFilter from "@/components/modules/Admin/GuidesManagement/guideFilter";
import GuideTable from "@/components/modules/Admin/GuidesManagement/guideTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllGuides } from "@/services/admin/guideManagement";
import { Suspense } from "react";


const AdminGuidesManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const guidesResult = await getAllGuides(queryString);

    const totalPages = Math.ceil(
        (guidesResult?.meta?.total || 1) / (guidesResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <ManagementPageHeader
                title="Guides Management"
                description="Manage guides information and details"
            />

            {/* Search, Filters */}
            <GuideFilter />

            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <GuideTable user={guidesResult?.data || []} />
                <TablePagination
                    currentPage={guidesResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminGuidesManagementPage;

