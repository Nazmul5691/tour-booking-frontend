
import UserFilter from "@/components/modules/Admin/UserManagement/usersFilter";
import UserTable from "@/components/modules/Admin/UserManagement/userTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/admin/userManagement";
import { Suspense } from "react";

const AdminUsersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const usersResult = await getAllUsers(queryString);

  const totalPages = Math.ceil(
    (usersResult?.meta?.total || 1) / (usersResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="User Management"
        description="Manage users information and details"
      />

      {/* Search, Filters */}
      <UserFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <UserTable user={usersResult?.data || []} />
        <TablePagination
          currentPage={usersResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminUsersManagementPage;
