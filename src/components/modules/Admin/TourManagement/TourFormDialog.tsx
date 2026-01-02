/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-unused-vars */


// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useFormStatus } from "react-dom";
// import { useActionState, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { X, Plus } from "lucide-react";
// import { toast } from "sonner";

// import { ITour, ITourType } from "@/types/tour.interface";
// import { IDivision } from "@/types/division.interface";
// import { createTour, updateTour } from "@/services/admin/tourManagement";

// interface ITourWithImages extends Omit<ITour, "images"> {
//   images?: string[];
// }

// const SubmitButton = ({ isUpdate }: { isUpdate: boolean }) => {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending}>
//       {pending ? (isUpdate ? "Updating..." : "Creating...") : isUpdate ? "Update Tour" : "Create Tour"}
//     </Button>
//   );
// };

// const MultiInput = ({ label, name, initialValues = [], errors }: any) => {
//   const initialStringValues = initialValues
//     .map((item: any) => (typeof item === "object" && item?._id ? item._id : String(item)))
//     .filter((v: string) => v.trim() !== "");
//   const [items, setItems] = useState<string[]>(initialStringValues);
//   const [inputValue, setInputValue] = useState("");

//   const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (inputValue.trim() && !items.includes(inputValue.trim())) {
//       setItems([...items, inputValue.trim()]);
//       setInputValue("");
//     }
//   };

//   const handleRemoveItem = (itemToRemove: string) => {
//     setItems(items.filter((item) => item !== itemToRemove));
//   };

//   return (
//     <div className="space-y-2">
//       <Label htmlFor={name}>{label}</Label>
//       <div className="flex space-x-2">
//         <Input
//           id={name}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder={`Add a ${label.toLowerCase().slice(0, -1)} item`}
//         />
//         <Button variant="outline" onClick={handleAddItem} disabled={!inputValue.trim()}>
//           <Plus className="h-4 w-4 mr-2" /> Add
//         </Button>
//       </div>
//       <div className="flex flex-wrap gap-2 pt-1">
//         {items.map((item, index) => (
//           <Badge key={index} variant="secondary" className="cursor-pointer">
//             {item}
//             <X className="ml-1 h-3 w-3" onClick={() => handleRemoveItem(item)} />
//             <input type="hidden" name={name} value={item} />
//           </Badge>
//         ))}
//       </div>
//       {errors && <p className="text-sm font-medium text-red-500 mt-1">{errors.join(", ")}</p>}
//     </div>
//   );
// };

// interface TourFormDialogProps {
//   initialTourData?: ITourWithImages;
//   allDivisions: IDivision[];
//   onSuccess: () => void;
//   open: boolean;
//   onClose: () => void;
//   tourTypes: { _id: string; name: string }[];
// }

// const initialState = {
//   success: true,
//   message: "",
//   errors: null,
// };

// export const TourFormDialog = ({
//   initialTourData,
//   allDivisions,
//   onSuccess,
//   open,
//   onClose,
//   tourTypes,
// }: TourFormDialogProps) => {
//   const isUpdate = !!initialTourData;

//   const getInitialId = (field: string | { _id: string } | undefined): string | undefined => {
//     if (!field) return undefined;
//     return typeof field === "object" ? field._id : field;
//   };

//   const action = isUpdate
//     ? (prevState: any, formData: FormData) => updateTour(initialTourData._id as string, prevState, formData)
//     : createTour;

//   const [state, formAction] = useActionState(action, initialState);

//   const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
//   // 🚀 FIX 2: Get existing images directly from the prop (or initial data), no need for useState
//   const existingImages: string[] = initialTourData?.images || [];

//   const [divisionValue, setDivisionValue] = useState<string | undefined>(
//     getInitialId(initialTourData?.division)
//   );

//   // 🚀 FIX 1 & 2: Use useEffect to reset internal state when the dialog is opened 
//   // for a *different* tour (i.e., when initialTourData changes).
//   useEffect(() => {
//     // Reset division value
//     setDivisionValue(getInitialId(initialTourData?.division));
//     // Clear images marked for deletion when opening a new tour for edit
//     setImagesToDelete([]);
//   }, [initialTourData]); // Depend on initialTourData


//   useEffect(() => {
//     if (state && state.message) {
//       if (state.success) {
//         toast.success(state.message || (isUpdate ? "Tour updated successfully!" : "Tour created successfully!"));
//         onClose();
//         onSuccess();
//       } else {
//         if (process.env.NODE_ENV === "development") {
//           console.error("Form submission errors:", state.errors);
//         }
//         toast.error(state.message || (isUpdate ? "Failed to update tour." : "Failed to create tour."));
//       }
//     }
//   }, [state, isUpdate, onSuccess, onClose]);

//   const handleImageDeleteToggle = (url: string) => {
//     if (imagesToDelete.includes(url)) {
//       setImagesToDelete(imagesToDelete.filter(img => img !== url));
//     } else {
//       setImagesToDelete([...imagesToDelete, url]);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogTrigger asChild></DialogTrigger>
//       <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>{isUpdate ? "Update Tour" : "Create New Tour"}</DialogTitle>
//         </DialogHeader>

//         <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">

//           {isUpdate && imagesToDelete.map((url, index) => (
//             <input key={index} type="hidden" name="deleteImages" value={url} />
//           ))}

//           {/* --- Title --- */}
//           <div className="space-y-2">
//             <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
//             <Input
//               id="title"
//               name="title"
//               defaultValue={initialTourData?.title || ""}
//               placeholder="e.g., Cox Bazar Sunset Cruise"
//             />
//             {state?.errors?.title && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.title[0]}</p>}
//           </div>

//           {/* --- Division (Fix 1 applied here via value={divisionValue}) --- */}
//           <div className="space-y-2">
//             <Label htmlFor="division">Division <span className="text-red-500">*</span></Label>
//             {/* The value={divisionValue} is correctly controlled by state, which is now updated in useEffect */}
//             <Select name="division" value={divisionValue} onValueChange={setDivisionValue}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Division" />
//               </SelectTrigger>
//               <SelectContent>
//                 {allDivisions.map((div) => (
//                   <SelectItem key={div._id} value={div._id}>{div.name}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {state?.errors?.division && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.division[0]}</p>}
//           </div>

//           {/* --- Tour Type --- */}
//           <div className="space-y-2">
//             <Label htmlFor="tourType">Tour Type <span className="text-red-500">*</span></Label>
//             <Select
//               name="tourType"
//               defaultValue={getInitialId(initialTourData?.tourType)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Tour Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 {tourTypes.map((type) => (
//                   <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {state?.errors?.tourType && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.tourType[0]}</p>}
//           </div>

