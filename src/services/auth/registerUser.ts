// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { registerUserValidationZodSchema } from "@/zod/auth.validation";
// import { loginUser } from "./loginUser";


// export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
//     try {
//         const payload = {
//             name: formData.get('name'),
//             email: formData.get('email'),
//             password: formData.get('password')
//         }

//         if (zodValidator(payload, registerUserValidationZodSchema).success === false) {
//             return zodValidator(payload, registerUserValidationZodSchema);
//         }





//         const res = await serverFetch.post("/user/create-patient", {
//             body: payload,
//         })

//         const result = await res.json();


//         if (result.success) {
//             await loginUser(_currentState, formData);
//         }

//         return result;



//     } catch (error: any) {
//         // Re-throw NEXT_REDIRECT errors so Next.js can handle them
//         if (error?.digest?.startsWith('NEXT_REDIRECT')) {
//             throw error;
//         }
//         console.log(error);
//         return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
//     }
// }




/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";

export const registerUser = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const payload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        const validationResult = zodValidator(
            payload,
            registerUserValidationZodSchema
        );

        if (!validationResult.success) {
            return validationResult;
        }

        const res = await serverFetch.post("/user/register", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // ✅ FIX
        });

        const result = await res.json();

        if (result?.success) {
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        console.error("Register error:", error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Registration failed. Please try again.",
        };
    }
};
