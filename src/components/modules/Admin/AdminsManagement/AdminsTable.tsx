

"use client" 


import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteAdmin } from "@/services/admin/adminsManagement";
import { adminsColumns } from "./adminsColumn";
import AdminViewDetailDialog from "./AdminViewDetailDialog";
import { IUser } from "@/types/user.interface";

interface AdminsTableProps {
  admins: IUser[];
  loggedInUserRole: string; 
}

const AdminsTable = ({ admins, loggedInUserRole }: AdminsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingAdmin, setDeletingAdmin] = useState<IUser | null>(null);
  const [viewingAdmin, setViewingAdmin] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => startTransition(() => router.refresh());

  const handleView = (admin: IUser) => setViewingAdmin(admin);
  const handleDelete = (admin: IUser) => setDeletingAdmin(admin);

  const confirmDelete = async () => {
    if (!deletingAdmin) return;

    if (loggedInUserRole !== "SUPER_ADMIN") {
      toast.error("Only super admin can delete admins");
      setDeletingAdmin(null);
      return;
    }

    setIsDeleting(true);
    const result = await deleteAdmin(deletingAdmin._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Admin deleted successfully");
      setDeletingAdmin(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete admin");
    }
  };

  return (
    <>
      <ManagementTable
        data={admins}
        columns={adminsColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(admin) => admin._id!}
        emptyMessage="No admins found"
      />

      <AdminViewDetailDialog
        open={!!viewingAdmin}
        onClose={() => setViewingAdmin(null)}
        admin={viewingAdmin}
      />

      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={confirmDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminsTable;

