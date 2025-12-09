/* eslint-disable @typescript-eslint/no-explicit-any */
// import InputFieldError from "@/components/shared/InputFieldError";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Field, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { createAdmin, updateAdmin } from "@/services/admin/adminsManagement";
// import { IUser } from "@/types/user.interface";
// // import Image from "next/image";
// import { useActionState, useEffect, useRef, useState } from "react";
// import { toast } from "sonner";

// interface IAdminFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   admin?: IUser;
// }

// const AdminFormDialog = ({
//   open,
//   onClose,
//   onSuccess,
//   admin,
// }: IAdminFormDialogProps) => {
//   const formRef = useRef<HTMLFormElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const isEdit = !!admin?._id;
//   //   const { isEditMode, state, formAction, isPending } = useAdminForm(admin);

//   const [state, formAction, isPending] = useActionState(
//     isEdit ? updateAdmin.bind(null, admin?._id as string) : createAdmin,
//     null
//   );
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   setSelectedFile(file || null);
//   // };

//   // Handle success/error from server
//   useEffect(() => {
//     if (state?.success) {
//       toast.success(state.message || "Operation successful");
//       if (formRef.current) {
//         formRef.current.reset();
//       }
//       onSuccess();
//       onClose();
//     } else if (state?.message && !state.success) {
//       toast.error(state.message);

//       // Restore file to input after error
//       if (selectedFile && fileInputRef.current) {
//         const dataTransfer = new DataTransfer();
//         dataTransfer.items.add(selectedFile);
//         fileInputRef.current.files = dataTransfer.files;
//       }
//     }
//   }, [state, onSuccess, onClose, selectedFile]);

//   const handleClose = () => {
//     setSelectedFile(null);
//     formRef.current?.reset();
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogContent className="max-h-[90vh] flex flex-col p-0">
//         <DialogHeader className="px-6 pt-6 pb-4">
//           <DialogTitle>{isEdit ? "Edit Admin" : "Add New Admin"}</DialogTitle>
//         </DialogHeader>

//         <form
//           ref={formRef}
//           action={formAction}
//           className="flex flex-col flex-1 min-h-0"
//         >
//           <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
//             {/* Basic Information */}
//             <Field>
//               <FieldLabel htmlFor="name">Name</FieldLabel>
//               <Input
//                 id="name"
//                 name="name"
//                 placeholder="John Doe"
//                 defaultValue={state?.formData?.name || admin?.name || ""}
//               />
//               <InputFieldError field="name" state={state} />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="email">Email</FieldLabel>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="admin@example.com"
//                 defaultValue={state?.formData?.email || admin?.email || ""}
//                 disabled={isEdit}
//               />
//               <InputFieldError field="email" state={state} />
//             </Field>



//             {/* Password Field (Create Mode Only) */}
//             {!isEdit && (
//               <Field>
//                 <FieldLabel htmlFor="password">Password</FieldLabel>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Enter password"
//                   defaultValue={state?.formData?.password || ""}
//                 />
//                 <InputFieldError field="password" state={state} />
//               </Field>
//             )}

//             {/* Profile Photo (Create Mode Only) */}

//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={handleClose}
//               disabled={isPending}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isPending}>
//               {isPending
//                 ? "Saving..."
//                 : isEdit
//                 ? "Update Admin"
//                 : "Create Admin"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AdminFormDialog;




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

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!formRef.current) return;

  //   const payload: Partial<IUser> = {
  //     name: formRef.current.name.value,
  //     email: formRef.current.email.value,
  //     password: !isEdit ? formRef.current.password.value : undefined,
  //     role: formRef.current.role
  //       ? (Role[formRef.current.role.value as keyof typeof Role] as Role)
  //       : undefined,
  //   };

  //   try {
  //     setIsPending(true);

  //     const result = isEdit
  //       ? await updateAdmin(admin?._id!, payload)
  //       : await createAdmin(payload);

  //     setIsPending(false);

  //     if (result.success) {
  //       toast.success(result.message || (isEdit ? "Admin updated" : "Admin created"));
  //       formRef.current.reset();
  //       onSuccess();
  //       onClose();
  //     } else {
  //       toast.error(result.message || "Something went wrong");
  //     }
  //   } catch (error: any) {
  //     setIsPending(false);
  //     toast.error(error.message || "Something went wrong");
  //   }
  // };
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
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                <InputFieldError field="password" state={null} />
              </Field>
            )}

            {/* Role */}
            {/* <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <select
                id="role"
                name="role"
                defaultValue={admin?.role || Role.ADMIN}
                className="border rounded px-2 py-1"
                disabled={isEdit}
              >
                {Object.keys(Role).map((key) => (
                  <option key={key} value={key}>
                    {Role[key as keyof typeof Role]}
                  </option>
                ))}
              </select>
              <InputFieldError field="role" state={null} />
            </Field> */}
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
