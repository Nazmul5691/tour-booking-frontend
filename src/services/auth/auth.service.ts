"use server";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/auth-utils";
import { verifyAccessToken } from "@/lib/jwtHanlders";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { changePasswordSchema, forgotPasswordSchema, resetPasswordSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUserInfo } from "./getUserInfo";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { IUser, Role } from "@/types/user.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
    try {
        // Create a new FormData with the data property
        const uploadFormData = new FormData();

        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });

        // Add the data as JSON string
        uploadFormData.append('data', JSON.stringify(data));

        // Add the file if it exists
        const file = formData.get('file');
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append('file', file);
        }

        const response = await serverFetch.patch(`/user/update-my-profile`, {
            body: uploadFormData,
        });

        const result = await response.json();

        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// Reset Password
export async function resetPassword(_prevState: any, formData: FormData) {

    const redirectTo = formData.get('redirect') || null;

    // Build validation payload
    const validationPayload = {
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {

        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }

        const verifiedToken = jwt.verify(accessToken as string, process.env.JWT_SECRET!) as jwt.JwtPayload;

        const userRole: Role = verifiedToken.role;

        const user = await getUserInfo();
        // API Call
        const response = await serverFetch.post("/auth/reset-password", {
            body: JSON.stringify({
                id: user?._id,
                password: validationPayload.newPassword,
            }),
            headers: {
                "Authorization": accessToken,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Reset password failed");
        }

        if (result.success) {
            // await get
            revalidateTag("user-info", { expire: 0 });
        }

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}


// export async function forgetPassword(_prevState: any, formData: FormData) {
//     try {
//         const email = formData.get("email") as string;

//         // Validate email
//         const validated = zodValidator({ email }, forgotPasswordSchema);
//         if (!validated.success && validated.errors) {
//             return {
//                 success: false,
//                 message: "Validation failed",
//                 formData: { email },
//                 errors: validated.errors,
//             };
//         }

//         // Call backend API
//         const res = await serverFetch.post("/auth/forgot-password", {
//             body: JSON.stringify({ email }),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         const result = await res.json();

//         if (!result.success) {
//             return {
//                 success: false,
//                 message: result.message || "Failed to send reset link",
//                 formData: { email },
//             };
//         }

//         return {
//             success: true,
//             message: result.message || "Reset link sent successfully",
//         };
//     } catch (error: any) {
//         return {
//             success: false,
//             message:
//                 process.env.NODE_ENV === "development"
//                     ? error.message
//                     : "Something went wrong",
//             formData: { email: formData.get("email") as string },
//         };
//     }
// }




/**
 * Forget Password server action
 */
export async function forgetPassword(_prevState: any, formData: FormData) {
    try {
        const email = (formData.get("email") as string) || "";

        // Validate email
        const validated = zodValidator({ email }, forgotPasswordSchema);

        if (!validated.success && validated.errors) {
            return {
                success: false,
                message: "Validation failed",
                formData: { email },
                errors: validated.errors,
            };
        }

        // Call backend API
        const res = await serverFetch.post("/auth/forgot-password", {
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message || "Failed to send reset link",
                formData: { email },
            };
        }

        return {
            success: true,
            message: result.message || "Reset link sent successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
            formData: { email: formData.get("email") as string },
        };
    }
}



export async function forgotPasswordReset(_prevState: any, formData: FormData) {
    const payload = {
        id: formData.get("id") as string,
        token: formData.get("token") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validated = zodValidator(
        { newPassword: payload.newPassword, confirmPassword: payload.confirmPassword },
        resetPasswordSchema
    );

    if (!validated.success && validated.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: payload,
            errors: validated.errors,
        };
    }

    // Call backend
    const res = await serverFetch.post("/auth/forgot-password-reset", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    return result;
}


export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");

        //Case 1: Both tokens are missing - user is logged out
        if (!accessToken && !refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        // Case 2 : Access Token exist- and need to verify
        if (accessToken) {
            const verifiedToken = await verifyAccessToken(accessToken);

            if (verifiedToken.success) {
                return {
                    tokenRefreshed: false,
                }
            }
        }

        //Case 3 : refresh Token is missing- user is logged out
        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
        // This is the only case we need to call the API

        // Now we know: accessToken is invalid/missing AND refreshToken exists
        // Safe to call the API
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
        const response = await serverFetch.post("/auth/refresh-token", {
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const result = await response.json();

        console.log("access token refreshed!!");

        const setCookieHeaders = response.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await deleteCookie("accessToken");
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        }


        return {
            tokenRefreshed: true,
            success: true,
            message: "Token refreshed successfully"
        };


    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Something went wrong",
        };
    }

}


export async function changeMyPassword(_prevState: any, formData: FormData) {
    const payload = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validated = zodValidator(payload, changePasswordSchema);

    if (!validated.success && validated.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: payload,
            errors: validated.errors,
        };
    }

    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }

        // Verify token to get role
        const verifiedToken = jwt.verify(
            accessToken as string,
            process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        const userRole: Role = verifiedToken.role;

        // Call backend API
        const response = await serverFetch.post("/auth/change-password", {
            body: JSON.stringify({
                oldPassword: payload.oldPassword,
                newPassword: payload.newPassword,
            }),
            headers: {
                "Authorization": accessToken,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message || "Password change failed",
                formData: payload,
            };
        }

        // Revalidate user cache
        await revalidateTag("user-info", { expire: 0 });

        // Redirect back to dashboard
        // redirect(`${getDefaultDashboardRoute(userRole)}?passwordUpdated=true`);
        return {
            success: true,
            message: "Password changed successfully",
            userRole,
        };

    } catch (error: any) {
        // Handle Next.js redirect errors
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
            formData: payload,
        };
    }
}




export const updateUser = async (_: any, formData: FormData) => {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string | null;
    const phone = formData.get("phone") as string | null;
    const address = formData.get("address") as string | null;

    // Build the payload - only include non-empty values
    const updatePayload: Partial<IUser> = {};
    if (name?.trim()) updatePayload.name = name.trim();
    if (phone?.trim()) updatePayload.phone = phone.trim();
    if (address?.trim()) updatePayload.address = address.trim();

    const requestBody = {
        data: JSON.stringify(updatePayload),
    };

    try {
        const response = await serverFetch.patch(`/user/${id}`, {
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log('Update response:', result);

        // If response is not ok, extract and throw proper error
        if (!response.ok) {
            // Check if it's a Zod validation error with errorSources
            if (result.errorSources && Array.isArray(result.errorSources) && result.errorSources.length > 0) {
                // Extract all error messages from errorSources
                const errorMessages = result.errorSources
                    .map((err: any) => err.message)
                    .join('. ');
                throw new Error(errorMessages);
            }
            
            // Otherwise use the main message
            throw new Error(result.message || "Failed to update user");
        }

        revalidateTag("user-info", { expire: 0 });

        return result;

    } catch (error: any) {
        // Re-throw the error to be handled in the component
        throw error;
    }
};