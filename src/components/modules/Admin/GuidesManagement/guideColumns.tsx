"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateCell } from "@/components/shared/cell/DateCell";
import GuideStatusCell from "@/components/shared/cell/GuideStatusCell";
import { IGuide } from "@/types/guide.interface";
// Assuming you have IUser defined in a types file
import { IUser } from "@/types/user.interface";

export const GuideColumns: Column<IGuide>[] = [
    {
        header: "Guide Name",
        accessor: (guide) =>
            typeof guide.user === "object" && guide.user !== null
                // FIX: Add type assertion (as IUser) to resolve TS error
                ? (guide.user as IUser).name
                : "N/A",
    },
    {
        header: "Email",
        accessor: (guide) =>
            typeof guide.user === "object" && guide.user !== null
                // FIX: Add type assertion (as IUser) to resolve TS error
                ? (guide.user as IUser).email
                : "N/A",
    },
    {
        header: "Experience (Years)",
        accessor: (guide) => guide.experienceYears ?? "N/A",
    },
    {
        header: "Per Tour Charge",
        accessor: (guide) => `৳ ${guide.perTourCharge ?? "N/A"}`,
    },
    {
        header: "Rating",
        accessor: (guide) =>
            guide.averageRating
                ? `${guide.averageRating} ⭐ (${guide.totalReviews})`
                : "No reviews",
    },
    {
        header: "Languages",
        accessor: (guide) =>
            guide.languages?.length ? guide.languages.join(", ") : "N/A",
    },
    {
        header: "Status",
        accessor: (guide) => <GuideStatusCell user={guide} />,
    },
    {
        header: "Joined",
        accessor: (guide) => (
            <DateCell
                date={
                    typeof guide.user === "object" && guide.user !== null
                        // FIX: Add type assertion (as IUser) to resolve TS error
                        ? (guide.user as IUser).createdAt
                        : guide.createdAt
                }
            />
        ),
        sortKey: "createdAt",
    },
];