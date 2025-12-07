/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ITour, ITourType } from "@/types/tour.interface";
import { IDivision } from "@/types/division.interface";
import { createTour, updateTour } from "@/services/admin/tourManagement";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useActionState } from "@/hooks/specialtyHooks/useActionState";

interface ITourFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour?: ITour;
  divisions: IDivision[];
  tourTypes: ITourType[];
}

const TourFormDialog = ({ open, onClose, onSuccess, tour, divisions, tourTypes }: ITourFormDialogProps) => {
  const isEdit = !!tour;
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [state, formAction, pending] = useActionState(
    isEdit ? updateTour.bind(null, tour!._id!) : createTour,
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleClose = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedFile(null);
    formRef.current?.reset();
    onClose();
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess();
      handleClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Tour" : "Add New Tour"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Tour title"
                defaultValue={isEdit ? tour?.title : ""}
              />
              <InputFieldError state={state} field="title" />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                placeholder="Tour description"
                defaultValue={isEdit ? tour?.description : ""}
              />
              <InputFieldError state={state} field="description" />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="Tour location"
                defaultValue={isEdit ? tour?.location : ""}
              />
              <InputFieldError state={state} field="location" />
            </Field>

            <Field>
              <FieldLabel htmlFor="costFrom">Cost From</FieldLabel>
              <Input
                id="costFrom"
                name="costFrom"
                type="number"
                placeholder="Cost starting from"
                defaultValue={isEdit ? tour?.costFrom : ""}
                min={0}
              />
              <InputFieldError state={state} field="costFrom" />
            </Field>

            <Field>
              <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={isEdit ? tour?.startDate?.slice(0, 10) : ""}
              />
              <InputFieldError state={state} field="startDate" />
            </Field>

            <Field>
              <FieldLabel htmlFor="maxGuest">Max Guest</FieldLabel>
              <Input
                id="maxGuest"
                name="maxGuest"
                type="number"
                defaultValue={isEdit ? tour?.maxGuest : ""}
                min={1}
              />
              <InputFieldError state={state} field="maxGuest" />
            </Field>

            {/* Comma-separated fields */}
            <Field>
              <FieldLabel htmlFor="included">Included</FieldLabel>
              <Input
                id="included"
                name="included"
                placeholder="Boat ride, Dinner, Live music"
                defaultValue={isEdit ? tour?.included?.join(", ") : ""}
              />
              <InputFieldError state={state} field="included" />
            </Field>

            <Field>
              <FieldLabel htmlFor="excluded">Excluded</FieldLabel>
              <Input
                id="excluded"
                name="excluded"
                placeholder="Transport, Alcoholic drinks"
                defaultValue={isEdit ? tour?.excluded?.join(", ") : ""}
              />
              <InputFieldError state={state} field="excluded" />
            </Field>

            <Field>
              <FieldLabel htmlFor="amenities">Amenities</FieldLabel>
              <Input
                id="amenities"
                name="amenities"
                placeholder="Wi-Fi, Pool, Music system"
                defaultValue={isEdit ? tour?.amenities?.join(", ") : ""}
              />
              <InputFieldError state={state} field="amenities" />
            </Field>

            <Field>
              <FieldLabel htmlFor="tourPlan">Tour Plan</FieldLabel>
              <Input
                id="tourPlan"
                name="tourPlan"
                placeholder="Day 1: Departure, Day 2: Cruise, Day 3: Return"
                defaultValue={isEdit ? tour?.tourPlan?.join(", ") : ""}
              />
              <InputFieldError state={state} field="tourPlan" />
            </Field>

            <Field>
              <FieldLabel htmlFor="division">Division</FieldLabel>
              <Select defaultValue={isEdit ? tour?.division : ""} name="division">
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="division" />
            </Field>

            <Field>
              <FieldLabel htmlFor="tourType">Tour Type</FieldLabel>
              <Select defaultValue={isEdit ? tour?.tourType : ""} name="tourType">
                <SelectTrigger>
                  <SelectValue placeholder="Select tour type" />
                </SelectTrigger>
                <SelectContent>
                  {tourTypes.map((t) => (
                    <SelectItem key={t._id} value={t._id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="tourType" />
            </Field>

            {/* Image */}
            <Field>
              <FieldLabel htmlFor="image">Tour Image</FieldLabel>
              {selectedFile && (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Tour preview"
                  height={32}
                  width={32}
                  className="mb-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
              <Input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <InputFieldError state={state} field="image" />
            </Field>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button type="button" variant="outline" onClick={handleClose} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : isEdit ? "Update Tour" : "Create Tour"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TourFormDialog;
