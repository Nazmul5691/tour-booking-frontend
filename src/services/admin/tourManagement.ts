

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTourTypeZodSchema, createTourZodSchema, updateTourZodSchema } from "@/zod/tours.validation";
import { revalidatePath } from "next/cache";



//create tour
export async function createTour(_prevState: any, formData: FormData): Promise<any> {

  const parseNumber = (value: FormDataEntryValue | null) => {
    if (value === null || value === "") return undefined;

    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };

 
  const validationPayload = {
    
    title: (formData.get("title") || "") as string,
    tourType: (formData.get("tourType") || "") as string,
    division: (formData.get("division") || "") as string,

    description: formData.get("description") as string | undefined,
    location: formData.get("location") as string | undefined,
    startDate: formData.get("startDate") as string | undefined,
    endDate: formData.get("endDate") as string | undefined,
    departureLocation: formData.get("departureLocation") as string | undefined,
    arrivalLocation: formData.get("arrivalLocation") as string | undefined,
    discountDate: formData.get("discountDate") as string | undefined,

    costFrom: parseNumber(formData.get("costFrom")),
    maxGuest: parseNumber(formData.get("maxGuest")),
    minAge: parseNumber(formData.get("minAge")),
    discountPercentage: parseNumber(formData.get("discountPercentage")),

    included: formData
      .getAll("included")
      .filter((v): v is string => typeof v === "string" && v.trim() !== ""),

    excluded: formData
      .getAll("excluded")
      .filter((v): v is string => typeof v === "string" && v.trim() !== ""),

    amenities: formData
      .getAll("amenities")
      .filter((v): v is string => typeof v === "string" && v.trim() !== ""),

    tourPlan: formData
      .getAll("tourPlan")
      .filter((v): v is string => typeof v === "string" && v.trim() !== ""),
  };

  // console.log("✅ Submitted Data (Zod Input):", validationPayload);

  const validated = zodValidator(validationPayload, createTourZodSchema);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed. Please check the form.",
      errors: validated.errors,
    };
  }

  
  const data = validated.data;
  if (!data) {
    return {
      success: false,
      message: "Unexpected validation error",
    };
  }

  
  const normalizedPayload = {
    ...data,

    included: data.included ?? [],
    excluded: data.excluded ?? [],
    amenities: data.amenities ?? [],
    tourPlan: data.tourPlan ?? [],
    guides: [],
  };

  
  const backendFormData = new FormData();

  for (const key in normalizedPayload) {
    const value = normalizedPayload[key as keyof typeof normalizedPayload];

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
    const response = await serverFetch.post("/tour/create", {
      body: backendFormData,
    });

    const result = await response.json();

    
    if (result.success) {
      revalidatePath("/admin/tours");
      revalidatePath("/tours");
    }

    return result;
  } catch (error: any) {
    console.error("❌ Create tour error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create tour",
    };
  }
}



//GET ALL TOURS
export async function getAllTours(queryString?: string): Promise<any> {
  try {
    const response = await serverFetch.get(
      `/tour${queryString ? `?${queryString}` : ""}`,
      {
        cache: "no-store", 
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    };
  }
}



// GET TOUR BY SLUG 
export async function getTourBySlug(slug: string): Promise<any> {
  try {
    const response = await serverFetch.get(`/tour/${slug}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    };
  }
}


// GET TOUR BY id
export const getTourById = async (id: string) => {
  try {
    const res = await serverFetch.get(`/tour/id/${id}`);
    const result = await res.json();

    if (result.success) {
      return result.data;
    }

    return null;
  } catch (e) {
    console.log("Error fetching tour:", e);
    return null;
  }
};



export async function updateTour(id: string,_prevState: any,formData: FormData): Promise<any> {

    const parseNumber = (value: FormDataEntryValue | null) => {
        if (!value || value === "") return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    };

    
    const validationPayload = {
        title: formData.get("title") as string | undefined,
        description: formData.get("description") as string | undefined,
        location: formData.get("location") as string | undefined,
        startDate: formData.get("startDate") as string | undefined,
        endDate: formData.get("endDate") as string | undefined,
        tourType: formData.get("tourType") as string | undefined,
        division: formData.get("division") as string | undefined,
        departureLocation: formData.get("departureLocation") as string | undefined,
        arrivalLocation: formData.get("arrivalLocation") as string | undefined,
        discountDate: formData.get("discountDate") as string | undefined,

        costFrom: parseNumber(formData.get("costFrom")),
        maxGuest: parseNumber(formData.get("maxGuest")),
        minAge: parseNumber(formData.get("minAge")),
        discountPercentage: parseNumber(formData.get("discountPercentage")),

        included: formData
            .getAll("included")
            .filter((v): v is string => typeof v === "string" && v.trim() !== ""),

        excluded: formData
            .getAll("excluded")
            .filter((v): v is string => typeof v === "string" && v.trim() !== ""),

        amenities: formData
            .getAll("amenities")
            .filter((v): v is string => typeof v === "string" && v.trim() !== ""),

        tourPlan: formData
            .getAll("tourPlan")
            .filter((v): v is string => typeof v === "string" && v.trim() !== ""),

        deleteImages: formData
            .getAll("deleteImages")
            .filter((v): v is string => typeof v === "string" && v.trim() !== ""),
    };

   
    const validated = zodValidator(validationPayload, updateTourZodSchema);

    if (!validated.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validated.errors,
        };
    }

    const data = validated.data;

    if (!data) {
        return { success: false, message: "Unexpected validation error: Data is missing." };
    }

   
    const backendFormData = new FormData();

   
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => backendFormData.append(key, v));
        } else if (value !== undefined && value !== null) {
            backendFormData.append(key, String(value));
        }
    });

   
    const files = formData.getAll("files");
    const validFiles = files.filter((file): file is File => 
        file instanceof File && file.size > 0
    );

    validFiles.forEach((file) => {
        backendFormData.append("files", file);
    });

    
    try {
        const response = await serverFetch.patch(`/tour/${id}`, {
            body: backendFormData,
        });

        if (!response.ok) {
            let errorData = { message: `HTTP Error ${response.status}` };
            try {
                errorData = await response.json();
            } catch (e) {
                console.error("Failed to parse error response:", e);
            }
            throw new Error(errorData.message);
        }

        const result = await response.json();

        
        if (result.success) {
            revalidatePath("/admin/tours");
            revalidatePath("/tours");
            revalidatePath(`/tours/${result.data?.slug}`);
        }

        return result;
    } catch (error: any) {
        console.error("❌ Update tour error:", error.message);

        return {
            success: false,
            message: error.message || "Failed to update tour",
        };
    }
}



//  DELETE TOUR 
export async function deleteTour(id: string): Promise<any> {
  try {
    const response = await serverFetch.delete(`/tour/${id}`);
    const result = await response.json();

   
    if (result.success) {
      revalidatePath("/admin/tours");
      revalidatePath("/tours");
    }

    return result;
  } catch (error: any) {
    console.error("Delete tour error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete tour",
    };
  }
}




// tour types
export async function createTourType(_prevState: any, formData: FormData) {
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
    const response = await serverFetch.post("/tour/create-tour-type", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: validatedPayload.data.name }),
    });

    const result = await response.json();

    
    if (result.success) {
      revalidatePath("/admin/tours/tour-types");
    }

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
    return result.data;
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

    
    if (result.success) {
      revalidatePath("/admin/tours/tour-types");
    }

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

    
    if (result.success) {
      revalidatePath("/admin/tours/tour-types");
    }

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