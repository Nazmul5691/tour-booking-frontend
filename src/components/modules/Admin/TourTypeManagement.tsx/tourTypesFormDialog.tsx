/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import { toast } from "sonner";
import { createTourType, updateTourType } from "@/services/admin/tourManagement";

interface ITourTypesFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: { _id: string; name: string };
}

export default function TourTypesFormDialog({ open, onClose, onSuccess, initialData }: ITourTypesFormDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<any>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(formRef.current!);

    const result = initialData
      ? await updateTourType(initialData._id, null, formData)
      : await createTourType(null, formData);

    setPending(false);
    setState(result);

    if (result.success) {
      toast.success(result.message);
      onSuccess();
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    if (formRef.current && initialData) {
      (formRef.current.elements.namedItem("name") as HTMLInputElement).value = initialData.name;
    }
  }, [initialData]);

  const handleClose = () => {
    formRef.current?.reset();
    setState(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Tour Type" : "Add Tour Type"}</DialogTitle>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" placeholder="Adventure" />
            <InputFieldError field="name" state={state} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