//           {/* --- Location --- */}
//           <div className="space-y-2">
//             <Label htmlFor="location">Location</Label>
//             <Input
//               id="location"
//               name="location"
//               defaultValue={initialTourData?.location || ""}
//               placeholder="e.g., Cox Bazar"
//             />
//             {state?.errors?.location && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.location[0]}</p>}
//           </div>

//           {/* --- Cost From --- */}
//           <div className="space-y-2">
//             <Label htmlFor="costFrom">Cost From</Label>
//             <Input
//               id="costFrom"
//               name="costFrom"
//               type="number"
//               defaultValue={initialTourData?.costFrom || ""}
//               placeholder="e.g., 13500"
//             />
//             {state?.errors?.costFrom && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.costFrom[0]}</p>}
//           </div>

//           {/* --- Start Date --- */}
//           <div className="space-y-2">
//             <Label htmlFor="startDate">Start Date</Label>
//             <Input
//               id="startDate"
//               name="startDate"
//               type="date"
//               defaultValue={initialTourData?.startDate ? new Date(initialTourData.startDate).toISOString().split("T")[0] : ""}
//             />
//             {state?.errors?.startDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.startDate[0]}</p>}
//           </div>

//           {/* --- End Date --- */}
//           <div className="space-y-2">
//             <Label htmlFor="endDate">End Date</Label>
//             <Input
//               id="endDate"
//               name="endDate"
//               type="date"
//               defaultValue={initialTourData?.endDate ? new Date(initialTourData.endDate).toISOString().split("T")[0] : ""}
//             />
//             {state?.errors?.endDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.endDate[0]}</p>}
//           </div>

//           {/* --- Departure Location --- */}
//           <div className="space-y-2">
//             <Label htmlFor="departureLocation">Departure Location</Label>
//             <Input
//               id="departureLocation"
//               name="departureLocation"
//               defaultValue={initialTourData?.departureLocation || ""}
//               placeholder="e.g., Dhaka"
//             />
//             {state?.errors?.departureLocation && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.departureLocation[0]}</p>}
//           </div>

//           {/* --- Arrival Location --- */}
//           <div className="space-y-2">
//             <Label htmlFor="arrivalLocation">Arrival Location</Label>
//             <Input
//               id="arrivalLocation"
//               name="arrivalLocation"
//               defaultValue={initialTourData?.arrivalLocation || ""}
//               placeholder="e.g., Cox Bazar"
//             />
//             {state?.errors?.arrivalLocation && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.arrivalLocation[0]}</p>}
//           </div>

//           {/* --- Max Guest --- */}
//           <div className="space-y-2">
//             <Label htmlFor="maxGuest">Maximum Guest</Label>
//             <Input
//               id="maxGuest"
//               name="maxGuest"
//               type="number"
//               defaultValue={initialTourData?.maxGuest || ""}
//               placeholder="e.g., 35"
//             />
//             {state?.errors?.maxGuest && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.maxGuest[0]}</p>}
//           </div>

//           {/* --- Min Age --- */}
//           <div className="space-y-2">
//             <Label htmlFor="minAge">Minimum Age</Label>
//             <Input
//               id="minAge"
//               name="minAge"
//               type="number"
//               defaultValue={initialTourData?.minAge || ""}
//               placeholder="e.g., 8"
//             />
//             {state?.errors?.minAge && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.minAge[0]}</p>}
//           </div>

//           {/* --- Discount Date --- */}
//           <div className="space-y-2">
//             <Label htmlFor="discountDate">Discount Date</Label>
//             <Input
//               id="discountDate"
//               name="discountDate"
//               type="date"
//               defaultValue={initialTourData?.discountDate ? new Date(initialTourData.discountDate).toISOString().split("T")[0] : ""}
//             />
//             {state?.errors?.discountDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.discountDate[0]}</p>}
//           </div>

//           {/* --- Discount Percentage --- */}
//           <div className="space-y-2">
//             <Label htmlFor="discountPercentage">Discount Percentage</Label>
//             <Input
//               id="discountPercentage"
//               name="discountPercentage"
//               type="number"
//               defaultValue={initialTourData?.discountPercentage || ""}
//               placeholder="e.g., 20"
//             />
//             {state?.errors?.discountPercentage && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.discountPercentage[0]}</p>}
//           </div>

//           {/* --- Description --- */}
//           <div className="col-span-1 md:col-span-2 space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               defaultValue={initialTourData?.description || ""}
//               rows={4}
//               placeholder="Enter a detailed description of the tour."
//             />
//             {state?.errors?.description && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.description[0]}</p>}
//           </div>

//           {/* --- MultiInput fields --- */}
//           <MultiInput label="Included Items" name="included" initialValues={initialTourData?.included} errors={state?.errors?.included} />
//           <MultiInput label="Excluded Items" name="excluded" initialValues={initialTourData?.excluded} errors={state?.errors?.excluded} />
//           <MultiInput label="Amenities" name="amenities" initialValues={initialTourData?.amenities} errors={state?.errors?.amenities} />
//           <MultiInput label="Tour Plan Steps" name="tourPlan" initialValues={initialTourData?.tourPlan} errors={state?.errors?.tourPlan} />

//           {/* --- Image Upload --- */}
//           <div className="col-span-1 md:col-span-2 space-y-2">
//             <Label htmlFor="files">Images {isUpdate ? "(Select new images to upload)" : "(Select images)"}</Label>
//             <Input id="files" name="files" type="file" multiple accept="image/*" />

//             {isUpdate && existingImages.length > 0 && (
//               <div className="pt-2">
//                 <p className="text-sm font-medium mb-2">Existing Images:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {existingImages.map((url, index) => {
//                     const isMarkedForDeletion = imagesToDelete.includes(url);
//                     return (
//                       <div
//                         key={index}
//                         className={`relative group w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${isMarkedForDeletion ? "border-red-500 opacity-50" : "border-gray-200"}`}
//                       >
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-center p-1">
//                           Image {index + 1}
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => handleImageDeleteToggle(url)}
//                           className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
//                           title={isMarkedForDeletion ? "Undo Delete" : "Mark for Deletion"}
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Click the **X** on an existing image to mark it for deletion. It will be deleted upon **Update**.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* --- Submit Button --- */}
//           <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
//             <SubmitButton isUpdate={isUpdate} />
//           </div>

//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };









// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useFormStatus } from "react-dom";
// import { useActionState, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { X, Plus } from "lucide-react";
// import { toast } from "sonner";

