


export default function useUserFromToken() {
    return (
        <div>
            <h1>This is useUserFromToken component</h1>
        </div>
    );
}












// "use client";

// import { useEffect, useState } from "react";
// import { IUser, Role } from "@/types/user.interface";
// import { getCookie } from "@/services/auth/tokenHandlers";
// import jwt, { JwtPayload } from "jsonwebtoken";

// export function useUserFromToken() {
//   const [user, setUser] = useState<IUser | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = await getCookie("accessToken");
//       if (!token) return;

//       try {
//         const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as JwtPayload;
//         setUser({
//           name: decoded.name || "Unknown User",
//           email: decoded.email || "",
//           role: decoded.role as Role,
//           guideStatus: decoded.guideStatus as string,
//         });
//       } catch (err) {
//         console.error("Token verification failed", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   return user;
// }
