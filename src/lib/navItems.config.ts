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
                    roles: ["USER", "DOCTOR", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "DOCTOR", "ADMIN"],
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
                    roles: ["USER"],
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
                roles: ["DOCTOR"],
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock", // ✅ String
                roles: ["DOCTOR"],
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText", // ✅ String
                roles: ["DOCTOR"],
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
                roles: ["USER"],
            },
            {
                title: "Book Tours",
                href: "/allTours",
                icon: "ClipboardList", // ✅ String
                roles: ["USER"],
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/my-prescriptions",
                icon: "FileText", // ✅ String
                roles: ["USER"],
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "Activity", // ✅ String
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
                roles: ["ADMIN"],
            },
            {
                title: "Doctors",
                href: "/admin/dashboard/doctors-management",
                icon: "Stethoscope", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "User",
                href: "/admin/dashboard/user-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Hospital Management",
        items: [
            {
                title: "Appointments",
                href: "/admin/dashboard/appointments-management",
                icon: "Calendar", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Specialities",
                href: "/admin/dashboard/specialities-management",
                icon: "Hospital", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: Role): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
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