// // Assuming these types/interfaces are correctly defined elsewhere
// import { ITour, ITourType } from "@/types/tour.interface";
// import { IDivision } from "@/types/division.interface";
// import { createTour, updateTour } from "@/services/admin/tourManagement"; // Import server actions

// interface ITourWithImages extends Omit<ITour, "images"> {
//   images?: string[];
// }

// const SubmitButton = ({ isUpdate }: { isUpdate: boolean }) => {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending}>
//       {pending ? (isUpdate ? "Updating..." : "Creating...") : isUpdate ? "Update Tour" : "Create Tour"}
//     </Button>
//   );
// };

// const MultiInput = ({ label, name, initialValues = [], errors }: any) => {
//   const initialStringValues = initialValues
//     .map((item: any) => (typeof item === "object" && item?._id ? item._id : String(item)))
//     .filter((v: string) => v.trim() !== "");
//   const [items, setItems] = useState<string[]>(initialStringValues);
//   const [inputValue, setInputValue] = useState("");

//   const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (inputValue.trim() && !items.includes(inputValue.trim())) {
//       setItems([...items, inputValue.trim()]);
//       setInputValue("");
//     }
//   };

//   const handleRemoveItem = (itemToRemove: string) => {
//     setItems(items.filter((item) => item !== itemToRemove));
//   };

//   return (
//     <div className="space-y-2">
//       <Label htmlFor={name}>{label}</Label>
//       <div className="flex space-x-2">
//         <Input
//           id={name}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder={`Add a ${label.toLowerCase().slice(0, -1)} item`}
//         />
//         <Button variant="outline" onClick={handleAddItem} disabled={!inputValue.trim()}>
//           <Plus className="h-4 w-4 mr-2" /> Add
//         </Button>
//       </div>
//       <div className="flex flex-wrap gap-2 pt-1">
//         {items.map((item, index) => (
//           <Badge key={index} variant="secondary" className="cursor-pointer">
//             {item}
//             <X className="ml-1 h-3 w-3" onClick={() => handleRemoveItem(item)} />
//             {/* Hidden input for server action to collect all values */}
//             <input type="hidden" name={name} value={item} />
//           </Badge>
//         ))}
//       </div>
//       {errors && <p className="text-sm font-medium text-red-500 mt-1">{errors.join(", ")}</p>}
//     </div>
//   );
// };

// interface TourFormDialogProps {
//   initialTourData?: ITourWithImages;
//   allDivisions: IDivision[];
//   onSuccess: () => void;
//   open: boolean;
//   onClose: () => void;
//   tourTypes: { _id: string; name: string }[];
// }

// const initialState = {
//   success: true,
//   message: "",
//   errors: null,
// };

// export const TourFormDialog = ({
//   initialTourData,
//   allDivisions,
//   onSuccess,
//   open,
//   onClose,
//   tourTypes,
// }: TourFormDialogProps) => {
//   const isUpdate = !!initialTourData;

//   const getInitialId = (field: string | { _id: string } | undefined): string | undefined => {
//     if (!field) return undefined;
//     return typeof field === "object" ? field._id : field;
//   };

//   const action = isUpdate
//     ? (prevState: any, formData: FormData) => updateTour(initialTourData._id as string, prevState, formData)
//     : createTour;

//   const [state, formAction] = useActionState(action, initialState);

//   const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
//   const existingImages: string[] = initialTourData?.images || [];

//   const [divisionValue, setDivisionValue] = useState<string | undefined>(
//     getInitialId(initialTourData?.division)
//   );

//   // Reset state on initialTourData change (dialog open/new tour)
//   useEffect(() => {
//     setDivisionValue(getInitialId(initialTourData?.division));
//     setImagesToDelete([]);
//   }, [initialTourData]);


//   useEffect(() => {
//     if (state && state.message) {
//       if (state.success) {
//         toast.success(state.message || (isUpdate ? "Tour updated successfully!" : "Tour created successfully!"));
//         onClose();
//         onSuccess();
//       } else {
//         if (process.env.NODE_ENV === "development") {
//           console.error("Form submission errors:", state.errors);
//         }
//         toast.error(state.message || (isUpdate ? "Failed to update tour." : "Failed to create tour."));
//       }
//     }
//   }, [state, isUpdate, onSuccess, onClose]);

//   const handleImageDeleteToggle = (url: string) => {
//     if (imagesToDelete.includes(url)) {
//       setImagesToDelete(imagesToDelete.filter(img => img !== url));
//     } else {
//       setImagesToDelete([...imagesToDelete, url]);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogTrigger asChild></DialogTrigger>
//       <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>{isUpdate ? "Update Tour" : "Create New Tour"}</DialogTitle>
//         </DialogHeader>

//         <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">

//           {/* --- Hidden inputs for images to delete --- */}
//           {isUpdate && imagesToDelete.map((url, index) => (
//             <input key={index} type="hidden" name="deleteImages" value={url} />
//           ))}

//           {/* --- Title --- */}
//           <div className="space-y-2">
//             <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
//             <Input
//               id="title"
//               name="title"
//               defaultValue={initialTourData?.title || ""}
//               placeholder="e.g., Cox Bazar Sunset Cruise"
//             />
//             {state?.errors?.title && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.title[0]}</p>}
//           </div>

//           {/* --- Division --- */}
//           <div className="space-y-2">
//             <Label htmlFor="division">Division <span className="text-red-500">*</span></Label>
//             <Select name="division" value={divisionValue} onValueChange={setDivisionValue}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Division" />
//               </SelectTrigger>
//               <SelectContent>
//                 {allDivisions.map((div) => (
//                   <SelectItem key={div._id} value={div._id}>{div.name}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {state?.errors?.division && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.division[0]}</p>}
//           </div>

//           {/* --- Tour Type --- */}
//           <div className="space-y-2">
//             <Label htmlFor="tourType">Tour Type <span className="text-red-500">*</span></Label>
//             <Select
//               name="tourType"
//               defaultValue={getInitialId(initialTourData?.tourType)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Tour Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 {tourTypes.map((type) => (
//                   <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {state?.errors?.tourType && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.tourType[0]}</p>}
//           </div>

//           {/* --- Location --- */}
//           <div className="space-y-2">
//             <Label htmlFor="location">Location</Label>
//             <Input
//               id="location"
//               name="location"
//               defaultValue={initialTourData?.location || ""}
//               placeholder="e.g., Cox Bazar"
//             />
//             {state?.errors?.location && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.location[0]}</p>}
//           </div>

//           {/* --- Cost From --- */}
//           <div className="space-y-2">
//             <Label htmlFor="costFrom">Cost From</Label>
//             <Input
//               id="costFrom"
//               name="costFrom"
//               type="number"
//               defaultValue={initialTourData?.costFrom || ""}
//               placeholder="e.g., 13500"
//             />
//             {state?.errors?.costFrom && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.costFrom[0]}</p>}
//           </div>

//           {/* --- Start Date --- */}
//           <div className="space-y-2">
//             <Label htmlFor="startDate">Start Date</Label>
//             <Input
//               id="startDate"
//               name="startDate"
//               type="date"
//               defaultValue={initialTourData?.startDate ? new Date(initialTourData.startDate).toISOString().split("T")[0] : ""}
//             />
//             {state?.errors?.startDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.startDate[0]}</p>}
//           </div>

//           {/* --- End Date --- */}
//           <div className="space-y-2">
//             <Label htmlFor="endDate">End Date</Label>
//             <Input
//               id="endDate"
//               name="endDate"
//               type="date"
//               defaultValue={initialTourData?.endDate ? new Date(initialTourData.endDate).toISOString().split("T")[0] : ""}
//             />
//             {state?.errors?.endDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.endDate[0]}</p>}
//           </div>

//           {/* --- Departure Location --- */}
//           <div className="space-y-2">
//             <Label htmlFor="departureLocation">Departure Location</Label>
//             <Input
//               id="departureLocation"
//               name="departureLocation"
//               defaultValue={initialTourData?.departureLocation || ""}
//               placeholder="e.g., Dhaka"
//             />
//             {state?.errors?.departureLocation && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.departureLocation[0]}</p>}
//           </div>

//           {/* --- Arrival Location --- */}
//           <div className="space-y-2">
//             <Label htmlFor="arrivalLocation">Arrival Location</Label>
//             <Input
//               id="arrivalLocation"
//               name="arrivalLocation"
//               defaultValue={initialTourData?.arrivalLocation || ""}
//               placeholder="e.g., Cox Bazar"
//             />
//             {state?.errors?.arrivalLocation && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.arrivalLocation[0]}</p>}
//           </div>

//           {/* --- Max Guest --- */}
//           <div className="space-y-2">
//             <Label htmlFor="maxGuest">Maximum Guest</Label>
//             <Input
//               id="maxGuest"
//               name="maxGuest"
//               type="number"
//               defaultValue={initialTourData?.maxGuest || ""}
//               placeholder="e.g., 35"
//             />
//             {state?.errors?.maxGuest && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.maxGuest[0]}</p>}
//           </div>

//           {/* --- Min Age --- */}
//           <div className="space-y-2">
//             <Label htmlFor="minAge">Minimum Age</Label>
//             <Input
//               id="minAge"
//               name="minAge"
//               type="number"
//               defaultValue={initialTourData?.minAge || ""}
//               placeholder="e.g., 8"
//             />
//             {state?.errors?.minAge && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.minAge[0]}</p>}
//           </div>

//           {/* --- Discount Date --- */}
//           <div className="space-y-2">
//             <Label htmlFor="discountDate">Discount Date</Label>
//             <Input
//               id="discountDate"
//               name="discountDate"
//               type="date"
//               defaultValue={initialTourData?.discountDate ? new Date(initialTourData.discountDate).toISOString().split("T")[0] : ""}
//             />
//             {state?.errors?.discountDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.discountDate[0]}</p>}
//           </div>

//           {/* --- Discount Percentage --- */}
//           <div className="space-y-2">
//             <Label htmlFor="discountPercentage">Discount Percentage</Label>
//             <Input
//               id="discountPercentage"
//               name="discountPercentage"
//               type="number"
//               defaultValue={initialTourData?.discountPercentage || ""}
//               placeholder="e.g., 20"
//             />
//             {state?.errors?.discountPercentage && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.discountPercentage[0]}</p>}
//           </div>

//           {/* --- Description --- */}
//           <div className="col-span-1 md:col-span-2 space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               defaultValue={initialTourData?.description || ""}
//               rows={4}
//               placeholder="Enter a detailed description of the tour."
//             />
//             {state?.errors?.description && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.description[0]}</p>}
//           </div>

//           {/* --- MultiInput fields --- */}
//           <MultiInput label="Included Items" name="included" initialValues={initialTourData?.included} errors={state?.errors?.included} />
//           <MultiInput label="Excluded Items" name="excluded" initialValues={initialTourData?.excluded} errors={state?.errors?.excluded} />
//           <MultiInput label="Amenities" name="amenities" initialValues={initialTourData?.amenities} errors={state?.errors?.amenities} />
//           <MultiInput label="Tour Plan Steps" name="tourPlan" initialValues={initialTourData?.tourPlan} errors={state?.errors?.tourPlan} />

//           {/* --- Image Upload & Display --- */}
//           <div className="col-span-1 md:col-span-2 space-y-2">
//             <Label htmlFor="files">Images {isUpdate ? "(Select new images to upload)" : "(Select images)"}</Label>
//             <Input id="files" name="files" type="file" multiple accept="image/*" />

//             {isUpdate && existingImages.length > 0 && (
//               <div className="pt-2">
//                 <p className="text-sm font-medium mb-2">Existing Images:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {existingImages.map((url, index) => {
//                     const isMarkedForDeletion = imagesToDelete.includes(url);
//                     return (
//                       <div
//                         key={index}
//                         className={`relative group w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${isMarkedForDeletion ? "border-red-500 opacity-50" : "border-gray-200"}`}
//                       >
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-center p-1">
//                           Image {index + 1}
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => handleImageDeleteToggle(url)}
//                           className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
//                           title={isMarkedForDeletion ? "Undo Delete" : "Mark for Deletion"}
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Click the **X** on an existing image to mark it for deletion. It will be deleted upon **Update**.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* --- Submit Button --- */}
//           <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
//             <SubmitButton isUpdate={isUpdate} />
//           </div>

//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };










// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { createTour, updateTour } from "@/services/admin/tourManagement";
// import { ITour } from "@/types/tour.interface";
// import { IDivision } from "@/types/division.interface";
// import { z } from "zod";
// import Image from "next/image";

// interface TourFormDialogProps {
//     open: boolean;
//     onClose: () => void;
//     onSuccess: () => void;
//     initialTourData?: ITour;
//     allDivisions: IDivision[];
//     tourTypes: { _id: string; name: string }[];
// }

// // ✅ FIX: Create a unified schema that works for both create and update
// const tourFormSchema = z.object({
//     title: z.string().optional(),
//     description: z.string().optional(),
//     location: z.string().optional(),
//     costFrom: z.number().optional(),
//     startDate: z.string().optional(),
//     endDate: z.string().optional(),
//     tourType: z.string().optional(),
//     division: z.string().optional(),
//     departureLocation: z.string().optional(),
//     arrivalLocation: z.string().optional(),
//     discountDate: z.string().optional(),
//     discountPercentage: z.number().optional(),
//     maxGuest: z.number().optional(),
//     minAge: z.number().optional(),
//     included: z.array(z.string()).optional(),
//     excluded: z.array(z.string()).optional(),
//     amenities: z.array(z.string()).optional(),
//     tourPlan: z.array(z.string()).optional(),
//     deleteImages: z.array(z.string()).optional(),
// });

// type FormData = z.infer<typeof tourFormSchema>;

// export function TourFormDialog({
//     open,
//     onClose,
//     onSuccess,
//     initialTourData,
//     allDivisions,
//     tourTypes,
// }: TourFormDialogProps) {
//     const isEditing = !!initialTourData;
//     const [isPending, startTransition] = useTransition();
//     const [files, setFiles] = useState<File[]>([]);

//     const form = useForm<FormData>({
//         resolver: zodResolver(tourFormSchema),
//         defaultValues: {
//             title: "",
//             description: "",
//             location: "",
//             costFrom: undefined,
//             startDate: "",
//             endDate: "",
//             tourType: "",
//             division: "",
//             departureLocation: "",
//             arrivalLocation: "",
//             discountDate: "",
//             discountPercentage: undefined,
//             maxGuest: undefined,
//             minAge: undefined,
//             included: [],
//             excluded: [],
//             amenities: [],
//             tourPlan: [],
//             deleteImages: [],
//         },
//     });

//     // Reset form when dialog opens
//     useEffect(() => {
//         if (open && initialTourData) {
//             form.reset({
//                 title: initialTourData.title || "",
//                 description: initialTourData.description || "",
//                 location: initialTourData.location || "",
//                 costFrom: initialTourData.costFrom,
//                 startDate: initialTourData.startDate
//                     ? new Date(initialTourData.startDate).toISOString().split('T')[0]
//                     : "",
//                 endDate: initialTourData.endDate
//                     ? new Date(initialTourData.endDate).toISOString().split('T')[0]
//                     : "",
//                 tourType: typeof initialTourData.tourType === 'object'
//                     ? initialTourData.tourType._id
//                     : initialTourData.tourType || "",
//                 division: typeof initialTourData.division === 'object'
//                     ? initialTourData.division._id
//                     : initialTourData.division || "",
//                 departureLocation: initialTourData.departureLocation || "",
//                 arrivalLocation: initialTourData.arrivalLocation || "",
//                 discountDate: initialTourData.discountDate
//                     ? new Date(initialTourData.discountDate).toISOString().split('T')[0]
//                     : "",
//                 discountPercentage: initialTourData.discountPercentage,
//                 maxGuest: initialTourData.maxGuest,
//                 minAge: initialTourData.minAge,
//                 included: initialTourData.included || [],
//                 excluded: initialTourData.excluded || [],
//                 amenities: initialTourData.amenities || [],
//                 tourPlan: initialTourData.tourPlan || [],
//                 deleteImages: [],
//             });
//         } else if (open && !initialTourData) {
//             form.reset({
//                 title: "",
//                 description: "",
//                 location: "",
//                 costFrom: undefined,
//                 startDate: "",
//                 endDate: "",
//                 tourType: "",
//                 division: "",
//                 departureLocation: "",
//                 arrivalLocation: "",
//                 discountDate: "",
//                 discountPercentage: undefined,
//                 maxGuest: undefined,
//                 minAge: undefined,
//                 included: [],
//                 excluded: [],
//                 amenities: [],
//                 tourPlan: [],
//                 deleteImages: [],
//             });
//             setFiles([]);
//         }
//     }, [open, initialTourData, form]);

//     const onSubmit = async (data: FormData) => {
//         // ✅ Client-side validation for required fields
//         if (!isEditing) {
//             if (!data.title || data.title.trim() === "") {
//                 form.setError("title", { message: "Title is required" });
//                 return;
//             }
//             if (!data.tourType) {
//                 form.setError("tourType", { message: "Tour type is required" });
//                 return;
//             }
//             if (!data.division) {
//                 form.setError("division", { message: "Division is required" });
//                 return;
//             }
//         }

//         const formData = new FormData();

//         // Append all form fields
//         Object.entries(data).forEach(([key, value]) => {
//             if (Array.isArray(value)) {
//                 value.forEach((item) => formData.append(key, item));
//             } else if (value !== undefined && value !== null && value !== "") {
//                 formData.append(key, String(value));
//             }
//         });

//         // Only append files if they exist
//         if (files.length > 0) {
//             files.forEach((file) => {
//                 formData.append("files", file);
//             });
//         }

//         startTransition(async () => {
//             try {
//                 const result = isEditing
//                     ? await updateTour(initialTourData._id, null, formData)
//                     : await createTour(null, formData);

//                 if (result.success) {
//                     toast.success(isEditing ? "Tour updated!" : "Tour created!");
//                     onSuccess();
//                     onClose();
//                     form.reset();
//                     setFiles([]);
//                 } else {
//                     toast.error(result.message || "Failed to save tour");
//                     if (result.errors) {
//                         Object.entries(result.errors).forEach(([field, messages]) => {
//                             form.setError(field as any, {
//                                 type: "manual",
//                                 message: Array.isArray(messages) ? messages[0] : messages,
//                             });
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.error("Form submission error:", error);
//                 toast.error("An unexpected error occurred");
//             }
//         });
//     };

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle>
//                         {isEditing ? "Edit Tour" : "Create New Tour"}
//                     </DialogTitle>
//                 </DialogHeader>

//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                     {/* Basic Information */}
//                     <div className="space-y-4">
//                         <h3 className="text-lg font-semibold">Basic Information</h3>

//                         {/* Title */}
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Title {!isEditing && <span className="text-red-500">*</span>}
//                             </label>
//                             <input
//                                 {...form.register("title")}
//                                 className="w-full px-3 py-2 border rounded-md"
//                                 placeholder="Enter tour title"
//                             />
//                             {form.formState.errors.title && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {form.formState.errors.title.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Description */}
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Description
//                             </label>
//                             <textarea
//                                 {...form.register("description")}
//                                 className="w-full px-3 py-2 border rounded-md"
//                                 rows={4}
//                                 placeholder="Enter tour description"
//                             />
//                         </div>

