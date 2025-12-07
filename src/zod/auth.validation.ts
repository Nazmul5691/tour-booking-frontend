
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