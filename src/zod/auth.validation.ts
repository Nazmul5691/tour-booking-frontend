
import z from "zod";

export const registerUserValidationZodSchema = z.object({
    name: z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name too short. Minimum two character long." })
        .max(50, { message: "Name too  long." }),
    email: z
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid Email address format" })
        .min(5, { message: "Email must beat least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    password: z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be 8 character long" })
        .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
        .regex(/\d/, { message: "Password must include at least one digit" })
        .regex(/[!@#$%^&*]/, { message: "Password must include at least one special character" }),
})



// export const loginValidationZodSchema = z.object({
//     email: z.email({
//         message: "Email is required",
//     }),
//     password: z.string("Password is required").min(6, {
//         error: "Password is required and must be at least 6 characters long",
//     }).max(100, {
//         error: "Password must be at most 100 characters long",
//     }),
// });


export const loginValidationZodSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid Email address format" }),

    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password is required and must be at least 6 characters long",
        })

});



export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Valid email is required" }),
});


export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });




export const createGuideZodSchema = z.object({
    bio: z
        .string({ invalid_type_error: "Bio must be string" })
        .min(10, { message: "Bio must beat least 10 characters long" })
        .max(500, { message: "Bio cannot exceed 500 characters" }),
    location: z.string().min(2),
    languages: z.array(z.string()).min(1),
    experienceYears: z.number().min(0).max(50),
    perTourCharge: z.number().min(1)
});



export const updateGuideZodSchema = z.object({
    bio: z.string().min(10).max(500).optional(),
    location: z.string().min(2).optional(),
    languages: z.array(z.string()).min(1).optional(),
    experienceYears: z.number().min(0).max(50).optional(),
    perTourCharge: z.number().min(1).optional(),
    walletBalance: z.number().min(0).optional(),
    averageRating: z.number().min(0).max(5).optional(),
    totalReviews: z.number().min(0).optional(),
    // documents: z.array(z.string()).min(1).optional()
});
