/* eslint-disable @typescript-eslint/no-explicit-any */



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
// import { createAdmin, updateAdmin, updateAdminStatus } from "@/services/admin/adminsManagement";
import { createAdmin } from "@/services/admin/adminsManagement";
import { IUser, Role } from "@/types/user.interface";
import { useRef, useState } from "react";
import { toast } from "sonner";
// Import Lucide icons (common with shadcn/ui)
import { Eye, EyeOff } from "lucide-react"; 

interface IAdminFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admin?: IUser;
}

const AdminFormDialog = ({
  open,
  onClose,
  onSuccess,
  admin,
}: IAdminFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!admin?._id;

  const [isPending, setIsPending] = useState(false);
  // 1. Introduce state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const nameInput = formRef.current.elements.namedItem("name") as HTMLInputElement;
    const emailInput = formRef.current.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = formRef.current.elements.namedItem("password") as HTMLInputElement | null;
    const roleSelect = formRef.current.elements.namedItem("role") as HTMLSelectElement | null;

    const payload: Partial<IUser> = {
      name: nameInput.value,
      email: emailInput.value,
      password: !isEdit && passwordInput ? passwordInput.value : undefined,
      role: roleSelect
        ? (Role[roleSelect.value as keyof typeof Role] as Role)
        : undefined,
    };

    try {
      setIsPending(true);

      const result = isEdit
        // ? "updateAdmin"
        ? ""
        : await createAdmin(payload);

      setIsPending(false);

      if (result.success) {
        toast.success(result.message || (isEdit ? "Admin updated" : "Admin created"));
        formRef.current.reset();
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error: any) {
      setIsPending(false);
      toast.error(error.message || "Something went wrong");
    }
  };
  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Admin" : "Add New Admin"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                defaultValue={admin?.name || ""}
              />
              <InputFieldError field="name" state={null} />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                defaultValue={admin?.email || ""}
                disabled={isEdit}
              />
              <InputFieldError field="email" state={null} />
            </Field>

            {/* Password (only for create) */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                {/* Wrapper div to enable the eye icon position */}
                <div className="relative"> 
                  <Input
                    id="password"
                    name="password"
                    // 2. Change input type based on state
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter password"
                  />
                  {/* 3. Toggle button for the eye icon */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {/* Display Eye or EyeOff icon based on state */}
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <InputFieldError field="password" state={null} />
              </Field>
            )}

            {/* Role */}
            <Field className="hidden">
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <select
                id="role"
                name="role"
                defaultValue={Role.ADMIN} // Always default to ADMIN
                className="border rounded px-2 py-1"
                disabled
              >
                {/* <option value={Role.ADMIN}>{Role.ADMIN}</option> */}
              </select>
              <InputFieldError field="role" state={null} />
            </Field>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                  ? "Update Admin"
                  : "Create Admin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFormDialog;