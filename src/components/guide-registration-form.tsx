
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { registerGuide } from "@/services/auth/registerGuide";
import { Textarea } from "./ui/textarea";

const GuideRegisterForm = () => {
  const [formData, setFormData] = useState({
    experienceYears: 0,
    location: "",
    languages: "", 
    perTourCharge: 0,
    bio: "",
  });

  
  const [state, formAction, isPending] = useActionState(registerGuide, null);

  
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    
    if (state && state.success) {
      toast.success(state.message || "Guide registration successful!");
    }
  }, [state]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experienceYears" || name === "perTourCharge" ? Number(value) : value,
    }));
  };

  return (
    <form action={formAction}> 
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          
          {/* Experience Years */}
          <Field>
            <FieldLabel htmlFor="experienceYears">Experience Years</FieldLabel>
            <Input
              id="experienceYears"
              name="experienceYears"
              type="number"
              min="0"
              placeholder="e.g., 5"
              value={formData.experienceYears}
              onChange={handleChange}
            />
            <InputFieldError field="experienceYears" state={state} />
          </Field>

          {/* Location */}
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g., Cox's Bazar"
              value={formData.location}
              onChange={handleChange}
            />
            <InputFieldError field="location" state={state} />
          </Field>

          {/* Languages */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="languages">Languages (comma-separated)</FieldLabel>
            <Input
              id="languages"
              name="languages"
              type="text"
              placeholder="English, Bangla, Spanish"
              value={formData.languages}
              onChange={handleChange}
            />
            <InputFieldError field="languages" state={state} />
          </Field>

          {/* Per Tour Charge */}
          <Field>
            <FieldLabel htmlFor="perTourCharge">Per Tour Charge (BDT)</FieldLabel>
            <Input
              id="perTourCharge"
              name="perTourCharge"
              type="number"
              min="0"
              placeholder="e.g., 2000"
              value={formData.perTourCharge}
              onChange={handleChange}
            />
            <InputFieldError field="perTourCharge" state={state} />
          </Field>

          {/* Bio */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Describe yourself..."
            />
            <InputFieldError field="bio" state={state} />
          </Field>
        </div>

        <FieldGroup className="mt-6">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Register as Guide"}
            </Button>
            {/* <FieldDescription className="px-6 text-center">
              Your email **{currentUser.email}** will be used for this guide profile.
            </FieldDescription> */}
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default GuideRegisterForm;