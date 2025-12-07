
/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTourTypeZodSchema, createTourZodSchema, updateTourZodSchema } from "@/zod/tours.validation";



// tours
// ---------------- CREATE TOUR ----------------
export async function createTour(_prevState: any, formData: FormData) {
  // Build validation payload (excluding files)
  const validationPayload = {
    title: formData.get("title") as string,
    description: formData.get("description") as string | undefined,
    location: formData.get("location") as string | undefined,
    costFrom: formData.get("costFrom") ? Number(formData.get("costFrom")) : undefined,
    startDate: formData.get("startDate") as string | undefined,
    endDate: formData.get("endDate") as string | undefined,
    tourType: formData.get("tourType") as string,
    included: formData.getAll("included") as string[],
    excluded: formData.getAll("excluded") as string[],
    amenities: formData.getAll("amenities") as string[],
    tourPlan: formData.getAll("tourPlan") as string[],
    maxGuest: formData.get("maxGuest") ? Number(formData.get("maxGuest")) : undefined,
    minAge: formData.get("minAge") ? Number(formData.get("minAge")) : undefined,
    division: formData.get("division") as string,
    departureLocation: formData.get("departureLocation") as string | undefined,
    arrivalLocation: formData.get("arrivalLocation") as string | undefined,
    guides: formData.getAll("guides") as string[],
    discountDate: formData.get("discountDate") as string | undefined,
    discountPercentage: formData.get("discountPercentage")
      ? Number(formData.get("discountPercentage"))
      : undefined,
  };

  // Validate using Zod
  const validatedPayload = zodValidator(validationPayload, createTourZodSchema);

  if (!validatedPayload.success) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  // Build FormData for backend (files included)
  const backendFormData = new FormData();
  for (const key in validatedPayload.data) {
    const value = validatedPayload.data[key as keyof typeof validatedPayload.data];
    if (Array.isArray(value)) {
      value.forEach((item) => backendFormData.append(key, item));
    } else if (value !== undefined) {
      backendFormData.append(key, String(value));
    }
  }

  const files = formData.getAll("files");
  files.forEach((file) => {
    if (file instanceof File) {
      backendFormData.append("files", file);
    }
  });

  try {
    const response = await serverFetch.post("/tour/create", { body: backendFormData });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Create tour error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create tour",
      formData: validationPayload,
    };
  }
}




export async function getAllTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["tours-list"] }
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}



export async function getTourBySlug(slug: string) {
    try {
        const response = await serverFetch.get(`/tour/${slug}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}



// ---------------- UPDATE TOUR ----------------
export async function updateTour(_prevState: any, formData: FormData, id: string) {
  // Build validation payload (excluding files)
  const validationPayload = {
    title: formData.get("title") as string | undefined,
    description: formData.get("description") as string | undefined,
    location: formData.get("location") as string | undefined,
    costFrom: formData.get("costFrom") ? Number(formData.get("costFrom")) : undefined,
    startDate: formData.get("startDate") as string | undefined,
    endDate: formData.get("endDate") as string | undefined,
    tourType: formData.get("tourType") as string | undefined,
    included: formData.getAll("included") as string[],
    excluded: formData.getAll("excluded") as string[],
    amenities: formData.getAll("amenities") as string[],
    tourPlan: formData.getAll("tourPlan") as string[],
    maxGuest: formData.get("maxGuest") ? Number(formData.get("maxGuest")) : undefined,
    minAge: formData.get("minAge") ? Number(formData.get("minAge")) : undefined,
    division: formData.get("division") as string | undefined,
    departureLocation: formData.get("departureLocation") as string | undefined,
    arrivalLocation: formData.get("arrivalLocation") as string | undefined,
    guides: formData.getAll("guides") as string[],
    discountDate: formData.get("discountDate") as string | undefined,
    discountPercentage: formData.get("discountPercentage")
      ? Number(formData.get("discountPercentage"))
      : undefined,
    deleteImages: formData.getAll("deleteImages") as string[],
  };

  // Validate using Zod
  const validatedPayload = zodValidator(validationPayload, updateTourZodSchema);

  if (!validatedPayload.success) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  // Build FormData for backend (files included)
  const backendFormData = new FormData();
  for (const key in validatedPayload.data) {
    const value = validatedPayload.data[key as keyof typeof validatedPayload.data];
    if (Array.isArray(value)) {
      value.forEach((item) => backendFormData.append(key, item));
    } else if (value !== undefined) {
      backendFormData.append(key, String(value));
    }
  }

  const files = formData.getAll("files");
  files.forEach((file) => {
    if (file instanceof File) {
      backendFormData.append("files", file);
    }
  });

  try {
    const response = await serverFetch.patch(`/tour/${id}`, { body: backendFormData });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Update tour error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update tour",
      formData: validationPayload,
    };
  }
}

// ---------------- DELETE TOUR ----------------
export async function deleteTour(id: string) {
    try {
        const response = await serverFetch.delete(`/tour/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Delete tour error:", error);
        return { success: false, message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete tour" };
    }
}





// tour types
export async function createTourType(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        name: formData.get("name") as string,
    };

    // Zod validation
    const validatedPayload = zodValidator(validationPayload, createTourTypeZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    try {
        const response = await serverFetch.post("/tour/create-tour-type", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: validatedPayload.data.name }),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create tour type error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create tour type",
            formData: validationPayload,
        };
    }
}



export async function getAllTourTypes(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour/tour-types${queryString ? `?${queryString}` : ""}`, {
            cache: "no-store",
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}



export async function getTourTypeById(id: string) {
    try {
        const response = await serverFetch.get(`/tour/tour-types/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get single tour type error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch tour type",
        };
    }
}


export async function updateTourType(id: string, _prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get("name") as string,
    };

    const validatedPayload = zodValidator(validationPayload, createTourTypeZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    try {
        const response = await serverFetch.patch(`/tour/tour-types/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: validatedPayload.data.name }),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update tour type error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update tour type",
            formData: validationPayload,
        };
    }
}


export async function deleteTourType(id: string) {
    try {
        const response = await serverFetch.delete(`/tour/tour-types/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Delete tour type error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete tour type",
        };
    }
}











