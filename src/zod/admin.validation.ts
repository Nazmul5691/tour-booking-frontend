import { Role } from "@/types/user.interface";
import { z } from "zod";

export const createAdminZodSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be 8 character long" })
        .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
        .regex(/\d/, { message: "Password must include at least one digit" })
        .regex(/[!@#$%^&*]/, { message: "Password must include at least one special character" }),
    role: z
        .enum([Role.ADMIN, Role.SUPER_ADMIN])
        .optional()
        .default(Role.ADMIN), // Default role is ADMIN if not provided
});



export const updateAdminZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
});
