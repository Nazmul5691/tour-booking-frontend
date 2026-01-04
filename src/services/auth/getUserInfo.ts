

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { GUIDE_STATUS } from "@/types/guide.interface";

export const getUserInfo = async (): Promise<IUser> => {
    try {
        const response = await serverFetch.get("/user/me", {
            cache: "no-store",
            next: { tags: ["user-info"] },
        });

        const result = await response.json();

        //  API returned user data properly
        if (result?.success && result?.data) {
            return {
                name:result.data?.name ?? "Unknown User",
                email: result.data?.email ?? "",
                role: result.data?.role,
                guideStatus: result.data?.guideStatus as GUIDE_STATUS | undefined,
                ...result.data,
            };
        }

        //  API failed → fallback to JWT
        const accessToken = await getCookie("accessToken");
        if (!accessToken) throw new Error("No access token");

        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        return {
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,
            guideStatus: undefined,
            auths: [],
        };
    } catch (error) {
        console.error("getUserInfo error:", error);

        // Final fallback (never breaks UI)
        return {
            name: "Unknown User",
            email: "",
            role: "USER" as IUser["role"],
            guideStatus: undefined,
            auths: [],
        };
    }
};