//                         {/* Location */}
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Location
//                             </label>
//                             <input
//                                 {...form.register("location")}
//                                 className="w-full px-3 py-2 border rounded-md"
//                                 placeholder="Enter location"
//                             />
//                         </div>

//                         {/* Division */}
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Division {!isEditing && <span className="text-red-500">*</span>}
//                             </label>
//                             <select
//                                 {...form.register("division")}
//                                 className="w-full px-3 py-2 border rounded-md"
//                             >
//                                 <option value="">Select Division</option>
//                                 {allDivisions.map((div) => (
//                                     <option key={div._id} value={div._id}>
//                                         {div.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             {form.formState.errors.division && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {form.formState.errors.division.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Tour Type */}
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Tour Type {!isEditing && <span className="text-red-500">*</span>}
//                             </label>
//                             <select
//                                 {...form.register("tourType")}
//                                 className="w-full px-3 py-2 border rounded-md"
//                             >
//                                 <option value="">Select Tour Type</option>
//                                 {tourTypes.map((type) => (
//                                     <option key={type._id} value={type._id}>
//                                         {type.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             {form.formState.errors.tourType && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {form.formState.errors.tourType.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Cost */}
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Cost From
//                             </label>
//                             <input
//                                 type="number"
//                                 {...form.register("costFrom", { valueAsNumber: true })}
//                                 className="w-full px-3 py-2 border rounded-md"
//                                 placeholder="Enter cost"
//                             />
//                         </div>

//                         {/* Dates */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     Start Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     {...form.register("startDate")}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     End Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     {...form.register("endDate")}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                 />
//                             </div>
//                         </div>

//                         {/* Max Guest and Min Age */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     Max Guest
//                                 </label>
//                                 <input
//                                     type="number"
//                                     {...form.register("maxGuest", { valueAsNumber: true })}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                     placeholder="Enter max guests"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     Min Age
//                                 </label>
//                                 <input
//                                     type="number"
//                                     {...form.register("minAge", { valueAsNumber: true })}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                     placeholder="Enter minimum age"
//                                 />
//                             </div>
//                         </div>

//                         {/* Departure & Arrival */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     Departure Location
//                                 </label>
//                                 <input
//                                     {...form.register("departureLocation")}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                     placeholder="Enter departure location"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     Arrival Location
//                                 </label>
//                                 <input
//                                     {...form.register("arrivalLocation")}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                     placeholder="Enter arrival location"
//                                 />
//                             </div>
//                         </div>

//                         {/* Discount */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     Discount Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     {...form.register("discountDate")}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">
//                                     Discount Percentage
//                                 </label>
//                                 <input
//                                     type="number"
//                                     {...form.register("discountPercentage", { valueAsNumber: true })}
//                                     className="w-full px-3 py-2 border rounded-md"
//                                     placeholder="Enter discount %"
//                                 />
//                             </div>
//                         </div>

