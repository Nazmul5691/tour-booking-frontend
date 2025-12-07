"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import TourTypesFormDialog from "./tourTypesFormDialog";

export default function TourTypesManagementHeader() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSuccess = () => {
    startTransition(() => router.refresh());
  };

  return (
    <>
      <TourTypesFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Tour Types Management"
        description="Manage all tour types"
        action={{
          label: "Add Tour Type",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
}
