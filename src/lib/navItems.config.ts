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
                    roles: ["USER", "GUIDE", "ADMIN", "SUPER_ADMIN"] ,
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "GUIDE", "ADMIN", "SUPER_ADMIN"] ,
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
                    roles: ["USER"] ,
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
        title: "Patient Management",
        items: [
            {
                title: "Appointments",
                href: "/doctor/dashboard/appointments",
                icon: "Calendar", // ✅ String
                badge: "3",
                roles: ["GUIDE"] ,
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock", // ✅ String
                roles: ["GUIDE"] ,
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText", // ✅ String
                roles: ["GUIDE"] ,
            },
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
                icon: "Calendar", // ✅ String
                roles: ["USER"] ,
            },
            {
                title: "Book Tours",
                href: "/allTours",
                icon: "ClipboardList", // ✅ String
                roles: ["USER"],
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
                roles: ["ADMIN", "SUPER_ADMIN"] ,
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] ,
            },
            {
                title: "User",
                href: "/admin/dashboard/user-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] ,
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
                roles: ["ADMIN", "SUPER_ADMIN"] ,
            },
            {
                title: "Divisions",
                href: "/admin/dashboard/divisions-management",
                icon: "Clock", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"],
            },
            {
                title: "Tour Types",
                href: "/admin/dashboard/tourTypes-management",
                icon: "Hospital", // ✅ String
                roles: ["ADMIN", "SUPER_ADMIN"] ,
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