"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteUser } from "@/services/admin/userManagement";
import { IUser } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { userColumns } from "./userColumns";
// import UserFormDialog from "./userFormDialog";
import UserViewDetailDialog from "./userViewDetailDialog";

interface UsersTableProps {
  user: IUser[];
}

const UserTable = ({ user }: UsersTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  // const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: IUser) => {
    setViewingUser(user);
  };

  // const handleEdit = (patient: IUser) => {
  //   setEditingUser(patient);
  // };

  const handleDelete = (patient: IUser) => {
    setDeletingUser(patient);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;

    setIsDeleting(true);
    const result = await deleteUser(deletingUser._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  return (
    <>
      <ManagementTable
        data={user}
        columns={userColumns}
        onView={handleView}
        // onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(user) => user._id!}
        emptyMessage="No user found"
      />

      {/* Edit Patient Form Dialog */}
      {/* <UserFormDialog
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        user={editingUser!}
        onSuccess={() => {
          // setEditingUser(null);
          handleRefresh();
        }}
      /> */}

      {/* View Patient Detail Dialog */}
      <UserViewDetailDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserTable;
