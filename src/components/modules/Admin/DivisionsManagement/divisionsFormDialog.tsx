/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */



"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createDivision } from "@/services/admin/divisionsManagement";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IDivisionsFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DivisionsFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IDivisionsFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(createDivision, null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess();
      handleClose();
    } else if (state && !state.success) {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state]);

  const handleClose = () => {
    fileInputRef.current && (fileInputRef.current.value = "");
    setSelectedFile(null);
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Division</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Division Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Dhaka"
              defaultValue={state?.formData?.name || ""}
            />
            <InputFieldError field="name" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input
              id="description"
              name="description"
              placeholder="Division details"
              defaultValue={state?.formData?.description || ""}
            />
            <InputFieldError field="description" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="file">Upload Thumbnail</FieldLabel>
            <Input
              ref={fileInputRef}
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <InputFieldError field="thumbnail" state={state} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Division"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DivisionsFormDialog;