//                         {/* Images */}
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Tour Images
//                             </label>
//                             <input
//                                 type="file"
//                                 multiple
//                                 accept="image/*"
//                                 onChange={(e) => {
//                                     const selectedFiles = Array.from(e.target.files || []);
//                                     setFiles(selectedFiles);
//                                 }}
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                             {files.length > 0 && (
//                                 <p className="text-sm text-gray-600 mt-1">
//                                     {files.length} file(s) selected
//                                 </p>
//                             )}
//                             {isEditing && initialTourData?.images && initialTourData.images.length > 0 && (
//                                 <div className="mt-2">
//                                     <p className="text-sm text-gray-600 mb-2">Current images:</p>
//                                     <div className="grid grid-cols-4 gap-2">
//                                         {initialTourData.images.map((img, idx) => (
//                                             <div key={idx} className="relative w-full h-20">
//                                                 <Image
//                                                     src={img}
//                                                     alt={`Tour ${idx + 1}`}
//                                                     fill
//                                                     className="object-cover rounded"
//                                                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Form Actions */}
//                     <div className="flex justify-end gap-3 pt-4 border-t">
//                         <Button
//                             type="button"
//                             variant="outline"
//                             onClick={onClose}
//                             disabled={isPending}
//                         >
//                             Cancel
//                         </Button>
//                         <Button type="submit" disabled={isPending}>
//                             {isPending ? "Saving..." : isEditing ? "Update Tour" : "Create Tour"}
//                         </Button>
//                     </div>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }








"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { createTour, updateTour } from "@/services/admin/tourManagement";
import { ITour } from "@/types/tour.interface";
import { IDivision } from "@/types/division.interface";
import { z } from "zod";

interface TourFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialTourData?: ITour;
    allDivisions: IDivision[];
    tourTypes: { _id: string; name: string }[];
}

// Unified schema
const tourFormSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    costFrom: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    tourType: z.string().optional(),
    division: z.string().optional(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional(),
    discountDate: z.string().optional(),
    discountPercentage: z.number().optional(),
    maxGuest: z.number().optional(),
    minAge: z.number().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    deleteImages: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof tourFormSchema>;

// MultiInput Component for array fields
// const MultiInput = ({
//     label,
//     items,
//     onAdd,
//     onRemove,
//     error,
// }: {
//     label: string;
//     items: string[];
//     onAdd: (item: string) => void;
//     onRemove: (item: string) => void;
//     error?: string;
// }) => {
//     const [inputValue, setInputValue] = useState("");

//     const handleAdd = () => {
//         if (inputValue.trim() && !items.includes(inputValue.trim())) {
//             onAdd(inputValue.trim());
//             setInputValue("");
//         }
//     };

//     return (
//         <div className="space-y-2">
//             <Label>{label}</Label>
//             <div className="flex gap-2">
//                 <Input
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder={`Add ${label.toLowerCase()}`}
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                             e.preventDefault();
//                             handleAdd();
//                         }
//                     }}
//                 />
//                 <Button
//                     type="button"
//                     variant="outline"
//                     onClick={handleAdd}
//                     disabled={!inputValue.trim()}
//                 >
//                     <Plus className="h-4 w-4" />
//                 </Button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//                 {items.map((item, index) => (
//                     <Badge key={index} variant="secondary" className="cursor-pointer">
//                         {item}
//                         <X
//                             className="ml-1 h-3 w-3"
//                             onClick={() => onRemove(item)}
//                         />
//                     </Badge>
//                 ))}
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//         </div>
//     );
// };


const MultiInput = ({
    label,
    items,
    onAdd,
    onRemove,
    error,
}: {
    label: string;
    items: string[];
    onAdd: (item: string) => void;
    onRemove: (item: string) => void;
    error?: string;
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim() && !items.includes(inputValue.trim())) {
            onAdd(inputValue.trim());
            setInputValue("");
        }
    };

    const handleRemove = (e: React.MouseEvent, item: string) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove(item);
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Add ${label.toLowerCase()}`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAdd();
                        }
                    }}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleAdd}
                    disabled={!inputValue.trim()}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <Badge 
                        key={index} 
                        variant="secondary" 
                        className="pr-1"
                    >
                        <span>{item}</span>
                        <button
                            type="button"
                            onClick={(e) => handleRemove(e, item)}
                            className="ml-1 hover:bg-red-500 hover:text-white rounded-full p-0.5 transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};


export function TourFormDialog({
    open,
    onClose,
    onSuccess,
    initialTourData,
    allDivisions,
    tourTypes,
}: TourFormDialogProps) {
    const isEditing = !!initialTourData;
    const [isPending, startTransition] = useTransition();
    const [files, setFiles] = useState<File[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

    // Array field states
    const [included, setIncluded] = useState<string[]>([]);
    const [excluded, setExcluded] = useState<string[]>([]);
    const [amenities, setAmenities] = useState<string[]>([]);
    const [tourPlan, setTourPlan] = useState<string[]>([]);

    const form = useForm<FormData>({
        resolver: zodResolver(tourFormSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            costFrom: undefined,
            startDate: "",
            endDate: "",
            tourType: "",
            division: "",
            departureLocation: "",
            arrivalLocation: "",
            discountDate: "",
            discountPercentage: undefined,
            maxGuest: undefined,
            minAge: undefined,
            included: [],
            excluded: [],
            amenities: [],
            tourPlan: [],
            deleteImages: [],
        },
    });

    // Reset form when dialog opens
    useEffect(() => {
        if (open && initialTourData) {
            form.reset({
                title: initialTourData.title || "",
                description: initialTourData.description || "",
                location: initialTourData.location || "",
                costFrom: initialTourData.costFrom,
                startDate: initialTourData.startDate
                    ? new Date(initialTourData.startDate).toISOString().split("T")[0]
                    : "",
                endDate: initialTourData.endDate
                    ? new Date(initialTourData.endDate).toISOString().split("T")[0]
                    : "",
                tourType:
                    typeof initialTourData.tourType === "object"
                        ? initialTourData.tourType._id
                        : initialTourData.tourType || "",
                division:
                    typeof initialTourData.division === "object"
                        ? initialTourData.division._id
                        : initialTourData.division || "",
                departureLocation: initialTourData.departureLocation || "",
                arrivalLocation: initialTourData.arrivalLocation || "",
                discountDate: initialTourData.discountDate
                    ? new Date(initialTourData.discountDate).toISOString().split("T")[0]
                    : "",
                discountPercentage: initialTourData.discountPercentage,
                maxGuest: initialTourData.maxGuest,
                minAge: initialTourData.minAge,
            });

            // Set array fields
            setIncluded(initialTourData.included || []);
            setExcluded(initialTourData.excluded || []);
            setAmenities(initialTourData.amenities || []);
            setTourPlan(initialTourData.tourPlan || []);
            setImagesToDelete([]);
        } else if (open && !initialTourData) {
            form.reset();
            setFiles([]);
            setIncluded([]);
            setExcluded([]);
            setAmenities([]);
            setTourPlan([]);
            setImagesToDelete([]);
        }
    }, [open, initialTourData, form]);

    const handleImageDeleteToggle = (url: string) => {
        if (imagesToDelete.includes(url)) {
            setImagesToDelete(imagesToDelete.filter((img) => img !== url));
        } else {
            setImagesToDelete([...imagesToDelete, url]);
        }
    };

    const onSubmit = async (data: FormData) => {
        // Client-side validation for required fields
        if (!isEditing) {
            if (!data.title || data.title.trim() === "") {
                form.setError("title", { message: "Title is required" });
                return;
            }
            if (!data.tourType) {
                form.setError("tourType", { message: "Tour type is required" });
                return;
            }
            if (!data.division) {
                form.setError("division", { message: "Division is required" });
                return;
            }
        }

        const formData = new FormData();

        // Append all form fields
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                formData.append(key, String(value));
            }
        });

        // Append array fields
        included.forEach((item) => formData.append("included", item));
        excluded.forEach((item) => formData.append("excluded", item));
        amenities.forEach((item) => formData.append("amenities", item));
        tourPlan.forEach((item) => formData.append("tourPlan", item));

        // Append images to delete
        imagesToDelete.forEach((img) => formData.append("deleteImages", img));

        // Only append files if they exist
        if (files.length > 0) {
            files.forEach((file) => {
                formData.append("files", file);
            });
        }

        startTransition(async () => {
            try {
                const result = isEditing
                    ? await updateTour(initialTourData._id, null, formData)
                    : await createTour(null, formData);

                if (result.success) {
                    toast.success(isEditing ? "Tour updated!" : "Tour created!");
                    onSuccess();
                    onClose();
                    form.reset();
                    setFiles([]);
                    setIncluded([]);
                    setExcluded([]);
                    setAmenities([]);
                    setTourPlan([]);
                    setImagesToDelete([]);
                } else {
                    toast.error(result.message || "Failed to save tour");
                    if (result.errors) {
                        Object.entries(result.errors).forEach(([field, messages]) => {
                            form.setError(field as any, {
                                type: "manual",
                                message: Array.isArray(messages) ? messages[0] : messages,
                            });
                        });
                    }
                }
            } catch (error) {
                console.error("Form submission error:", error);
                toast.error("An unexpected error occurred");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Tour" : "Create New Tour"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Title {!isEditing && <span className="text-red-500">*</span>}
                            </Label>
                            <Input
                                {...form.register("title")}
                                placeholder="Enter tour title"
                            />
                            {form.formState.errors.title && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                {...form.register("location")}
                                placeholder="Enter location"
                            />
                        </div>

                        {/* Division */}
                        <div className="space-y-2">
                            <Label htmlFor="division">
                                Division {!isEditing && <span className="text-red-500">*</span>}
                            </Label>
                            <select
                                {...form.register("division")}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">Select Division</option>
                                {allDivisions.map((div) => (
                                    <option key={div._id} value={div._id}>
                                        {div.name}
                                    </option>
                                ))}
                            </select>
                            {form.formState.errors.division && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.division.message}
                                </p>
                            )}
                        </div>

                        {/* Tour Type */}
                        <div className="space-y-2">
                            <Label htmlFor="tourType">
                                Tour Type {!isEditing && <span className="text-red-500">*</span>}
                            </Label>
                            <select
                                {...form.register("tourType")}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">Select Tour Type</option>
                                {tourTypes.map((type) => (
                                    <option key={type._id} value={type._id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {form.formState.errors.tourType && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.tourType.message}
                                </p>
                            )}
                        </div>

                        {/* Cost From */}
                        <div className="space-y-2">
                            <Label htmlFor="costFrom">Cost From</Label>
                            <Input
                                type="number"
                                {...form.register("costFrom", { valueAsNumber: true })}
                                placeholder="Enter cost"
                            />
                        </div>

                        {/* Start Date */}
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                type="date"
                                {...form.register("startDate")}
                            />
                        </div>

                        {/* End Date */}
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                type="date"
                                {...form.register("endDate")}
                            />
                        </div>

                        {/* Max Guest */}
                        <div className="space-y-2">
                            <Label htmlFor="maxGuest">Max Guest</Label>
                            <Input
                                type="number"
                                {...form.register("maxGuest", { valueAsNumber: true })}
                                placeholder="Enter max guests"
                            />
                        </div>

                        {/* Min Age */}
                        <div className="space-y-2">
                            <Label htmlFor="minAge">Min Age</Label>
                            <Input
                                type="number"
                                {...form.register("minAge", { valueAsNumber: true })}
                                placeholder="Enter minimum age"
                            />
                        </div>

                        {/* Departure Location */}
                        <div className="space-y-2">
                            <Label htmlFor="departureLocation">Departure Location</Label>
                            <Input
                                {...form.register("departureLocation")}
                                placeholder="Enter departure location"
                            />
                        </div>

                        {/* Arrival Location */}
                        <div className="space-y-2">
                            <Label htmlFor="arrivalLocation">Arrival Location</Label>
                            <Input
                                {...form.register("arrivalLocation")}
                                placeholder="Enter arrival location"
                            />
                        </div>

                        {/* Discount Date */}
                        <div className="space-y-2">
                            <Label htmlFor="discountDate">Discount Date</Label>
                            <Input
                                type="date"
                                {...form.register("discountDate")}
                            />
                        </div>

                        {/* Discount Percentage */}
                        <div className="space-y-2">
                            <Label htmlFor="discountPercentage">Discount Percentage</Label>
                            <Input
                                type="number"
                                {...form.register("discountPercentage", {
                                    valueAsNumber: true,
                                })}
                                placeholder="Enter discount %"
                            />
                        </div>
                    </div>

                    {/* Description - Full Width */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            {...form.register("description")}
                            rows={4}
                            placeholder="Enter tour description"
                        />
                    </div>

                    {/* Multi-Input Fields */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MultiInput
                            label="Included Items"
                            items={included}
                            onAdd={(item) => setIncluded([...included, item])}
                            onRemove={(item) =>
                                setIncluded(included.filter((i) => i !== item))
                            }
                        />

                        <MultiInput
                            label="Excluded Items"
                            items={excluded}
                            onAdd={(item) => setExcluded([...excluded, item])}
                            onRemove={(item) =>
                                setExcluded(excluded.filter((i) => i !== item))
                            }
                        />

                        <MultiInput
                            label="Amenities"
                            items={amenities}
                            onAdd={(item) => setAmenities([...amenities, item])}
                            onRemove={(item) =>
                                setAmenities(amenities.filter((i) => i !== item))
                            }
                        />

                        <MultiInput
                            label="Tour Plan Steps"
                            items={tourPlan}
                            onAdd={(item) => setTourPlan([...tourPlan, item])}
                            onRemove={(item) =>
                                setTourPlan(tourPlan.filter((i) => i !== item))
                            }
                        />
                    </div> */}
                    {/* Multi-Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MultiInput
                            label="Included Items"
                            items={included}
                            onAdd={(item) => setIncluded([...included, item])}
                            onRemove={(item) => {
                                setIncluded(included.filter((i) => i !== item));
                            }}
                        />

                        <MultiInput
                            label="Excluded Items"
                            items={excluded}
                            onAdd={(item) => setExcluded([...excluded, item])}
                            onRemove={(item) => {
                                setExcluded(excluded.filter((i) => i !== item));
                            }}
                        />

                        <MultiInput
                            label="Amenities"
                            items={amenities}
                            onAdd={(item) => setAmenities([...amenities, item])}
                            onRemove={(item) => {
                                setAmenities(amenities.filter((i) => i !== item));
                            }}
                        />

                        <MultiInput
                            label="Tour Plan Steps"
                            items={tourPlan}
                            onAdd={(item) => setTourPlan([...tourPlan, item])}
                            onRemove={(item) => {
                                setTourPlan(tourPlan.filter((i) => i !== item));
                            }}
                        />
                    </div>

                    {/* Images Section */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="files">
                                {isEditing ? "Add New Images" : "Tour Images"}
                            </Label>
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    const selectedFiles = Array.from(e.target.files || []);
                                    setFiles(selectedFiles);
                                }}
                            />
                            {files.length > 0 && (
                                <p className="text-sm text-gray-600">
                                    {files.length} file(s) selected
                                </p>
                            )}
                        </div>

                        {/* Existing Images */}
                        {isEditing &&
                            initialTourData?.images &&
                            initialTourData.images.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Existing Images:</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {initialTourData.images.map((img, idx) => {
                                            const isMarkedForDeletion =
                                                imagesToDelete.includes(img);
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`relative group border-2 rounded-lg overflow-hidden transition-all ${isMarkedForDeletion
                                                            ? "border-red-500 opacity-50"
                                                            : "border-gray-200"
                                                        }`}
                                                >
                                                    <div className="relative w-full h-32">
                                                        <Image
                                                            src={img}
                                                            alt={`Tour ${idx + 1}`}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImageDeleteToggle(img)}
                                                        className="absolute top-1 right-1 p-1 bg-white/90 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md"
                                                        title={
                                                            isMarkedForDeletion
                                                                ? "Undo Delete"
                                                                : "Mark for Deletion"
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                    {isMarkedForDeletion && (
                                                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                                            <span className="text-white font-semibold text-sm bg-red-500 px-2 py-1 rounded">
                                                                Will Delete
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        Click the X button to mark images for deletion. They will be
                                        removed when you update the tour.
                                    </p>
                                </div>
                            )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "Saving..."
                                : isEditing
                                    ? "Update Tour"
                                    : "Create Tour"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}