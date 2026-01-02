""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute} from "./auth-utils";
import { Role } from "@/types/user.interface";

export const getCommonNavItems = (role: Role): NavSection[] => {

    
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "GUIDE", "ADMIN", "SUPER_ADMIN"] as Role[],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "GUIDE", "ADMIN", "SUPER_ADMIN"] as Role[],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER"] as Role[],
                },
            ],
        },
    ]
}

// export const doctorNavItems: NavSection[] = [
//     {
//         title: "Patient Management",
//         items: [
//             {
//                 title: "Appointments",
//                 href: "/doctor/dashboard/appointments",
//                 icon: "Calendar", // ✅ String
//                 badge: "3",
//                 roles: ["DOCTOR"],
//             },
//             {
//                 title: "My Schedules",
//                 href: "/doctor/dashboard/my-schedules",
//                 icon: "Clock", // ✅ String
//                 roles: ["DOCTOR"],
//             },
//             {
//                 title: "Prescriptions",
//                 href: "/doctor/dashboard/prescriptions",
//                 icon: "FileText", // ✅ String
//                 roles: ["DOCTOR"],
//             },
//         ],
//     }
// ]



export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "AvailableTours",
                href: "/guide/dashboard/available-tours",
                icon: "Calendar", // ✅ String
                // badge: "3",
                roles: ["GUIDE"] as Role[],
            },
            {
                title: "My Applications",
                href: "/guide/dashboard/my-applications",
                icon: "Clock", // ✅ String
                roles: ["GUIDE"] as Role[],
            },
            // {
            //     title: "Prescriptions",
            //     href: "/doctor/dashboard/prescriptions",
            //     icon: "FileText", // ✅ String
            //     roles: ["GUIDE"] as Role[],
            // },
        ],
    }
]

export const userNavItems: NavSection[] = [
    {
        title: "Booking",
        items: [
            {
                title: "My Bookings",
                href: "/dashboard/my-bookings",
                icon: "Calendar", 
                roles: ["USER"] as Role[],
            },
            {
                title: "Review & Ratings",
                href: "/dashboard/review",
                icon: "Star", 
                roles: ["USER"] as Role[],
            },
            {
                title: "Download Invoice",
                href: "/dashboard/download-invoice",
                icon: "Download",
                roles: ["USER"] as Role[],
            },
        ],
    },

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] as Role[],
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] as Role[],
            },
            {
                title: "User",
                href: "/admin/dashboard/user-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] as Role[],
            },
        ],
    },
    {
        title: "Tour Management",
        items: [
            {
                title: "Tour",
                href: "/admin/dashboard/tour-management",
                icon: "Calendar", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] as Role[],
            },
            {
                title: "Divisions",
                href: "/admin/dashboard/divisions-management",
                icon: "Clock", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] as Role[],
            },
            {
                title: "Tour Types",
                href: "/admin/dashboard/tourTypes-management",
                icon: "Hospital", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] as Role[],
            },
        ],
    }
]

export const getNavItemsByRole = (role: Role): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "SUPER_ADMIN":
            return [...commonNavItems, ...adminNavItems];
        // case "DOCTOR":
        //     return [...commonNavItems, ...doctorNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}