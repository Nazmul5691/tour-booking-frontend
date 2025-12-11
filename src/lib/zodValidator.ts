// import { ZodObject } from "zod"

// export const zodValidator = <T>(payload: T, schema: ZodObject) => {
//     const validatedPayload = schema.safeParse(payload)

//     if (!validatedPayload.success) {
//         return {
//             success: false,
//             errors: validatedPayload.error.issues.map(issue => {
//                 return {
//                     field: issue.path[0],
//                     message: issue.message,
//                 }
//             })
//         }
//     }

//     return {
//         success: true,
//         data: validatedPayload.data,
//     };
// }







// import { ZodObject, ZodRawShape, ZodTypeAny, ZodError } from "zod";

// // 🚀 FIX 1: Provide the necessary generic types to ZodObject
// // We use ZodRawShape, ZodTypeAny, and ZodTypeAny for the shape, unknown keys, and catchall.
// // We also use a Zod schema type alias for better readability.
// type AnyZodObject = ZodObject<ZodRawShape, 'passthrough' | 'strict' | 'strip', ZodTypeAny>;

// export const zodValidator = <T>(payload: T, schema: AnyZodObject) => {
//     // We assert the schema parameter type to the more permissive AnyZodObject

//     const validatedPayload = schema.safeParse(payload);

//     if (!validatedPayload.success) {
//         // 🚀 FIX 2: Explicitly type the Zod error for TypeScript
//         const zodError = validatedPayload.error as ZodError; 

//         return {
//             success: false,
//             // Use the typed error object to map issues
//             errors: zodError.issues.map(issue => {
//                 return {
//                     // issue.path is an array, take the first element (the field name)
//                     field: issue.path[0] as string, 
//                     message: issue.message,
//                 }
//             })
//         }
//     }

//     return {
//         success: true,
//         data: validatedPayload.data,
//     };
// }




import { ZodTypeAny, ZodError } from "zod";

export const zodValidator = <T>(payload: T, schema: ZodTypeAny) => {
    const validatedPayload = schema.safeParse(payload);

    if (!validatedPayload.success) {
        const zodError = validatedPayload.error as ZodError;

        return {
            success: false,
            errors: zodError.issues.map(issue => ({
                field: issue.path[0] as string,
                message: issue.message,
            }))
        };
    }

    return {
        success: true,
        data: validatedPayload.data,
    };
}
