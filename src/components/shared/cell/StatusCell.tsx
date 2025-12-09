"use client";

import { IUser, IsActive } from "@/types/user.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { updateUserStatus } from "@/services/admin/userManagement";

interface StatusCellProps {
    user: IUser;
}

export default function StatusCell({ user }: StatusCellProps) {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    if (user.role === "SUPER_ADMIN") {
        return <Badge variant="destructive">SUPER ADMIN</Badge>;
    }

    const handleToggleStatus = async () => {
        try {
            setLoading(true);
            const newStatus =
                user.isActive === IsActive.ACTIVE
                    ? IsActive.BLOCKED
                    : IsActive.ACTIVE;

            const result = await updateUserStatus(user._id!, newStatus);

            if (result.success) {
                toast.success("User status updated");
                startTransition(() => router.refresh());
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            size="sm"
            disabled={loading}
            variant={user.isActive === IsActive.ACTIVE ? "default" : "destructive"}
            onClick={handleToggleStatus}
        >
            {loading
                ? "Updating..."
                : user.isActive === IsActive.ACTIVE
                    ? "ACTIVE"
                    : "BLOCKED"}
        </Button>
    );
}