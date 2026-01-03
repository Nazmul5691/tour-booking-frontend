
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
