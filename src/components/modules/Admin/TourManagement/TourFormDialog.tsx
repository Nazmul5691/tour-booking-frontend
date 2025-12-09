/* eslint-disable @typescript-eslint/no-unused-vars */
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









/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";

// Assuming these types/interfaces are correctly defined elsewhere
import { ITour, ITourType } from "@/types/tour.interface";
import { IDivision } from "@/types/division.interface";
import { createTour, updateTour } from "@/services/admin/tourManagement"; // Import server actions

interface ITourWithImages extends Omit<ITour, "images"> {
  images?: string[];
}

const SubmitButton = ({ isUpdate }: { isUpdate: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isUpdate ? "Updating..." : "Creating...") : isUpdate ? "Update Tour" : "Create Tour"}
    </Button>
  );
};

const MultiInput = ({ label, name, initialValues = [], errors }: any) => {
  const initialStringValues = initialValues
    .map((item: any) => (typeof item === "object" && item?._id ? item._id : String(item)))
    .filter((v: string) => v.trim() !== "");
  const [items, setItems] = useState<string[]>(initialStringValues);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() && !items.includes(inputValue.trim())) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex space-x-2">
        <Input
          id={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Add a ${label.toLowerCase().slice(0, -1)} item`}
        />
        <Button variant="outline" onClick={handleAddItem} disabled={!inputValue.trim()}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary" className="cursor-pointer">
            {item}
            <X className="ml-1 h-3 w-3" onClick={() => handleRemoveItem(item)} />
            {/* Hidden input for server action to collect all values */}
            <input type="hidden" name={name} value={item} />
          </Badge>
        ))}
      </div>
      {errors && <p className="text-sm font-medium text-red-500 mt-1">{errors.join(", ")}</p>}
    </div>
  );
};

interface TourFormDialogProps {
  initialTourData?: ITourWithImages;
  allDivisions: IDivision[];
  onSuccess: () => void;
  open: boolean;
  onClose: () => void;
  tourTypes: { _id: string; name: string }[];
}

const initialState = {
  success: true,
  message: "",
  errors: null,
};

export const TourFormDialog = ({
  initialTourData,
  allDivisions,
  onSuccess,
  open,
  onClose,
  tourTypes,
}: TourFormDialogProps) => {
  const isUpdate = !!initialTourData;

  const getInitialId = (field: string | { _id: string } | undefined): string | undefined => {
    if (!field) return undefined;
    return typeof field === "object" ? field._id : field;
  };

  const action = isUpdate
    ? (prevState: any, formData: FormData) => updateTour(initialTourData._id as string, prevState, formData)
    : createTour;

  const [state, formAction] = useActionState(action, initialState);

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const existingImages: string[] = initialTourData?.images || [];

  const [divisionValue, setDivisionValue] = useState<string | undefined>(
    getInitialId(initialTourData?.division)
  );

  // Reset state on initialTourData change (dialog open/new tour)
  useEffect(() => {
    setDivisionValue(getInitialId(initialTourData?.division));
    setImagesToDelete([]);
  }, [initialTourData]);


  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success(state.message || (isUpdate ? "Tour updated successfully!" : "Tour created successfully!"));
        onClose();
        onSuccess();
      } else {
        if (process.env.NODE_ENV === "development") {
          console.error("Form submission errors:", state.errors);
        }
        toast.error(state.message || (isUpdate ? "Failed to update tour." : "Failed to create tour."));
      }
    }
  }, [state, isUpdate, onSuccess, onClose]);

  const handleImageDeleteToggle = (url: string) => {
    if (imagesToDelete.includes(url)) {
      setImagesToDelete(imagesToDelete.filter(img => img !== url));
    } else {
      setImagesToDelete([...imagesToDelete, url]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Update Tour" : "Create New Tour"}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">

          {/* --- Hidden inputs for images to delete --- */}
          {isUpdate && imagesToDelete.map((url, index) => (
            <input key={index} type="hidden" name="deleteImages" value={url} />
          ))}

          {/* --- Title --- */}
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              defaultValue={initialTourData?.title || ""}
              placeholder="e.g., Cox Bazar Sunset Cruise"
            />
            {state?.errors?.title && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.title[0]}</p>}
          </div>

          {/* --- Division --- */}
          <div className="space-y-2">
            <Label htmlFor="division">Division <span className="text-red-500">*</span></Label>
            <Select name="division" value={divisionValue} onValueChange={setDivisionValue}>
              <SelectTrigger>
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                {allDivisions.map((div) => (
                  <SelectItem key={div._id} value={div._id}>{div.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.division && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.division[0]}</p>}
          </div>

          {/* --- Tour Type --- */}
          <div className="space-y-2">
            <Label htmlFor="tourType">Tour Type <span className="text-red-500">*</span></Label>
            <Select
              name="tourType"
              defaultValue={getInitialId(initialTourData?.tourType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Tour Type" />
              </SelectTrigger>
              <SelectContent>
                {tourTypes.map((type) => (
                  <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.tourType && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.tourType[0]}</p>}
          </div>

          {/* --- Location --- */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={initialTourData?.location || ""}
              placeholder="e.g., Cox Bazar"
            />
            {state?.errors?.location && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.location[0]}</p>}
          </div>

          {/* --- Cost From --- */}
          <div className="space-y-2">
            <Label htmlFor="costFrom">Cost From</Label>
            <Input
              id="costFrom"
              name="costFrom"
              type="number"
              defaultValue={initialTourData?.costFrom || ""}
              placeholder="e.g., 13500"
            />
            {state?.errors?.costFrom && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.costFrom[0]}</p>}
          </div>

          {/* --- Start Date --- */}
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={initialTourData?.startDate ? new Date(initialTourData.startDate).toISOString().split("T")[0] : ""}
            />
            {state?.errors?.startDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.startDate[0]}</p>}
          </div>

          {/* --- End Date --- */}
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              defaultValue={initialTourData?.endDate ? new Date(initialTourData.endDate).toISOString().split("T")[0] : ""}
            />
            {state?.errors?.endDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.endDate[0]}</p>}
          </div>

          {/* --- Departure Location --- */}
          <div className="space-y-2">
            <Label htmlFor="departureLocation">Departure Location</Label>
            <Input
              id="departureLocation"
              name="departureLocation"
              defaultValue={initialTourData?.departureLocation || ""}
              placeholder="e.g., Dhaka"
            />
            {state?.errors?.departureLocation && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.departureLocation[0]}</p>}
          </div>

          {/* --- Arrival Location --- */}
          <div className="space-y-2">
            <Label htmlFor="arrivalLocation">Arrival Location</Label>
            <Input
              id="arrivalLocation"
              name="arrivalLocation"
              defaultValue={initialTourData?.arrivalLocation || ""}
              placeholder="e.g., Cox Bazar"
            />
            {state?.errors?.arrivalLocation && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.arrivalLocation[0]}</p>}
          </div>

          {/* --- Max Guest --- */}
          <div className="space-y-2">
            <Label htmlFor="maxGuest">Maximum Guest</Label>
            <Input
              id="maxGuest"
              name="maxGuest"
              type="number"
              defaultValue={initialTourData?.maxGuest || ""}
              placeholder="e.g., 35"
            />
            {state?.errors?.maxGuest && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.maxGuest[0]}</p>}
          </div>

          {/* --- Min Age --- */}
          <div className="space-y-2">
            <Label htmlFor="minAge">Minimum Age</Label>
            <Input
              id="minAge"
              name="minAge"
              type="number"
              defaultValue={initialTourData?.minAge || ""}
              placeholder="e.g., 8"
            />
            {state?.errors?.minAge && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.minAge[0]}</p>}
          </div>

          {/* --- Discount Date --- */}
          <div className="space-y-2">
            <Label htmlFor="discountDate">Discount Date</Label>
            <Input
              id="discountDate"
              name="discountDate"
              type="date"
              defaultValue={initialTourData?.discountDate ? new Date(initialTourData.discountDate).toISOString().split("T")[0] : ""}
            />
            {state?.errors?.discountDate && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.discountDate[0]}</p>}
          </div>

          {/* --- Discount Percentage --- */}
          <div className="space-y-2">
            <Label htmlFor="discountPercentage">Discount Percentage</Label>
            <Input
              id="discountPercentage"
              name="discountPercentage"
              type="number"
              defaultValue={initialTourData?.discountPercentage || ""}
              placeholder="e.g., 20"
            />
            {state?.errors?.discountPercentage && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.discountPercentage[0]}</p>}
          </div>

          {/* --- Description --- */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialTourData?.description || ""}
              rows={4}
              placeholder="Enter a detailed description of the tour."
            />
            {state?.errors?.description && <p className="text-sm font-medium text-red-500 mt-1">{state.errors.description[0]}</p>}
          </div>

          {/* --- MultiInput fields --- */}
          <MultiInput label="Included Items" name="included" initialValues={initialTourData?.included} errors={state?.errors?.included} />
          <MultiInput label="Excluded Items" name="excluded" initialValues={initialTourData?.excluded} errors={state?.errors?.excluded} />
          <MultiInput label="Amenities" name="amenities" initialValues={initialTourData?.amenities} errors={state?.errors?.amenities} />
          <MultiInput label="Tour Plan Steps" name="tourPlan" initialValues={initialTourData?.tourPlan} errors={state?.errors?.tourPlan} />

          {/* --- Image Upload & Display --- */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label htmlFor="files">Images {isUpdate ? "(Select new images to upload)" : "(Select images)"}</Label>
            <Input id="files" name="files" type="file" multiple accept="image/*" />

            {isUpdate && existingImages.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Existing Images:</p>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((url, index) => {
                    const isMarkedForDeletion = imagesToDelete.includes(url);
                    return (
                      <div
                        key={index}
                        className={`relative group w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${isMarkedForDeletion ? "border-red-500 opacity-50" : "border-gray-200"}`}
                      >
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-center p-1">
                          Image {index + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleImageDeleteToggle(url)}
                          className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title={isMarkedForDeletion ? "Undo Delete" : "Mark for Deletion"}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click the **X** on an existing image to mark it for deletion. It will be deleted upon **Update**.
                </p>
              </div>
            )}
          </div>

          {/* --- Submit Button --- */}
          <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
            <SubmitButton isUpdate={isUpdate} />
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};