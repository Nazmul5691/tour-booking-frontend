




"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DivisionsFormDialog from "./divisionsFormDialog";

const DivisionsManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <DivisionsFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Divisions Management"
        description="Manage divisions information and details"
        action={{
          label: "Add Division",
          icon: Plus,
          onClick: () => {
            setDialogKey((prev) => prev + 1);
            setIsDialogOpen(true);
          },
        }}
      />
    </>
  );
};

export default DivisionsManagementHeader;

