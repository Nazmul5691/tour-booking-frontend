// // "use client";
// // import InputFieldError from "@/components/shared/InputFieldError";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Field, FieldLabel } from "@/components/ui/field";
// // import { Input } from "@/components/ui/input";
// // import { updateGuideStatus } from "@/services/admin/guideManagement";
// // import { IGuide } from "@/types/guide.interface";
// // // import { IUser } from "@/types/user.interface";
// // import { useActionState, useEffect, useRef } from "react";
// // import { toast } from "sonner";

// // interface IUserFormDialogProps {
// //   open: boolean;
// //   onClose: () => void;
// //   onSuccess: () => void;
// //   // user?: IUser;
// //   user?: IGuide;
// // }

// // const GuideFormDialog = ({
// //   open,
// //   onClose,
// //   onSuccess,
// //   user,
// // }: IUserFormDialogProps) => {
// //   const formRef = useRef<HTMLFormElement>(null);

// //   const [state, formAction, isPending] = useActionState(
// //     updateGuideStatus.bind(null, user?._id as string),
// //     null
// //   );

// //   // Handle success/error from server
// //   useEffect(() => {
// //     if (state?.success) {
// //       toast.success(state.message || "Operation successful");
// //       if (formRef.current) {
// //         formRef.current.reset();
// //       }
// //       onSuccess();
// //       onClose();
// //     } else if (state?.message && !state.success) {
// //       toast.error(state.message);
// //     }
// //   }, [state, onSuccess, onClose]);

// //   const handleClose = () => {
// //     formRef.current?.reset();
// //     onClose();
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={handleClose}>
// //       <DialogContent className="max-h-[90vh] flex flex-col p-0">
// //         <DialogHeader className="px-6 pt-6 pb-4">
// //           <DialogTitle>Edit User</DialogTitle>
// //         </DialogHeader>

// //         <form
// //           ref={formRef}
// //           action={formAction}
// //           className="flex flex-col flex-1 min-h-0"
// //         >
// //           <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
// //             {/* Basic Information */}
// //             {/* <Field>
// //               <FieldLabel htmlFor="name">Name</FieldLabel>
// //               <Input
// //                 id="name"
// //                 name="name"
// //                 placeholder="John Doe"
// //                 defaultValue={state?.formData?.name || user?.name || ""}
// //               />
// //               <InputFieldError field="name" state={state} />
// //             </Field> */}

// //             {/* <Field>
// //               <FieldLabel htmlFor="email">Email</FieldLabel>
// //               <Input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 placeholder="user@example.com"
// //                 defaultValue={state?.formData?.email || user?.email || ""}
// //                 disabled={isPending}
// //               />
// //               <InputFieldError field="email" state={state} />
// //             </Field> */}

// //             {/* <Field>
// //               <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
// //               <Input
// //                 id="contactNumber"
// //                 name="contactNumber"
// //                 placeholder="01234567890"
// //                 defaultValue={
// //                   state?.formData?.ave || user?.phone || ""
// //                 }
// //               />
// //               <InputFieldError field="contactNumber" state={state} />
// //             </Field> */}

// //             <Field>
// //               <FieldLabel htmlFor="address">Address</FieldLabel>
// //               <Input
// //                 id="address"
// //                 name="address"
// //                 placeholder="123 Main St, City, Country"
// //                 defaultValue={
// //                   state?.experienceYears?.address || user?.experienceYears || ""
// //                 }
// //               />
// //               <InputFieldError field="address" state={state} />
// //             </Field>
// //           </div>

// //           {/* Form Actions */}
// //           <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
// //             <Button
// //               type="button"
// //               variant="outline"
// //               onClick={handleClose}
// //               disabled={isPending}
// //             >
// //               Cancel
// //             </Button>
// //             <Button type="submit" disabled={isPending}>
// //               {isPending ? "Saving..." : "Save Changes"}
// //             </Button>
// //           </div>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default GuideFormDialog;



// "use client";

// import InputFieldError from "@/components/shared/InputFieldError";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Field, FieldLabel } from "@/components/ui/field";
// // import { Input } from "@/components/ui/input"; // Input is not needed here
// import { updateGuideStatus } from "@/services/admin/guideManagement";
// // Assuming GUIDE_STATUS type is available in guide.interface
// import { IGuide, GUIDE_STATUS } from "@/types/guide.interface"; 
// import { useActionState, useEffect, useRef } from "react";
// import { toast } from "sonner";

// interface IGuideFormDialogProps {
//     open: boolean;
//     onClose: () => void;
//     onSuccess: () => void;
//     user?: IGuide;
// }

// const GuideFormDialog = ({ open, onClose, onSuccess, user }: IGuideFormDialogProps) => {
//     const formRef = useRef<HTMLFormElement>(null);

//     // Binds the update function to the guide's ID
//     const [state, formAction, isPending] = useActionState(
//         updateGuideStatus.bind(null, user?._id as string),
//         null
//     );

//     useEffect(() => {
//         if (state?.success) {
//             toast.success(state.message || "Operation successful");
//             formRef.current?.reset();
//             onSuccess();
//             onClose();
//         } else if (state?.message && !state.success) {
//             toast.error(state.message);
//         }
//     }, [state, onSuccess, onClose]);

//     const handleClose = () => {
//         formRef.current?.reset();
//         onClose();
//     };

//     return (
//         <Dialog open={open} onOpenChange={handleClose}>
//             <DialogContent className="max-h-[90vh] flex flex-col p-0">
//                 <DialogHeader className="px-6 pt-6 pb-4">
//                     {/* Updated Title to reflect functionality */}
//                     <DialogTitle>Update Guide Status</DialogTitle>
//                 </DialogHeader>

//                 <form ref={formRef} action={formAction} className="flex flex-col flex-1 min-h-0">
//                     <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
//                         {/* FIX: Removed the incorrect 'address' input field */}
                        
//                         {/* FIX: Added the correct Status Select Field */}
//                         <Field>
//                             <FieldLabel htmlFor="status">New Status</FieldLabel>
//                             {/* The name attribute must match the payload expected by updateGuideStatus */}
//                             <select
//                                 id="status"
//                                 name="status" 
//                                 // Set the current status as the default selected value
//                                 defaultValue={user?.status || "PENDING"}
//                                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
//                                 required 
//                             >
//                                 {/* Assuming GUIDE_STATUS options are PENDING, APPROVED, REJECTED */}
//                                 <option value="PENDING">PENDING</option>
//                                 <option value="APPROVED">APPROVED</option>
//                                 <option value="REJECTED">REJECTED</option>
//                             </select>
//                             <InputFieldError field="status" state={state} />
//                         </Field>

//                         <p className="text-sm text-muted-foreground pt-2">
//                             Current User: **{user?.user?.name || 'N/A'}** (Current Status: {user?.status})
//                         </p>

//                     </div>

//                     <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
//                         <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
//                             Cancel
//                         </Button>
//                         <Button type="submit" disabled={isPending}>
//                             {isPending ? "Updating..." : "Update Status"}
//                         </Button>
//                     </div>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default GuideFormDialog;


export default function GuideFormDialog() {
    return (
        <div>
            <h1>This is guideFormDialog component</h1>
        </div>
    );
}