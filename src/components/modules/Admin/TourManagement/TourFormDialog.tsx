/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */


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