

"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { GUIDE_STATUS, IGuide } from "@/types/guide.interface";
import { updateGuideStatus } from "@/services/admin/guideManagement";
import clsx from "clsx";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
    user: IGuide;
}

export default function GuideStatusCell({ user }: Props) {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    // Determine the next status based on current
    const getNextStatus = (current: GUIDE_STATUS) => {
        switch (current) {
            case GUIDE_STATUS.PENDING:
                return GUIDE_STATUS.APPROVED;
            case GUIDE_STATUS.APPROVED:
                return GUIDE_STATUS.REJECTED;
            case GUIDE_STATUS.REJECTED:
                return GUIDE_STATUS.APPROVED; 
            default:
                return GUIDE_STATUS.PENDING;
        }
    };

    const handleToggleStatus = async () => {
        try {
            setLoading(true);

            const newStatus = getNextStatus(user.status);

            const result = await updateGuideStatus(user._id!, newStatus);

            if (result.success) {
                toast.success(
                    newStatus === GUIDE_STATUS.APPROVED
                        ? "Guide verified"
                        : newStatus === GUIDE_STATUS.REJECTED
                            ? "Guide blocked"
                            : "Guide pending"
                );
                startTransition(() => router.refresh());
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("Failed to update guide status");
        } finally {
            setLoading(false);
        }
    };

    const getTooltipText = (status: GUIDE_STATUS) => {
        switch (status) {
            case GUIDE_STATUS.PENDING:
                return "Click to verify this guide";
            case GUIDE_STATUS.APPROVED:
                return "Click to block this guide";
            case GUIDE_STATUS.REJECTED:
                return "Click to verify this guide";
            default:
                return "";
        }
    };

    const getStatusClasses = (status: GUIDE_STATUS) => {
        switch (status) {
            case GUIDE_STATUS.PENDING:
                return "bg-yellow-100 text-yellow-700";
            case GUIDE_STATUS.APPROVED:
                return "bg-green-100 text-green-700";
            case GUIDE_STATUS.REJECTED:
                return "bg-red-100 text-red-700";
            default:
                return "";
        }
    };

    const getStatusText = (status: GUIDE_STATUS) => {
        switch (status) {
            case GUIDE_STATUS.PENDING:
                return "PENDING";
            case GUIDE_STATUS.APPROVED:
                return "VERIFIED";
            case GUIDE_STATUS.REJECTED:
                return "BLOCKED";
            default:
                return "";
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        onClick={handleToggleStatus}
                        className={clsx(
                            "cursor-pointer font-semibold px-3 py-1 rounded-full text-xs inline-block",
                            loading && "opacity-50 pointer-events-none",
                            getStatusClasses(user.status)
                        )}
                    >
                        {loading ? "Updating..." : getStatusText(user.status)}
                    </span>
                </TooltipTrigger>

                <TooltipContent side="top" align="center">
                    <span className="text-xs">{getTooltipText(user.status)}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

