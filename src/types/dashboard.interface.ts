import { Role } from "./user.interface";


export interface NavItem {
    title: string;
    href: string;
    icon: string; // ✅ Changed from LucideIcon to string
    badge?: string | number;
    description?: string;
    roles: Role[];
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}
